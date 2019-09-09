import React, {useEffect, useState} from 'react';
import { streamService } from '../../../services/streamService';

const _channel = '_CPU';

const CpuWidget = () =>{

    const [cpu, setCpu] = useState(0);

    useEffect(()=>{
        streamService.createNewChannel(_channel);        
        const stream = streamService.get(_channel);

        const subscription = stream && stream.subscribe(payload => {
            payload && setCpu(payload.percentage);
        });
        return ()=>{
            subscription && subscription.unsubscribe();
        }
    }, [])

    return <div>
        CPU: {cpu}
    </div>
}

export default CpuWidget;