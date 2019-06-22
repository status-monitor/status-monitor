class WebsocketClient {
  public websocket!: WebSocket;
  private isConnected = false;

  public constructor() {
    this.initializeWebSocket();
  }

  public send(message: string) {
    this.websocket.send(message);
  }

  private initializeWebSocket() {
    this.websocket = new WebSocket('ws://localhost:8081');
    this.websocket.onmessage = this.onMessage;
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    // this.websocket.onerror = e => {
    //   console.log('Error', e);
    // };
  }

  private onMessage = (ev: MessageEvent) => {
    console.log(ev);
  };

  private onOpen = () => {
    this.isConnected = true;
  };

  private onClose = () => {
    this.isConnected = false;
    setTimeout(() => {
      this.initializeWebSocket();
    }, 100);
  };
}

export const websocket = new WebsocketClient();
