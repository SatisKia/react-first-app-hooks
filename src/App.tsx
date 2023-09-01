import './App.css';
import './Global';
import { useEffect } from 'react';
import { useStore } from './store';
import type { MyState, MyAction } from './store';
import CalcFunctionService from './service/CalcFunctionService';
import CalcNumberService from './service/CalcNumberService';
import MyFunction from './Function';
import MyNumber from './Number';
import MyOption from './Option';
import useError from './hook/useError';

declare global {
  var calcNumberService: MyCalcNumberService;
  var calcFunctionService: MyCalcFunctionService;
  var calcSetErrorFlag: (flag: boolean) => void;
  var calcStoreState: MyState;
  var calcStoreDispatch: React.Dispatch<MyAction>;
}

class MyCalcNumberService extends CalcNumberService {
  init(){
    console.log("MyCalcNumberService init");
    super.init();
  }

  setDispError( type: number ){
    if( type == global.calc.errorTypeDivideByZero ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "Divide by zero" });
    } else if( type == global.calc.errorTypePositiveInfinity ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "Infinity" });
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "-Infinity" });
    } else if( type == global.calc.errorTypeNotANumber ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "NaN" });
    }
  }
  setDispResult( value: number ){
    global.calcStoreDispatch({ type: "setDispStr", payload: this.valueToString( value, 15 ) });
  }
  setDispEntry( entry: string ){
    global.calcStoreDispatch({ type: "setDispStr", payload: entry });
  }
  clearDispLog(){
    global.calcStoreDispatch({ type: "setDispLog", payload: "" });
  }
  setDispLog( value: number , opType: number ){
    if( opType == global.calc.opTypeDiv ){
      global.calcStoreDispatch({ type: "setDispLog", payload: this.valueToString( value, 10 ) + " ÷" });
    }
    if( opType == global.calc.opTypeMul ){
      global.calcStoreDispatch({ type: "setDispLog", payload: this.valueToString( value, 10 ) + " ×" });
    }
    if( opType == global.calc.opTypeSub ){
      global.calcStoreDispatch({ type: "setDispLog", payload: this.valueToString( value, 10 ) + " -" });
    }
    if( opType == global.calc.opTypeAdd ){
      global.calcStoreDispatch({ type: "setDispLog", payload: this.valueToString( value, 10 ) + " +" });
    }
  }
  addDispLog( value: number ){
    global.calcStoreDispatch({ type: "setDispLog", payload: global.calcStoreState.dispLog + " " + this.valueToString( value, 10 ) + " =" });
  }
  setDispAnswer( value: number ){
    global.calcStoreDispatch({ type: "setDispAnswer", payload: this.valueToString( value, 10 ) });
  }
  setDispMemory( value: number ){
    global.calcStoreDispatch({ type: "setDispMemory", payload: this.valueToString( value, 10 ) });
  }
  memoryRecalled( flag: boolean ){
    global.calcStoreDispatch({ type: "setMemoryRecalled", payload: flag });
    global.calcStoreDispatch({ type: "setMrcButtonText", payload: flag ? "MC" : "MR" });
  }
  errorChanged( flag: boolean  ){
    global.calcSetErrorFlag( flag );
  }
}

class MyCalcFunctionService extends CalcFunctionService {
  init(){
    console.log("MyCalcFunctionService init");
    super.init();
  }

  setDispError( type: number ){
    if( type == global.calc.errorTypeDivideByZero ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "Divide by zero" });
    } else if( type == global.calc.errorTypePositiveInfinity ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "Infinity" });
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "-Infinity" });
    } else if( type == global.calc.errorTypeNotANumber ){
      global.calcStoreDispatch({ type: "setDispStr", payload: "NaN" });
    }
  }
  setDispResult( value: number ){
    global.calcStoreDispatch({ type: "setDispStr", payload: this.valueToString( value, 15 ) });
  }
  setDispEntry( entry: string ){
    global.calcStoreDispatch({ type: "setDispStr", payload: entry });
  }
  setDispMemory( value: number ){
    global.calcStoreDispatch({ type: "setDispMemory", payload: this.valueToString( value, 10 ) });
  }
  memoryRecalled( flag: boolean ){
    global.calcStoreDispatch({ type: "setMemoryRecalled", payload: flag });
    global.calcStoreDispatch({ type: "setMrcButtonText", payload: flag ? "MC" : "MR" });
  }
  errorChanged( flag: boolean ){
    global.calcSetErrorFlag( flag );
  }

  angleChanged( type: number ){
    if( type == global.calc.angleTypeRad ){
      global.calcStoreDispatch({ type: "setDispAngle", payload: "RAD" });
      global.calcStoreDispatch({ type: "setAngleButtonText", payload: "DEG" });
    } else if( type == global.calc.angleTypeDeg ){
      global.calcStoreDispatch({ type: "setDispAngle", payload: "DEG" });
      global.calcStoreDispatch({ type: "setAngleButtonText", payload: "GRAD" });
    } else if( type == global.calc.angleTypeGrad ){
      global.calcStoreDispatch({ type: "setDispAngle", payload: "GRAD" });
      global.calcStoreDispatch({ type: "setAngleButtonText", payload: "RAD" });
    }
  }
}

// サービス
global.calcNumberService   = new MyCalcNumberService();
global.calcFunctionService = new MyCalcFunctionService();

window.onlanguagechange = (event) => {
  const isEnglish = global.calc.isEnglish();
  document.title = isEnglish ? "Calculator" : "電卓";
};

function App() {
  console.log("App");

  const { errorFlag, setErrorFlag, onButton } = useError();
  global.calcSetErrorFlag = setErrorFlag;
  const { state, dispatch } = useStore();
  global.calcStoreState = state;
  global.calcStoreDispatch = dispatch;

  useEffect(() => {
    if (state.mode == global.calc.modeNumber) {
      global.calcNumberService.init();
    } else if (state.mode == global.calc.modeFunction) {
      global.calcFunctionService.init();
    }
  }, [state.mode]);

  return (
    <div className="App">
      <div style={{ display: (state.mode === global.calc.modeNumber) ? "block" : "none" }}>
        <MyNumber onButton={onButton} errorFlag={errorFlag} />
      </div>
      <div style={{ display: (state.mode === global.calc.modeFunction) ? "block" : "none" }}>
        <MyFunction onButton={onButton} errorFlag={errorFlag} />
      </div>
      <div style={{ display: (state.mode === global.calc.modeOption) ? "block" : "none" }}>
        <MyOption />
      </div>
    </div>
  );
}

export default App;
