import { useEffect } from 'react';

import { initSignalRService, getSignalRService } from '../services/signalRService';
import { streamService } from '../services/streamService';

const useStreams = (url) => {

    useEffect(() => {
        if (!url) return;
        initSignalRService(url);
        const channelName = 'stream';
        const subscriptionName = 'stream';
        let subscription, hub = undefined;
    
        hub = getSignalRService();
        if (!hub) return;
        streamService.createNewChannel(channelName);
        hub.subscribeToOnStream(subscriptionName, (channel, payload) => {
            streamService.add(channel, payload)
        });
        subscription = streamService.get(channelName)
            .subscribe(payload => {
                if (payload) {
                    let streamId = `_${payload.name}`;
                    let stream = streamService.get(streamId);

                    if (!stream) {
                        streamService.createNewChannel(streamId);
                    }

                    streamService.add(streamId, payload);
                }
            });
        return () => {
            subscription && subscription.unsubscribe();
            hub && hub.unsubcribeFromOnStream(subscriptionName);
        }
    }, [url]);
}

export default useStreams;