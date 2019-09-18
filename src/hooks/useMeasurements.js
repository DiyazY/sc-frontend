import { useEffect, useState } from "react";

import {
  initSignalRService,
  getSignalRService
} from "../services/signalRService";

const useMeasurements = url => {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);

  useEffect(() => {
    if (!url) return;

    const subscriptionName = "stream";
    initSignalRService(url);
    let hub = undefined;

    hub = getSignalRService();
    if (!hub) return;

    hub.subscribeToOnStream(subscriptionName, (channel, payload) => {
      if (payload.name === "CPU") {
        setCpu(payload.percentage);
      } else if (payload.name === "RAM") {
        setRam(payload.percentage);
      }
    });

    return () => {
      hub && hub.unsubcribeFromOnStream(subscriptionName);
    };
  }, [url]);
  return { cpu, ram };
};

export default useMeasurements;


