import {useEffect, useRef} from "react";

function useDebounce(fn, delay = 300, dep=[]) {
  const {current} = useRef({fn, time: null})
  useEffect(function () {
    current.fn = fn
  }, [fn])

  return function f(...args) {
    if(current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args)
    }, delay)
  }
}

export default useDebounce
