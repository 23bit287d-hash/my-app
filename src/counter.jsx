import React, { useState } from "react";
import "./App.css";
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Counter</h1>

        <div className="count-wrapper">
            <div key={count} className="count">{count}</div>
    </div>

        <div className="inputBox">
          Step:
          <input
            className="input"
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </div>

        <div className="buttons">
  <button className="button" onClick={() => setCount(count + step)}>+</button>
  <button className="button" onClick={() => setCount(count - step)}>-</button>
</div>

        <button className="reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;