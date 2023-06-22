import './Number.css';
import { AppContext } from './App';
import React, { useContext } from 'react';

const MyNumberA = React.memo(({ onButton, dispStr, dispLog, dispAnswer, dispMemory, mrcButtonText, memoryRecalled }) => {
  console.log("MyNumberA");

  const { setMode } = useContext(AppContext);

  // 操作
  const onButtonMAdd = () => { onButton( () => {
    global.calcNumberService.addMemory();
  } ); };
  const onButtonMSub = () => { onButton( () => {
    global.calcNumberService.subMemory();
  } ); };
  const onButtonMRC = () => { onButton( () => {
    if( memoryRecalled ){
      global.calcNumberService.clearMemory();
    } else {
      global.calcNumberService.recallMemory();
    }
  } ); };
  const onButtonFunction = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
    setMode(global.calc.modeFunction);
  } ); };

  // 桁区切り
  if (global.calc.separatorType == global.calc.separatorTypeDash) {
    dispStr = global.calcNumberService.sepString(dispStr, "'");
  } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
    dispStr = global.calcNumberService.sepString(dispStr, ",");
  }

  return (
    <div>
      <div className="div_log1" onClick={() => {
        global.calc.returnMode = global.calc.modeNumber;
        setMode(global.calc.modeOption);
      }}>
        <span className="span_log1">{dispLog}</span>
      </div>
      <div className="div_log2" onClick={() => {
        global.calc.returnMode = global.calc.modeNumber;
        setMode(global.calc.modeOption);
      }}>
        <span className={global.calc.italicFlag ? "span_log2_italic" : "span_log2"}>{dispStr}</span>
      </div>
      <div className="div_log1" onClick={() => {
        global.calc.returnMode = global.calc.modeNumber;
        setMode(global.calc.modeOption);
      }}>
        <span className="span_log1">A = {dispAnswer}&nbsp;&nbsp;M = {dispMemory}</span>
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
        <div className="button1 div_color_red" onClick={onButtonFunction}>
          <span className="span_font_25 span_color_white">FNC</span>
        </div>
      </div>
    </div>
  );
});

const MyNumberB = React.memo(({ onButton, errorFlag }) => {
  console.log("MyNumberB");

  // 操作
  const onButtonClear = ( allFlag ) => {
    global.calcNumberService.clearEntry( allFlag );
  };
  const onButtonCE = () => {
    onButtonClear( false );
  };
  const onButtonC = () => {
    onButtonClear( true );
  };
  const onButtonDEL = () => {
    if( !global.calc.errorFlag && global.calc.entryFlag ){
      global.calcNumberService.delEntry();
    }
  };
  const onButtonDiv = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeDiv );
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
        <div className="button2 div_color_white" onClick={onButtonDEL}>
          <span className="span_font_32 span_color_black">DEL</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonDiv}>
          <span className="span_font_40 span_color_black">÷</span>
        </div>
      </div>
    </div>
  );
});

const MyNumberC = React.memo(({ onButton }) => {
  console.log("MyNumberC");

  // 操作
  const onButtonMul = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeMul );
  } ); };
  const onButtonSub = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeSub );
  } ); };
  const onButtonAdd = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeAdd );
  } ); };
  const onButton0 = () => { onButton( () => {
    global.calcNumberService.addNumber( "0" );
  } ); };
  const onButton1 = () => { onButton( () => {
    global.calcNumberService.addNumber( "1" );
  } ); };
  const onButton2 = () => { onButton( () => {
    global.calcNumberService.addNumber( "2" );
  } ); };
  const onButton3 = () => { onButton( () => {
    global.calcNumberService.addNumber( "3" );
  } ); };
  const onButton4 = () => { onButton( () => {
    global.calcNumberService.addNumber( "4" );
  } ); };
  const onButton5 = () => { onButton( () => {
    global.calcNumberService.addNumber( "5" );
  } ); };
  const onButton6 = () => { onButton( () => {
    global.calcNumberService.addNumber( "6" );
  } ); };
  const onButton7 = () => { onButton( () => {
    global.calcNumberService.addNumber( "7" );
  } ); };
  const onButton8 = () => { onButton( () => {
    global.calcNumberService.addNumber( "8" );
  } ); };
  const onButton9 = () => { onButton( () => {
    global.calcNumberService.addNumber( "9" );
  } ); };
  const onButtonPoint = () => { onButton( () => {
    global.calcNumberService.addPoint();
  } ); };
  const onButtonNegative = () => { onButton( () => {
    global.calcNumberService.negative();
  } ); };
  const onButtonEqual = () => { onButton( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
  } ); };

  return (
    <div>
      <div className="div_row">
        <div className="button2 div_color_white" onClick={onButton7}>
          <span className="span_font_40 span_color_black">7</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton8}>
          <span className="span_font_40 span_color_black">8</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton9}>
          <span className="span_font_40 span_color_black">9</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonMul}>
          <span className="span_font_40 span_color_black">×</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button2 div_color_white" onClick={onButton4}>
          <span className="span_font_40 span_color_black">4</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton5}>
          <span className="span_font_40 span_color_black">5</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton6}>
          <span className="span_font_40 span_color_black">6</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonSub}>
          <span className="span_font_40 span_color_black">-</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button2 div_color_white" onClick={onButton1}>
          <span className="span_font_40 span_color_black">1</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton2}>
          <span className="span_font_40 span_color_black">2</span>
        </div>
        <div className="button2 div_color_white" onClick={onButton3}>
          <span className="span_font_40 span_color_black">3</span>
        </div>
        <div className="button2 div_color_white" onClick={onButtonAdd}>
          <span className="span_font_40 span_color_black">+</span>
        </div>
      </div>
      <div className="div_row">
        <div className="button3 div_color_white" onClick={onButtonNegative}>
          <span className="span_font_40 span_color_black">+/-</span>
        </div>
        <div className="button3 div_color_white" onClick={onButton0}>
          <span className="span_font_40 span_color_black">0</span>
        </div>
        <div className="button3 div_color_white" onClick={onButtonPoint}>
          <span className="span_font_40 span_color_black">.</span>
        </div>
        <div className="button3 div_color_white" onClick={onButtonEqual}>
          <span className="span_font_40 span_color_red">=</span>
        </div>
      </div>
    </div>
  );
});

const MyNumber = React.memo(({ onButton }) => {
  console.log("MyNumber");

  const { dispStr, dispLog, dispAnswer, dispMemory, mrcButtonText, memoryRecalled } = useContext(AppContext);
  const { errorFlag } = useContext(AppContext);

  return (
    <div className="body">
      <MyNumberA onButton={onButton} dispStr={dispStr} dispLog={dispLog} dispAnswer={dispAnswer} dispMemory={dispMemory} mrcButtonText={mrcButtonText} memoryRecalled={memoryRecalled} />
      <MyNumberB onButton={onButton} errorFlag={errorFlag} />
      <MyNumberC onButton={onButton} />
    </div>
  );
});

export default MyNumber;
