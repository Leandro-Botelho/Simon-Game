import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import { colors } from "./Dates.ts";

function App() {
  const [sequency, setSequency] = useState<string[]>([]);

  const [init, setInit] = useState(false);
  const [level, setLevel] = useState(1);
  const [finish, setFinish] = useState(false)

  //Ref for manipulate DOM
  const refGreen = useRef();
  const refRed = useRef();
  const refYellow = useRef();
  const refBlue = useRef();

  //Index verification click box
  const [index, setIndex] = useState(0);

  //effect init game
  useEffect(() => {
    if (init) {
      setFinish(false)
      selectedColor();
    }
  }, [init]);

  //randomColor
  const selectedColor = () => {
    setTimeout(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setSequency((sc) => [...sc, randomColor]);
    }, 500);
  };

  //handleSequency logic
  useEffect(() => {
    if (sequency.length !== 0) {

      const handleSequency = (i = 0) => {
        let ref: any = null;

        //ref for add class
        if (sequency[i] === "green") ref = refGreen;
        if (sequency[i] === "red") ref = refRed;
        if (sequency[i] === "blue") ref = refBlue;
        if (sequency[i] === "yellow") ref = refYellow;

        //add and remove class
        setTimeout(() => {
          ref?.current.classList.add("brightness-200");

          setTimeout(() => {
            ref?.current.classList.remove("brightness-200");

            if (i < sequency.length - 1) handleSequency(i + 1);
          }, 300);
        }, 300);
      };

      handleSequency();

    }
  }, [sequency]);


  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof Element) {
      const { id } = e.target;

      if (id === sequency[index]) {
        if (index === sequency.length - 1) {
          setLevel(level + 1);
          setIndex(0);

          selectedColor();
        } else setIndex(index + 1);
      } else gameOver();
    }
  };

  const gameOver = () => {
    setFinish(true)
    setSequency([]);
    setLevel(1);
    setInit(false);
    setIndex(0);
  };

  return (
    <div className="bg-blue-950 h-screen ">

      <div className="max-w-2xl flex justify-center items-center flex-col gap-10 mx-auto py-10">
        {!init ? (
          <button
            className="w-1/2 bg-blue-400 p-3 font-principal text-6xl text-blue-950 rounded-2xl transition-all hover:bg-blue-300 "
            onClick={() => setInit(true)}
          >
            Start Game
          </button>
        ) : (
          <p className="bg-blue-400 p-3 font-principal text-6xl text-blue-950 rounded-2xl">
            Level {level}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-green-500 w-52 h-52 rounded-tl-full transition-all hover:opacity-80  block"
            ref={refGreen}
            onClick={handleClick}
            id="green"
          ></button>

          <button
            className="bg-red-500 w-52 h-52 rounded-tr-full transition-all hover:opacity-80  block"
            ref={refRed}
            onClick={handleClick}
            id="red"
          ></button>

          <button
            className="bg-yellow-500 w-52 h-52 rounded-bl-full transition-all hover:opacity-80  block"
            ref={refYellow}
            onClick={handleClick}
            id="yellow"
          ></button>

          <button
            className="bg-blue-500 w-52 h-52 rounded-br-full transition-all hover:opacity-80  block"
            ref={refBlue}
            onClick={handleClick}
            id="blue"
          ></button>
        </div>

        {finish && <p className="bg-white text-5xl font-principal text-blue-900 rounded-lg p-3">Game Over!!</p>}
      </div>
    </div>
  );
}

export default App;

//users

//const handleUserList = () => {};

{
  /* <div className="w-1/2 flex ">
          <input
            className="p-3 w-3/4 text-xl outline-none border-none rounded-tl-xl rounded-bl-xl"
            type="text"
            id=""
          />
          <button className="w-1/4 border-none  bg-gray-100 p-2 transition-all rounded-tr-xl rounded-br-xl hover:bg-gray-300">
            Add
          </button>
        </div> */
}

{
  /* <table>
        <tr>
          <th>Name</th>
          <th>Level</th>
        </tr>
        {orderArray.map(({ user, level }) => (
          <tr>
            <td>{user}</td>
            <td>{level}</td>
          </tr>
        ))}
      </table> */
}

// const orderArray = users.sort((a, b) => b.level - a.level);
