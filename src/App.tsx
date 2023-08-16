import React, { useState, useEffect, useRef, MutableRefObject } from "react";

import "./app.sass";

import "/src/Components/Boxs/Boxs.sass";

import { colors, users } from "./Dates.ts";
import Boxs from "./Components/Boxs/Boxs";
import DatesUser from "./Components/DatesUser/DatesUser.tsx";

function App() {
  const [sequency, setSequency] = useState<string[]>([]);

  const [isInit, setIsInit] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [level, setLevel] = useState(1);
  const [finalLevelUser, setFinalLevelUser] = useState(1);

  const refGreen = useRef<HTMLButtonElement | null>(null);
  const refRed = useRef<HTMLButtonElement | null>(null);
  const refYellow = useRef<HTMLButtonElement | null>(null);
  const refBlue = useRef<HTMLButtonElement | null>(null);

  const inputError = useRef<HTMLInputElement>(null);
  const [inputUser, setInputUser] = useState("");
  const [nameUser, setNameUser] = useState("");

  const [userAdd, setUserAdd] = useState(false);

  const [index, setIndex] = useState(0);

  const [notClicked, setNotClicked] = useState(true);

  const initGame = (e: React.MouseEvent) => {
    if (nameUser) {
      setIsInit(true);
      setFinalLevelUser(1);
      setUserAdd(false);
    } else {
      inputError.current?.classList.add("error");
      inputError.current?.focus();
    }
  };

  if (inputUser.length > 0) inputError.current?.classList.remove("error");

  const addNameUser = () => {
    if (inputUser.length > 0) {
      setNameUser(inputUser);
      setInputUser("");
      setUserAdd(true);
    } else {
      inputError.current?.classList.add("error");
      inputError.current?.focus();
    }
  };

  useEffect(() => {
    if (isInit) {
      selectedColor();
    }
  }, [isInit]);

  const selectedColor = () => {
    setTimeout(() => {
      setNotClicked(true);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setSequency((sc) => [...sc, randomColor]);
    }, 500);
  };

  useEffect(() => {
    if (sequency.length !== 0) {
      const handleSequency = (i = 0) => {
        let ref: MutableRefObject<HTMLButtonElement | null> | null;

        if (sequency[i] === "green") ref = refGreen;
        if (sequency[i] === "red") ref = refRed;
        if (sequency[i] === "blue") ref = refBlue;
        if (sequency[i] === "yellow") ref = refYellow;

        setTimeout(() => {
          // ref?.current.classList.add("active");
          ref === refBlue && refBlue.current?.classList.add("active");
          ref === refGreen && refGreen.current?.classList.add("active");
          ref === refRed && refRed.current?.classList.add("active");
          ref === refYellow && refYellow.current?.classList.add("active");
          setTimeout(() => {
            // ref?.current.classList.remove("active");
            ref === refBlue && refBlue.current?.classList.remove("active");
            ref === refGreen && refGreen.current?.classList.remove("active");
            ref === refRed && refRed.current?.classList.remove("active");
            ref === refYellow && refYellow.current?.classList.remove("active");

            if (i < sequency.length - 1) {
              handleSequency(i + 1);
            }
            setNotClicked(false);
          }, 500);
        }, 500);
      };
      handleSequency();
    }
  }, [sequency]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof Element && notClicked === false) {
      const { id } = e.target;

      
      const clicked = new Audio(`/src/assets/sound/simonSound-${id}.mp3`);
      clicked.play();

      const boxItem = document.getElementById(id);
      boxItem?.classList.add("active");
      setTimeout(() => {
        boxItem?.classList.remove("active");
      }, 100);

      if (id === sequency[index]) {
        if (index === sequency.length - 1) {
          setLevel(level + 1);
          setIndex(0);

          selectedColor();
        } else setIndex(index + 1);
      } else gameOver();
      setNotClicked(false);
    }
  };

  const gameOver = () => {
    setSequency([]);
    setFinalLevelUser(level);
    setLevel(1);
    setIsInit(false);
    setIsFinish(true);
    setIndex(0);
  };

  return (
    <div className="containerAll">
      <div className="containerBtn">
        {!isInit ? (
          <button className="startGame" onClick={initGame}>
            Start Game
          </button>
        ) : (
          <p className="level">Level {level}</p>
        )}

        {!nameUser.length && (
          <div className="userInput">
            <input
              type="text"
              placeholder="Write your name!"
              className="inputUser"
              onChange={(e) => setInputUser(e.target.value)}
              value={inputUser}
              ref={inputError}
            />
            <button className="btnUser" onClick={addNameUser}>
              Submit
            </button>
          </div>
        )}

        {!isInit ? (
          <DatesUser
            name={nameUser}
            userAdd={userAdd}
            level={finalLevelUser}
          />
        ) : (
          <div className="containerBoxs">
            <Boxs
              ref={refGreen}
              id="green"
              nameClass="Green"
              onClick={handleClick}
            />
            <Boxs ref={refRed} id="red" nameClass="Red" onClick={handleClick} />
            <Boxs
              ref={refYellow}
              id="yellow"
              nameClass="Yellow"
              onClick={handleClick}
            />
            <Boxs
              ref={refBlue}
              id="blue"
              nameClass="Blue"
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
