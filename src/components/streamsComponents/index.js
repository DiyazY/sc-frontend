import React from 'react';
import useStreams from '../../hooks/useStreams';
import Panel2 from './Panel2';


function StreamComponent() {

  useStreams("https://localhost:5001/mh");

  return (
    <div className="with-border">
      main
      <Panel2/>
    </div>
  );
}

export default StreamComponent;