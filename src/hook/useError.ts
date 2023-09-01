import { useCallback, useState } from 'react';

const useError = (): {
  errorFlag: boolean;
  setErrorFlag: (flag: boolean) => void;
  onButton: (func: any) => void;
} => {
  const [ errorFlag, setErrorFlag ] = useState<boolean>(global.calc.errorFlag);
  const onButton = useCallback(( func: any ) => {
    if( !errorFlag ){
      func();
    }
  }, [ errorFlag ]);
  return { errorFlag, setErrorFlag, onButton };
};

export default useError;
