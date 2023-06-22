import './App.css';
import './Global.js';
import { createContext, useEffect, useState } from 'react';
import CalcFunctionService from './service/CalcFunctionService';
import CalcNumberService from './service/CalcNumberService';
import MyFunction from './Function';
import MyNumber from './Number';
import MyOption from './Option';
import useError from './hook/useError';

class MyCalcNumberService extends CalcNumberService {
  init(){
    console.log("MyCalcNumberService init");
    super.init();
  }

  setDispError( type ){
    if( type == global.calc.errorTypeDivideByZero ){
      global.calcApp.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      global.calcApp.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      global.calcApp.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      global.calcApp.setDispStr( "NaN" );
    }
  }
  setDispResult( value ){
    global.calcApp.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry ){
    global.calcApp.setDispStr( entry );
  }
  clearDispLog(){
    global.calcApp.setDispLog( "" );
  }
  setDispLog( value, opType ){
    if( opType == global.calc.opTypeDiv ){
      global.calcApp.setDispLog( this.valueToString( value, 10 ) + " ÷" );
    }
    if( opType == global.calc.opTypeMul ){
      global.calcApp.setDispLog( this.valueToString( value, 10 ) + " ×" );
    }
    if( opType == global.calc.opTypeSub ){
      global.calcApp.setDispLog( this.valueToString( value, 10 ) + " -" );
    }
    if( opType == global.calc.opTypeAdd ){
      global.calcApp.setDispLog( this.valueToString( value, 10 ) + " +" );
    }
  }
  addDispLog( value ){
    global.calcApp.setDispLog( global.calcApp.dispLog + " " + this.valueToString( value, 10 ) + " =" );
  }
  setDispAnswer( value ){
    global.calcApp.setDispAnswer( this.valueToString( value, 10 ) );
  }
  setDispMemory( value ){
    global.calcApp.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag ){
    global.calcApp.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag ){
    global.calcApp.setErrorFlag( flag );
  }
}

class MyCalcFunctionService extends CalcFunctionService {
  init(){
    console.log("MyCalcFunctionService init");
    super.init();
  }

  setDispError( type ){
    if( type == global.calc.errorTypeDivideByZero ){
      global.calcApp.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      global.calcApp.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      global.calcApp.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      global.calcApp.setDispStr( "NaN" );
    }
  }
  setDispResult( value ){
    global.calcApp.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry ){
    global.calcApp.setDispStr( entry );
  }
  setDispMemory( value ){
    global.calcApp.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag ){
    global.calcApp.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag ){
    global.calcApp.setErrorFlag( flag );
  }

  angleChanged( type ){
    if( type == global.calc.angleTypeRad ){
      global.calcApp.setDispAngle( "RAD" );
      global.calcApp.setAngleButtonText( "DEG" );
    } else if( type == global.calc.angleTypeDeg ){
      global.calcApp.setDispAngle( "DEG" );
      global.calcApp.setAngleButtonText( "GRAD" );
    } else if( type == global.calc.angleTypeGrad ){
      global.calcApp.setDispAngle( "GRAD" );
      global.calcApp.setAngleButtonText( "RAD" );
    }
  }
}

// グローバルデータとサービス
global.calc.init();
global.calcNumberService   = new MyCalcNumberService();
global.calcFunctionService = new MyCalcFunctionService();

window.onlanguagechange = (event) => {
  const isEnglish = global.calc.isEnglish();
  document.title = isEnglish ? "Calculator" : "電卓";
};

// Context
export const AppContext = createContext();

function App() {
  console.log("App");

  // State
  const [ mode, setMode ] = useState(global.calc.mode);
  const [ dispStr, setDispStr ] = useState("0");
  const [ dispLog, setDispLog ] = useState("");
  const [ dispAnswer, setDispAnswer ] = useState("0");
  const [ dispMemory, setDispMemory ] = useState("0");
  const [ mrcButtonText, setMrcButtonText ] = useState("MR");
  const [ memoryRecalled, setMemoryRecalled ] = useState(global.calc.memoryRecalled);
  const [ dispAngle, setDispAngle ] = useState("RAD");
  const [ angleButtonText, setAngleButtonText ] = useState("DEG");
  const { errorFlag, setErrorFlag, onButton } = useError();
  const appValue = { setMode, dispStr, dispLog, dispAnswer, dispMemory, mrcButtonText, memoryRecalled, dispAngle, angleButtonText, errorFlag };
  global.calcApp = { setDispStr, dispLog, setDispLog, setDispAnswer, setDispMemory, setMrcButtonText, setMemoryRecalled, setDispAngle, setAngleButtonText, setErrorFlag };

  useEffect(() => {
    if (mode == global.calc.modeNumber) {
      global.calcNumberService.init();
    } else if (mode == global.calc.modeFunction) {
      global.calcFunctionService.init();
    }
  }, [mode]);

  return (
    <div className="App">
      <AppContext.Provider value={appValue}>
        <div style={{ display: (mode === global.calc.modeNumber) ? "block" : "none" }}>
          <MyNumber onButton={onButton} />
        </div>
        <div style={{ display: (mode === global.calc.modeFunction) ? "block" : "none" }}>
          <MyFunction onButton={onButton} />
        </div>
        <div style={{ display: (mode === global.calc.modeOption) ? "block" : "none" }}>
          <MyOption />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
