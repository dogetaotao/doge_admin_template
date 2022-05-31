import {useEffect, useRef, useState} from "react";

function useCallbackState (od) {
  const Ref = useRef()
  const [data, setData] = useState(od)

  useEffect(() => {
    Ref.current && Ref.current(data)
  }, [data])

  return [data, function (d, callback) {
    Ref.current = callback
    setData(d)
  }]
}

export default useCallbackState
