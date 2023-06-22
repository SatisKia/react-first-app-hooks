import './Function.css';
import { AppContext } from './App';
import React, { useContext } from 'react';

const MyFunctionA = React.memo(({ onButton, dispStr, dispAngle, dispMemory, mrcButtonText, memoryRecalled }) => {
  console.log("MyFunctionA");

  const { setMode } = useContext(AppContext);

  // 操作
  const onButtonMAdd = () => { onButton( () => {
    global.calcFunctionService.addMemory();
  } ); };
  const onButtonMSub = () => { onButton( () => {
    global.calcFunctionService.subMemory();
  } ); };
  const onButtonMRC = () => { onButton( () => {
    if( global.calc.memoryRecalled ){
      global.calcFunctionService.clearMemory();
    } else {
      global.calcFunctionService.recallMemory();
    }
  } ); };
  const onButtonNumber = () => { onButton( () => {
    global.calcFunctionService.setOp();
    setMode(global.calc.modeNumber);
  } ); };

  // 桁区切り
  if (global.calc.separatorType == global.calc.separatorTypeDash) {
    dispStr = global.calcFunctionService.sepString(dispStr, "'");
  } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
    dispStr = global.calcFunctionService.sepString(dispStr, ",");
  }

  return (
    <div>
      <div className="div_log1" onClick={() => {
        global.calc.returnMode = global.calc.modeFunction;
        setMode(global.calc.modeOption);
      }}>
        <span className="span_log1">{dispAngle}</span>
      </div>
      <div className="div_log2" onClick={() => {
        global.calc.returnMode = global.calc.modeFunction;
        setMode(global.calc.modeOption);
      }}>
        <span className={global.calc.italicFlag ? "span_log2_italic" : "span_log2"}>{dispStr}</span>
      </div>
      <div className="div_log1" onClick={() => {
        global.calc.returnMode = global.calc.modeFunction;
        setMode(global.calc.modeOption);
      }}>
        <span className="span_log1">M = {dispMemory}</span>
      </div>
      <div className="div_row">
        <div className="button1 div_color_blue" onClick={onButtonMAdd}>
          <span className="span_font_25 span_color_black">M+</span>
        </div>
        <div className="button1 div_color_blue" onClick={onButtonMSub}>
          <span className="span_font_25 span_color_black">M-</span>
        </div>
        <div className="button1 div_color_blue" onClick={onButtonMRC}>
          <span className={"span_font_25 span_color_" + (memoryRecalled ? "red" : "black")}>{mrcButtonText}</span>
        </div>
        <div className="button1 div_color_red" onClick={onButtonNumber}>
          <span className="span_font_25 span_color_white">NUM</span>
        </div>
      </div>
    </div>
  );
});

const MyFunctionB = React.memo(({ onButton, errorFlag, angleButtonText }) => {
  console.log("MyFunctionB");

  const changeAngle = () => {
    if( global.calcFunctionService.angle() == global.calc.angleTypeRad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeDeg );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeDeg ){
      global.calcFunctionService.setAngle( global.calc.angleTypeGrad );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeGrad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeRad );
    }
  };

  // 操作
  const onButtonClear = ( allFlag ) => {
    global.calcFunctionService.clearEntry( allFlag );
  };
  const onButtonCE = () => {
    onButtonClear( false );
  };
  const onButtonC = () => {
    onButtonClear( true );
  };
  const onButtonAngle = () => { onButton( () => {
    changeAngle();
  } ); };
  const onButtonSqrt = () => { onButton( () => {
    global.calcFunctionService.funcSqrt();
    global.calcFunctionService.setOp();
  } ); };

  const classNameDivCe = "button2 div_color_" + (errorFlag ? "red" : "white");
  const classNameSpanCe = "span_font_32 span_color_" + (errorFlag ? "white" : "red");

  return (
    <div>
      <div className="div_row">
        <div className={classNameDivCe} onClick={onButtonCE}>
          <span className={classNameSpanCe}>CE</span>
        </div>
        <div className={classNameDivCe} onClick={onButtonC}>
          <span className={classNameSpanCe}>C</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonAngle}>
          <span className="span_font_25 span_color_black">{angleButtonText}</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonSqrt}>
          <span className="span_font_40 span_color_black">√</span>
        </div>
      </div>
    </div>
  );
});

const MyFunctionC = React.memo(({ onButton }) => {
  console.log("MyFunctionC");

  // 操作
  const onButtonSin = () => { onButton( () => {
    global.calcFunctionService.funcSin();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonCos = () => { onButton( () => {
    global.calcFunctionService.funcCos();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonTan = () => { onButton( () => {
    global.calcFunctionService.funcTan();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonArcSin = () => { onButton( () => {
    global.calcFunctionService.funcArcSin();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonArcCos = () => { onButton( () => {
    global.calcFunctionService.funcArcCos();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonArcTan = () => { onButton( () => {
    global.calcFunctionService.funcArcTan();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonLog = () => { onButton( () => {
    global.calcFunctionService.funcLog();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonLog10 = () => { onButton( () => {
    global.calcFunctionService.funcLog10();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonSqr = () => { onButton( () => {
    global.calcFunctionService.funcSqr();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonExp = () => { onButton( () => {
    global.calcFunctionService.funcExp();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonExp10 = () => { onButton( () => {
    global.calcFunctionService.funcExp10();
    global.calcFunctionService.setOp();
  } ); };
  const onButtonInt = () => { onButton( () => {
    global.calcFunctionService.funcInt();
    global.calcFunctionService.setOp();
  } ); };

  return (
    <div>
      <div className="div_row">
        <div className="button2 func1 div_color_white" onClick={onButtonSin}>
          <span className="span_font_32 span_color_black">sin</span>
        </div>
        <div className="button2 func1 div_color_white" onClick={onButtonCos}>
          <span className="span_font_32 span_color_black">cos</span>
        </div>
        <div className="button2 func2 div_color_white" onClick={onButtonTan}>
          <span className="span_font_32 span_color_black">tan</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button2 func1 div_color_white" onClick={onButtonArcSin}>
          <span className="span_font_32 span_color_black">asin</span>
        </div>
        <div className="button2 func1 div_color_white" onClick={onButtonArcCos}>
          <span className="span_font_32 span_color_black">acos</span>
        </div>
        <div className="button2 func2 div_color_white" onClick={onButtonArcTan}>
          <span className="span_font_32 span_color_black">atan</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button2 func1 div_color_white" onClick={onButtonLog}>
          <span className="span_font_32 span_color_black">ln</span>
        </div>
        <div className="button2 func1 div_color_white" onClick={onButtonLog10}>
          <span className="span_font_32 span_color_black">log</span>
        </div>
        <div className="button2 func2 div_color_white" onClick={onButtonSqr}>
          <span className="span_font_32 span_color_black">sqr</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button3 func1 div_color_white" onClick={onButtonExp}>
          <span className="span_font_32 span_color_black">exp</span>
        </div>
        <div className="button3 func1 div_color_white" onClick={onButtonExp10}>
          <span className="span_font_32 span_color_black">exp10</span>
        </div>
        <div className="button3 func2 div_color_white" onClick={onButtonInt}>
          <span className="span_font_32 span_color_black">int</span>
        </div>
      </div>
    </div>
  );
});

const MyFunction = React.memo(({ onButton }) => {
  console.log("MyFunction");

  const { dispStr, dispAngle, dispMemory, mrcButtonText, memoryRecalled } = useContext(AppContext);
  const { errorFlag, angleButtonText } = useContext(AppContext);

  return (
    <div className="body">
      <MyFunctionA onButton={onButton} dispStr={dispStr} dispAngle={dispAngle} dispMemory={dispMemory} mrcButtonText={mrcButtonText} memoryRecalled={memoryRecalled} />
      <MyFunctionB onButton={onButton} errorFlag={errorFlag} angleButtonText={angleButtonText} />
      <MyFunctionC onButton={onButton} />
    </div>
  );
});

export default MyFunction;
