import React from 'react';
import useMeasurements from '../../hooks/useMeasurements';
import Panel2 from './Panel2';


function PropsComponent() {

    const result = useMeasurements("https://localhost:5001/mh");

  return (
    <div>
    <Panel2 cpu={result.cpu} ram={result.ram}/>
    </div>
  );
}

export default PropsComponent;
