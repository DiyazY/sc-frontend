import React from 'react';
import RamWidget from '../RamWidget';
import Panel from '../Panel';

const Panel2 = () =>{
    return <div className="with-border">
        Panel #2: 
        <RamWidget/>
        <Panel/>
    </div>
}

export default Panel2;