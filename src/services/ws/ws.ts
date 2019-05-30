import { Store } from 'vuex';
import * as Queue from 'js-queue';

interface Options {
  protocol: string;
  host: string;
  port: number;
}

class WS {
  public socket!: WebSocket;

  private commitWait: number = 1;

  private queue!: typeof Queue;

  private interval!: number;

  constructor(options: Options) {
    this.socket = new WebSocket(this.getUrl(options));
    this.queue = new Queue();
    this.queue.autoRun = false;
  }

  public getUrl(options: Options): string {
    const { protocol, host, port } = options;
    return `${protocol}://${host}:${port}`;
  }

  public on<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, event: WebSocketEventMap[K]) => void,
  ) {
    this.socket.addEventListener(type, listener);
  }

  public send(data: Object) {
    this.socket.send(JSON.stringify(data));
  }

  public runQueue() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.queue.next();
    }, this.commitWait);
  }

  public plugin() {
    return (store: Store<any>) => {
      const commitReceivedEvent = (data: MessageEvent['data']) => () => {
        store.commit('receivedMessage', JSON.parse(data));
      };

      this.on('message', (event: MessageEvent) => {
        this.queue.add(commitReceivedEvent(event.data));
      });

      store.subscribeAction({
        before: (action) => {
          if (action.type === 'sendData') {
            this.queue.clear();
            this.runQueue();
            store.commit('resetReceived');
          }
        },
        after: (action) => {
          if (action.type === 'sendData') {
            this.send(action.payload);
          }
        },
      });
    };
  }
}

export default WS;
