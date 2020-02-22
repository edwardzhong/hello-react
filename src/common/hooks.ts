import { useReducer, useState, useEffect, ChangeEvent, MutableRefObject } from 'react';
import { randomCode, drawCode } from './util'

function stateReducer(state: object | Function, newState: object) {
  return typeof newState === 'function' ? newState(state) : { ...state, ...newState };
}

/**
 * form input
 * @param initialState init state
 */
export const useForm = (initialState: object) => {
  const [state, setState] = useReducer(stateReducer, initialState || {});

  const createPropsGetter = (type: string) => (name: string, ownValue: string) => {
    const hasValueInState = state[name] !== undefined;
    function setInitialValue() {
      const value = ownValue || '';
      setState({ [name]: value });
    }

    const inputProps = {
      name, // 添加name属性
      get type(): string { // 给 input 添加 type: text or password ...
        if (!/select|textarea/i.test(type)) {
          return type;
        }
        return '';
      },
      get value() {
        if (!hasValueInState) {
          setInitialValue(); // 给初始化值
        }
        return hasValueInState ? state[name] : ''; // 赋值
      },
      onChange(e: ChangeEvent) {
        const { value } = e.target as HTMLInputElement;
        setState({ [name]: value }); // 修改对应 Key 的值
      },
    };
    return inputProps;
  };

  const inputPropsCreators = ['text', 'password', 'number', 'email', 'search', 'url', 'color', 'textarea'].reduce(
    (methods, type) => ({ ...methods, [type]: createPropsGetter(type) }),
    {},
  );

  return [
    { values: state }, // formState
    inputPropsCreators,
  ];
}

export const useWinSize = () => {
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
  const [height, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight);

  const onResize = () => {
    setWidth(window.innerWidth || document.documentElement.clientWidth);
    setHeight(window.innerHeight || document.documentElement.clientHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return [width, height];
}

/**
 * 倒计时
 * @param s seconds
 */
export const useSecond = (s: number): [number, (s: number) => void] => {
  const [second, setSecond] = useState(s || 0);

  useEffect(() => {
    if (second < 1) return () => { }
    const timer = setTimeout(() => {
      setSecond(second - 1)
    }, 1000);
    return () => clearTimeout(timer)
  }, [second]);

  return [second, setSecond];
}

/**
 * key enter
 * @param submit submit function
 */
export const useKeyEnter = (submit: () => void) => {
  useEffect(() => {
    const keyEnter = (e: KeyboardEvent) => {
      if (e.keyCode != 13) return;
      submit();
    }
    document.addEventListener("keydown", keyEnter, false);
    return () => {
      document.removeEventListener("keydown", keyEnter, false);
    }
  }, [submit]);
}

/**
 * generate canvas checkcode
 * @param canvasRef 
 */
export const useCodes: (canvasRef: MutableRefObject<HTMLCanvasElement>) => [string, () => void] = canvasRef => {
  const [codes, setCodes] = useState(randomCode());

  useEffect(() => {
    drawCode(canvasRef.current, codes);
  }, [canvasRef, codes]);

  const updateCode = () => {
    setCodes(randomCode());
  }

  return [codes, updateCode];
}

/**
 * fetch data
 * @param fetch useCallback function
 * @param callabck 
 */
export const useFetch = (fetch: () => Promise<any>, callabck?: (res: any) => void) => {
  const [isFetching, setFetching] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    (async () => {
      setFetching(true);
      const res = await fetch()
      setResponse(res);
      if (callabck) callabck(res);
      setFetching(false);
    })();
  }, [fetch]);

  return [isFetching, response];
}