import * as WebSocket from 'ws';

export const loadWebsocketServer = () => {
  const wss = new WebSocket.Server({
    port: 8081,
    //   perMessageDeflate: {
    //     zlibDeflateOptions: {
    //       // See zlib defaults.
    //       chunkSize: 1024,
    //       memLevel: 7,
    //       level: 3
    //     },
    //     zlibInflateOptions: {
    //       chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     serverMaxWindowBits: 10, // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
    //     threshold: 1024 // Size (in bytes) below which messages
    //     // should not be compressed.
    //   }
  });

  wss.on('connection', () => {
    console.log('client connected');
  });
  console.log('Websocket server started on port 8081');
};
