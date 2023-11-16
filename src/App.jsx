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
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "00" && state.currentOperand === "00") return state;
      if (state.currentOperand === "00") return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case Actions.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case Actions.CLEAR:
      return {};
    case Actions.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case Actions.EVALUATE:
      if (
        state.operation == null ||
        state.previousOperand == null ||
        state.currentOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
  }
  return computation.toString();
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
        <button
          className="span-two"
          onClick={() => dispatch({ type: Actions.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: Actions.DELETE_DIGIT })}>
          Del
        </button>
        <Digit_Button digit="÷" dispatch={dispatch} />
        <Digit_Button digit="÷" dispatch={dispatch} />

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
        <Digit_Button digit="00" dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: Actions.EVALUATE })}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
