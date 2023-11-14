import { Actions } from "../App";

export default function Digit_Button({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
