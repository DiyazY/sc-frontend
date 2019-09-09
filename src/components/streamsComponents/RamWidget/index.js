import React, {useEffect, useState} from 'react';
import { streamService } from '../../../services/streamService';

const _channel = '_RAM';

const RamWidget = () =>{

    const [ram, setRam] = useState(0);

    useEffect(()=>{
        streamService.createNewChannel(_channel);  
        const stream = streamService.get(_channel);
        const subscription = stream && stream.subscribe(payload => {
            payload && setRam(payload.percentage);
        });
        return ()=>{
            subscription && subscription.unsubscribe();
        }
    }, [])

    return <div>
        RAM: {ram}
    </div>
}

export default RamWidget;