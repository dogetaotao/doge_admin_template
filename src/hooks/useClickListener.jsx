import {useLayoutEffect} from "react";

function useClickListener(func) {
  useLayoutEffect(() => {
    document.addEventListener("click", func)
    return () => {
      document.removeEventListener("click", func)
    }
  },[])
}

export default useClickListener
