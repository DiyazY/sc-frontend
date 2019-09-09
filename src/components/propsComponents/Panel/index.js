import React from 'react';
import CpuWidget from '../CpuWidget';

const Panel = ({cpu}) =>{
    return <div className="with-border">
        Panel #1: 
        <CpuWidget cpu={cpu}/>
    </div>
}

export default Panel;