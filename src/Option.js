import './Option.css';
import { AppContext } from './App';
import React, { useContext, useState } from 'react';

const MyOption = React.memo(() => {
  console.log("MyOption");

  const { setMode } = useContext(AppContext);

  // State
  const [ italicFlag, setItalicFlag ] = useState(global.calc.italicFlag);
  const [ separatorType, setSeparatorType ] = useState(global.calc.separatorType);

  // イタリック
  const handleChangeItalic = (event) => {
    console.log("handleChangeItalic");

    global.calc.italicFlag = !global.calc.italicFlag;
    global.calc.save(global.calc.saveItalicFlag);

    setItalicFlag(global.calc.italicFlag);
  };

  // 桁区切り
  const handleChangeSeparatorTypeNone = (event) => {
    console.log("handleChangeSeparatorTypeNone");

    global.calc.separatorType = global.calc.separatorTypeNone;
    global.calc.save(global.calc.saveSeparatorType);

    setSeparatorType(global.calc.separatorType);
  };
  const handleChangeSeparatorTypeDash = (event) => {
    console.log("handleChangeSeparatorTypeDash");

    global.calc.separatorType = global.calc.separatorTypeDash;
    global.calc.save(global.calc.saveSeparatorType);

    setSeparatorType(global.calc.separatorType);
  };
  const handleChangeSeparatorTypeComma = (event) => {
    console.log("handleChangeSeparatorTypeComma");

    global.calc.separatorType = global.calc.separatorTypeComma;
    global.calc.save(global.calc.saveSeparatorType);

    setSeparatorType(global.calc.separatorType);
  };

  const isEnglish = global.calc.isEnglish();
  const strBack           = isEnglish ? "Return" : "戻る";
  const strItalic         = isEnglish ? "Display calculation results in italics" : "計算結果をイタリックに";
  const strSeparator      = isEnglish ? "Separator" : "桁区切り";
  const strSeparatorNone  = isEnglish ? "None" : "なし";
  const strSeparatorUpper = isEnglish ? "Upper" : "上部";
  const strSeparatorLower = isEnglish ? "Lower" : "下部";

  return (
    <div className="option_body">
      <div className="div_return" onClick={() => { setMode(global.calc.returnMode); }}>
        <span className="span_return">{strBack}</span>
      </div>
      <div className="div_option">
        <fieldset className="checkbox1">
          <label>
            <input type="checkbox" name="checkbox1" checked={italicFlag} onChange={handleChangeItalic} />
            <span className="span_option">&nbsp;{strItalic}</span>
          </label>
        </fieldset>
        <div className="div_space"></div>
        <div>
          <span className="span_option">{strSeparator}:</span>
        </div>
        <fieldset className="radio1">
          <label>
            <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeNone} onChange={handleChangeSeparatorTypeNone} />
            <span className="span_option">&nbsp;{strSeparatorNone}</span>
          </label>
        </fieldset>
        <fieldset className="radio1">
          <label>
            <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeDash} onChange={handleChangeSeparatorTypeDash} />
            <span className="span_option">&nbsp;{strSeparatorUpper}</span>
          </label>
        </fieldset>
        <fieldset className="radio1">
          <label>
            <input type="radio" name="radio1" checked={separatorType === global.calc.separatorTypeComma} onChange={handleChangeSeparatorTypeComma} />
            <span className="span_option">&nbsp;{strSeparatorLower}</span>
          </label>
        </fieldset>
      </div>
    </div>
  );
});

export default MyOption;
