const signalR = require('@aspnet/signalr');

let signalRService = undefined;

export function initSignalRService(hubUrl = '') {
    try {

        let hub = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();

        const restartHub = async () => {
            try {
                await hub.start();
                console.assert(hub.state === signalR.HubConnectionState.Connected);
                console.log("connected");
            } catch (err) {
                console.assert(hub.state === signalR.HubConnectionState.Disconnected);
                console.error('restart hub', err);
                setTimeout(() => restartHub(), 5000);
            }
        };

        hub.onclose(() => {
            console.assert(hub.state === signalR.HubConnectionState.Disconnected);
            console.log('connecition closed');
            restartHub();
        });

        const onStreamSubscribers = new Map();//contains all subscribers of onStream

        hub.on(
            'onStream',
            (payload) => {
                onStreamSubscribers.forEach(p => p.call(null,"stream",  payload));}
        );

        hub.start();

        signalRService = {
            getHub: () => hub,
            subscribeToOnStream: (name, fn) => !onStreamSubscribers.has(name) && onStreamSubscribers.set(name, fn),
            unsubcribeFromOnStream: (name) => onStreamSubscribers.has(name) && onStreamSubscribers.delete(name)
        };
        return true;
    } catch (error) {
        console.error('signalR initialization', error);
        return false;
    }
}

export function getSignalRService() {
    return signalRService;
}