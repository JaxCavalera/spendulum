export type CallbackFn = (...args: any) => any;
export type CancelAnimFrameTimeout = () => void;

export const animFrameTimeoutWorker = () => {

  // /**
  //  * Dropin replacement for setTimeout using requestAnimationFrame for improved accuracy
  //  * @param callback - Called when specified delay reaches zero
  //  * @param msDelay - How many milliseconds to wait before calling the callback function
  //  * @returns When called it will prevent the callback function from being run
  //  */
  // const animFrameTimeout = (callback: CallbackFn, msDelay: number): CancelAnimFrameTimeout => {
  //   let timeoutRunning = true;

  //   const loopWrapper = () => {
  //     for (let i = 0; i <= msDelay; i += 1) {
  //       if (!timeoutRunning) {
  //         return;
  //       }

  //       // still running
  //       console.log(timeoutRunning);

  //       if (i === msDelay) {
  //         callback();
  //         timeoutRunning = false;
  //       }
  //     }
  //   };

  //   loopWrapper();

  //   return () => {
  //     timeoutRunning = false;
  //   };
  // };

  addEventListener('message', (e: MessageEvent) => {
    const target = e.target as DedicatedWorkerGlobalScope;

    const validOriginsList = [
      'spendulum.herokuapp.com|',
      'localhost:3000',
    ].join('');

    const validOrigins = RegExp(`(${validOriginsList})`);

    if (validOrigins.test(target.origin)) {
      console.log(e.data, target);
      const resp = {
        value: e.data.value,
        msg: 'updated',
      };
      target.postMessage(resp);
    }
  });
};
