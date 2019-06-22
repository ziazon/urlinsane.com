import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';

const name = 'ws';

@Module({ name })
export default class Root extends VuexModule {
  public status = {
    total: {
      progress: 0,
    },
    status: 'loading',
  };

  public received: any[] = [];

  @Action
  public sendData(payload: any) {}


  @Mutation
  receivedMessage(payload: any) {
    if (payload.status === 'done') {
      this.status = payload;
    } else {
      this.received.push(payload);
    }
  }

  @Mutation
  resetReceived() {
    this.received = [];
  }
}
