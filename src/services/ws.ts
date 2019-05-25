import { Store } from 'vuex';

interface Options {
  protocol: string;
  host: string;
  port: number;
}

class WS {
  public socket!: WebSocket;

  constructor(options: Options) {
    this.socket = new WebSocket(this.getUrl(options));
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

  public plugin() {
    return (store: Store<any>) => {
      this.on('message', (event) => {
        store.commit('receivedMessage', JSON.parse(event.data));
      });
      store.subscribeAction({
        before: (action) => {
          if (action.type === 'sendData') {
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
