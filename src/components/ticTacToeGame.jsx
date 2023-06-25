import React, {
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import GameButton from "./gameButton";

const buttonDefault = "/";
const buttonInitialState = {
  btn1: { id: "1", value: buttonDefault },
  btn2: { id: "2", value: buttonDefault },
  btn3: { id: "3", value: buttonDefault },
  btn4: { id: "4", value: buttonDefault },
  btn5: { id: "5", value: buttonDefault },
  btn6: { id: "6", value: buttonDefault },
  btn7: { id: "7", value: buttonDefault },
  btn8: { id: "8", value: buttonDefault },
  btn9: { id: "9", value: buttonDefault }
};

function reducer(state, action) {
  switch (action.type) {
    case "set_cross":
      return {
        ...state,
        [action.id]: { ...state[action.id], value: "X" }
      };
    case "set_circle":
      return {
        ...state,
        [action.id]: { ...state[action.id], value: "O" }
      };
    case "reset_game":
      return buttonInitialState;
    default:
      return state;
  }
}

const TicTacToeGame = ({ gameCallback, resetWinner }) => {
  const [state, dispatch] = useReducer(reducer, buttonInitialState);
  const [clickCount, setClickCount] = useState(0);
  const winnerRef = useRef("");
  const currentValue = clickCount % 2 === 0 ? "X" : "O";

  useEffect(() => {
    if (clickCount === 9 && winnerRef.current === "") {
      gameCallback("D");
    }
  }, [gameCallback, clickCount]);

  const callWinner = (value) => {
    winnerRef.current = value;
    gameCallback(value);
  };

  const resetGame = () => {
    setClickCount(0);
    winnerRef.current = "";
    dispatch({ type: "reset_game" });
    resetWinner();
  };

  const checkHorizontal = (value, action) => {
    const nextState = reducer(state, action);
    const { btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9 } = nextState;

    if (btn1.value === value && btn2.value === value && btn3.value === value) {
      callWinner(value);
    }
    if (btn4.value === value && btn5.value === value && btn6.value === value) {
      callWinner(value);
    }
    if (btn7.value === value && btn8.value === value && btn9.value === value) {
      callWinner(value);
    }
  };

  const checkVertical = (value, action) => {
    const nextState = reducer(state, action);
    const { btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9 } = nextState;

    if (btn1.value === value && btn4.value === value && btn7.value === value) {
      callWinner(value);
    }
    if (btn2.value === value && btn5.value === value && btn8.value === value) {
      callWinner(value);
    }
    if (btn3.value === value && btn6.value === value && btn9.value === value) {
      callWinner(value);
    }
  };

  const checkDiagonal = (value, action) => {
    const nextState = reducer(state, action);
    const { btn1, btn3, btn5, btn7, btn9 } = nextState;

    if (btn1.value === value && btn5.value === value && btn9.value === value) {
      callWinner(value);
    }
    if (btn3.value === value && btn5.value === value && btn7.value === value) {
      callWinner(value);
    }
  };

  const onButtonClick = (e) => {
    let action;
    if (clickCount % 2 === 0) {
      action = {
        type: "set_cross",
        id: "btn" + e.target.id
      };
    } else {
      action = {
        type: "set_circle",
        id: "btn" + e.target.id
      };
    }
    dispatch(action);
    checkHorizontal(currentValue, action);
    checkVertical(currentValue, action);
    checkDiagonal(currentValue, action);
    setClickCount((prev) => prev + 1);
  };

  return (
    <>
      {clickCount !== 0 && (
        <button
          data-testid="start"
          style={{ margin: "2rem" }}
          onClick={resetGame}
        >
          Start A New Game
        </button>
      )}
      <table>
        <tbody>
          <tr>
            <td>
              <GameButton
                id={state.btn1.id}
                value={state.btn1.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn2.id}
                value={state.btn2.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn3.id}
                value={state.btn3.value}
                onClick={onButtonClick}
              />
            </td>
          </tr>
          <tr>
            <td>
              <GameButton
                id={state.btn4.id}
                value={state.btn4.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn5.id}
                value={state.btn5.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn6.id}
                value={state.btn6.value}
                onClick={onButtonClick}
              />
            </td>
          </tr>
          <tr>
            <td>
              <GameButton
                id={state.btn7.id}
                value={state.btn7.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn8.id}
                value={state.btn8.value}
                onClick={onButtonClick}
              />
            </td>
            <td>
              <GameButton
                id={state.btn9.id}
                value={state.btn9.value}
                onClick={onButtonClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TicTacToeGame;
