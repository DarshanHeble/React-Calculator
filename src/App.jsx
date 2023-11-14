import { useReducer, useState } from "react";
import Digit_Button from "./assets/Digit_Button";
import Operation_Button from "./assets/Operation_Button";
import "./App.css";

export const Actions = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div className="container">
        <div className="output">
          <div className="previous_operand">
            {previousOperand}
            {operation}
          </div>
          <div className=" current_operand">{currentOperand}</div>
        </div>
        <button className="span-two">AC</button>
        <button>Del</button>
        <Digit_Button digit="%" dispatch={dispatch} />

        <Digit_Button digit="1" dispatch={dispatch} />
        <Digit_Button digit="2" dispatch={dispatch} />
        <Digit_Button digit="3" dispatch={dispatch} />
        <Operation_Button operation="*" dispatch={dispatch} />
        <Digit_Button digit="4" dispatch={dispatch} />
        <Digit_Button digit="5" dispatch={dispatch} />
        <Digit_Button digit="6" dispatch={dispatch} />
        <Operation_Button operation="+" dispatch={dispatch} />
        <Digit_Button digit="7" dispatch={dispatch} />
        <Digit_Button digit="8" dispatch={dispatch} />
        <Digit_Button digit="9" dispatch={dispatch} />
        <Operation_Button operation="-" dispatch={dispatch} />
        <Digit_Button digit="." dispatch={dispatch} />
        <Digit_Button digit="0" dispatch={dispatch} />
        <button className="span-two">=</button>
      </div>
    </>
  );
}

export default App;
