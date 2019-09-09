import React from 'react';
import RamWidget from '../RamWidget';
import Panel from '../Panel';

const Panel2 = ({ram, cpu}) =>{
    return <div className="with-border">
        Panel #2: 
        <RamWidget ram={ram}/>
        <Panel cpu={cpu}/>
    </div>
}

export default Panel2;