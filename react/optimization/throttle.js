import { useCallback, useEffect, useRef } from "react";

const useThrottling = () => {
  useEffect(() => {
    document.addEventListener("scroll", scrollThrottle);
    return function () {
      document.addEventListener("scroll", scrollThrottle);
    };
  }, []);

  const callback = useCallback((e) => {
    scrollHandler(e);
  }, []);

  function useThrottle(callback, delay) {
    const isThrolled = useRef(null);
    const throttleCallback = useCallback(
      (...args) => {
        if (isThrolled.current) {
          return;
        }
        callback(args);
        isThrolled.current = true;
        setTimeout(() => (isThrolled.current = false), delay);
      },
      [callback, delay]
    );
    return throttleCallback;
  }

  const scrollThrottle = useThrottle(callback, 1000);

  const scrollHandler = (e) => {
    //scrolling to end of page
    if (mybids_pagination === false) {
      if (
        e[0].target.documentElement.scrollHeight -
          (e[0].target.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        console.log(
          "dispatch action with change page or something else per second"
        );
      }
    }
  };

  return {};
};

export default useThrottling;
