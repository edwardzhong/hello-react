import { useState, useEffect } from 'react'

// type UseFetch<T, P> = (fetch: (arg: T) => Promise<P>, arg: T) => [boolean, P, (arg: T) => void];
export const useFetch = (fetch: (arg: any) => Promise<any>, arg: any) => {
  const [isFetching, setFetching] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [payload, setPayload] = useState(arg);

  useEffect(() => {
    (async () => {
      setFetching(true);
      setResponse(await fetch(payload));
      setFetching(false);
    })();
  }, [payload]);

  return [isFetching, response, setPayload];
}

export const useCallbackFetch = (fetch: () => Promise<any>) => {
  const [isFetching, setFetching] = useState(false);
  const [response, setResponse] = useState<any>({});
  const [callback, setCallback] = useState<() => Promise<any>>(fetch);

  useEffect(() => {
    (async () => {
      setFetching(true);
      setResponse(await callback());
      setFetching(false);
    })();
  }, [callback]);

  return [isFetching, response, setCallback];
}