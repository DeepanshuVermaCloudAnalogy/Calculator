import React, { useEffect, useState } from "react";
import Button from "./Button.tsx";
import Display from "./Display.tsx";
import { evaluate } from "mathjs";

// import {Operator} from './types';

import "./App.css";

function App() {
  const [input, setInput] = useState<string>("");
  const [historyShown,setHistoryShown] = useState<boolean>(true);
   interface historyItem{
    expression: string;
    result: string;
  }
  const [history, setHistory] = useState<historyItem[]>([]);
  

  const handleClick = (value: string) => {
    const exp : string = input;
    if (value == "sqrt") {
      const result = Math.sqrt(Number(input));
      setInput(result.toString());
      setHistory([...history, {expression: exp , result: evaluate(input).toString()}]);
    } else if (value == "sq") {
      const result = Math.pow(Number(input), 2);
      setInput(result.toString());
      setHistory([...history, {expression: exp , result: evaluate(input).toString()}]);
    } else if (value === "=") {
      try {
        setInput(evaluate(input).toString());
        setHistory([...history, {expression: exp , result: evaluate(input).toString()}]);
      } catch {
        setInput("Error");
      }
    } else if (value == "C") {
      setInput(" ");
    } else {
      setInput(input + value);
    }

  };
const showHistory = ()=>{
   setHistoryShown(!historyShown)
}
const delEntry = (index : number) =>{
   const his = history.filter((_,i) => i!= index)
   setHistory(his);
}
const clearAll = () => {
  setHistory([]);
}

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;
      const btn = document.querySelector(
        `[data-key="${e.key}"]`,
      ) as HTMLButtonElement;
      console.log(key, btn);
      btn.click();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "sin",
    "4",
    "5",
    "6",
    "*",
    "cos",
    "1",
    "2",
    "3",
    "-",
    "tan",
    "0",
    ".",
    "=",
    "+",
    "C",
    "^",
    "sqrt",
    "(",
    ")",
    "sq",
  ];

  return (
    <div className="calculator">
      <Display value={input} />
      {
        historyShown && (
          <div className="button-pannel">
        {buttons.map((btn) => (
          <Button key={btn} value={btn} onClick={handleClick} />
        ))}
        <button className = 'hisbutton' onClick = {showHistory}> History 
         
        </button>
      </div>
        )
      }
      {
        !historyShown && (
          <div >
            <div className = 'history-title'> 
                 History
                <button  className = "clear-btn" onClick = {showHistory}>Go to Calculate</button>
                 <button className = "clear-btn" onClick = { clearAll }> Clear All</button>
            </div >
            <br />
            {
              history.map((entry,index)=>(
                <div className="entry" key={index}>
                  <span>
                    {entry.expression} = {entry.result} 
                    </span>
                 <button onClick={() => delEntry(index)} > Delete</button>
                 </div>
              ))
            }
          </div>
        )
      }
      
    </div> 
  );
}

export default App;
