/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';

import { useCallback, useEffect, useState } from 'react';
import { WordBoard } from './components/WordBoard/WordBoard';
import { GameStatus } from './components/GameStatus/GameStatus';
import { MobileKeyboard } from './components/MobileKeyboard/MobileKeyboard';
import { Timer } from './components/Timer/Timer';
import { iStatus } from './tools';

export const App = () => {
  const [timer, setTimer] = useState(10);
  const [mobileLetter, setMobileLetter] = useState("");
  const [gameStatus, setGameStatus] = useState<iStatus>(
      {paused: false, status: 1, message: null, callback: null}
  );

  const AppStyle = css`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 600px) {
      height: 100vh;
    }
  `

  const startTimer = () => {
    setTimer(10);
  }

  useCallback(()=>{
    startTimer();
  },[]);

  useEffect(()=> {
    if(!gameStatus.paused) {
      let countDown : any;
      if(timer>=0.1) {
          countDown = setTimeout(
            () => setTimer(timer-.06),
            50
          )
      } else {
        if(timer<0.1) {
          setTimer(0);
          setGameStatus({...gameStatus,paused: true,status:0,message:"Time's up!",callback:null});
        }
      };
      return () => {
        clearTimeout(countDown);
      }
    }
  },[timer,gameStatus])

  return (
    <div css={AppStyle}>
      <Global styles={css`
        *,*:before,*:after {
          box-sizing: border-box
        }

        body {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          margin: 0;
        }
      `} />
      <Timer 
        gameStatus={gameStatus}
        timer={timer}
      />
      <WordBoard
        gameStatus={gameStatus}
        mobileLetter={mobileLetter}
        setGameStatus={setGameStatus}
        timer={timer}
        setTimer={setTimer}
      />
      <GameStatus 
        gameStatus={gameStatus}
      />
      <MobileKeyboard 
        setMobileLetter={setMobileLetter}
      />
    </div>
  )
}