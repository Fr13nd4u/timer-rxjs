import React, { useCallback, useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators"


const Timer = () => {
  
  let [sec, setSec] = useState(0);
  const [btn, setBtn] = useState("stop");
  const [isTicking, setIsTicking] = useState(false);
  
  const time = new Date(sec * 1000).toISOString().substr(11, 8);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(1000)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
            if (btn === "start") {
                setSec(++sec);
            }
        })
        
    return () => unsubscribe.next();
  }, [btn, sec]);

  const start = useCallback(
    () => {
      setBtn("start");
      setIsTicking(!isTicking);
    },
    [isTicking],
  )

  const stop = useCallback(
    () => {
      setBtn("stop");
      setSec(0);
      setIsTicking(!isTicking);
    },
    [isTicking],
  )

  const wait = useCallback(
    () => {
      setBtn("wait");
      setIsTicking(!isTicking);
    },
    [isTicking],
  )

  const reset = useCallback(
    () => {
      setSec(0);
    },
    [],
  )

  return (
    <div>
      <h1>Timer</h1>
      <div>
        <p>{time}</p>
      </div>
      <div>
        {isTicking === false
          ? <button onClick={start}>Start</button>
          : <button onClick={stop}>Stop</button>
        }
        <button onClick={reset}>Reset</button>
        <button onDoubleClick={wait} id="btnWait">Wait</button>
      </div>
    </div>
  );
}

export default Timer;