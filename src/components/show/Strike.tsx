import React from 'react';
import Image from 'next/image';
import { useTimer } from 'react-timer-hook';

const Strike = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-2 h-3/5">
      {Array.from({ length: count }, (e, k) => (
        <Image
          key={'im' + k}
          src="/images/strike.svg"
          width={750}
          height={1000}
          alt="Stylized red letter X with red border"
          className="w-auto"
        />
      ))}
    </div>
  );
};

const StrikeWrap = ({
  count,
  timeoutCallback,
}: {
  count: number;
  timeoutCallback: Function;
}) => {
  const time = new Date();
  time.setMilliseconds(time.getMilliseconds() + 1500);
  const { isRunning } = useTimer({ expiryTimestamp: time });

  React.useEffect(() => {
    if (!isRunning) {
      timeoutCallback();
    }
  }, [isRunning, timeoutCallback]);
  const strikes = count > 3 ? 1 : count;
  if (isRunning)
    return (
      <div className="fixed  left-0 right-0 top-0 bottom-0 flex items-center justify-center">
        <Strike count={strikes} />;
      </div>
    );
};
export default StrikeWrap;
