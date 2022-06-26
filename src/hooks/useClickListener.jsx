import {useLayoutEffect} from "react";

function useClickListener(func) {
  useLayoutEffect(() => {
    document.body.addEventListener("click", func)
    return () => {
      document.body.removeEventListener("click", func)
    }
  },[])
}

export default useClickListener
