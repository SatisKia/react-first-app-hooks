import './Global.js';
import { createContext, useContext, useReducer } from 'react';

// グローバルデータ
global.calc.init();

// State
const initialState = {
  mode: global.calc.mode,

  dispStr: "0",
  dispLog: "",
  dispAnswer: "0",
  dispMemory: "0",
  mrcButtonText: "MR",
  memoryRecalled: global.calc.memoryRecalled,

  dispAngle: "RAD",
  angleButtonText: "DEG",

  italicFlag: global.calc.italicFlag,
  separatorType: global.calc.separatorType,
};

// Reducer
const reducer = (oldState, action) => {
  if( action.type == 'setMode' ){
    return Object.assign({}, oldState, { mode: action.payload });
  }

  if( action.type == 'setDispStr' ){
    return Object.assign({}, oldState, { dispStr: action.payload });
  }
  if( action.type == 'setDispLog' ){
    return Object.assign({}, oldState, { dispLog: action.payload });
  }
  if( action.type == 'setDispAnswer' ){
    return Object.assign({}, oldState, { dispAnswer: action.payload });
  }
  if( action.type == 'setDispMemory' ){
    return Object.assign({}, oldState, { dispMemory: action.payload });
  }
  if( action.type == 'setMrcButtonText' ){
    return Object.assign({}, oldState, { mrcButtonText: action.payload });
  }
  if( action.type == 'setMemoryRecalled' ){
    return Object.assign({}, oldState, { memoryRecalled: action.payload });
  }

  if( action.type == 'setDispAngle' ){
    return Object.assign({}, oldState, { dispAngle: action.payload });
  }
  if( action.type == 'setAngleButtonText' ){
    return Object.assign({}, oldState, { angleButtonText: action.payload });
  }

  if( action.type == 'setItalicFlag' ){
    return Object.assign({}, oldState, { italicFlag: action.payload });
  }
  if( action.type == 'setSeparatorType' ){
    return Object.assign({}, oldState, { separatorType: action.payload });
  }

  return oldState;
};

// Context
const store = createContext();

export const StoreProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  return (
    <store.Provider value={{ state, dispatch }}>
      { children }
    </store.Provider>
  );
};

// カスタムフック
export const useStore = () => {
  return useContext(store);
};
