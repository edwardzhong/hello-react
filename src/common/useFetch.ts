import { useState, useEffect } from 'react'

export const useFetch = (fetch: (arg?: any) => Promise<any>, arg: any, callabck?: (res: any) => void) => {
  const [isFetching, setFetching] = useState(true);
  const [response, setResponse] = useState();
  const [payload, setPayload] = useState(arg);

  useEffect(() => {
    (async () => {
      setFetching(true);
      const res = await fetch(payload)
      setResponse(res);
      if (callabck) callabck(res);
      setFetching(false);
    })();
  }, [payload]);

  return [isFetching, response, setPayload];
}

export default useFetch