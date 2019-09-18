const signalR = require("@aspnet/signalr");

let signalRService = undefined;

export function initSignalRService(hubUrl = "") {
  try {
    let hub = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    const onStreamSubscribers = new Map(); //contains all subscribers of onStream

    hub.on("onStream", payload => {
      onStreamSubscribers.forEach(p => p.call(null, "stream", payload));
    });

    hub.start();

    signalRService = {
      getHub: () => hub,
      subscribeToOnStream: (name, fn) =>
        !onStreamSubscribers.has(name) && onStreamSubscribers.set(name, fn),
      unsubcribeFromOnStream: name =>
        onStreamSubscribers.has(name) && onStreamSubscribers.delete(name)
    };
    return true;
  } catch (error) {
    console.error("signalR initialization", error);
    return false;
  }
}

export function getSignalRService() {
  return signalRService;
}
