import { useCallback, useState } from 'react';

const useError = () => {
  const [ errorFlag, setErrorFlag ] = useState(global.calc.errorFlag);
  const onButton = useCallback(( func ) => {
    if( !errorFlag ){
      func();
    }
  }, [ errorFlag ]);
  return { errorFlag, setErrorFlag, onButton };
};

export default useError;
