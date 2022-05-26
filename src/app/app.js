import Nav from './components/nav';
import Modal from './components/modal';
// import getCorrectCharacters from './utils/characters';
import { useEffect, useState } from 'react';
import GameArea from './components/gameArea';
import WinScreen from './components/winscreen';

const App = () => {
  const [isGameLive, setIsGameLive] = useState(false);
  const [gameData, setGameData] = useState({});
  const [win, setWin] = useState(false);

  const changeCharacterFound = (characterNum) => {
    setGameData((prevState) => ({
      ...prevState,
      characters: {
        ...prevState.characters,
        [characterNum]: {
          ...prevState.characters[characterNum],
          found: true,
        },
      },
    }));
  };

  const startGameOne = () => {
    setIsGameLive(true);
  };

  const startGameTwo = () => {
    setIsGameLive(true);
  };

  const resetGame = () => {
    setIsGameLive(false);
    setWin(false);
    setGameData({});
  };

  const startGame = () => {
    setIsGameLive(true);
    setWin(false);
    setStartTimestamp();
  };

  const incrementTime = () =>
    setGameData((prevState) => ({
      ...prevState,
      time: prevState.time + 1,
    }));

  const setStartTimestamp = () =>
    setGameData((prevState) => ({
      ...prevState,
      timeStamps: {
        ...prevState.timeStamps,
        start: Date.now(),
      },
    }));

  const checkForWin = () => {
    const checkCharacters = Object.values(gameData.characters).every(
      (char) => char.found
    );
    return checkCharacters;
  };

  const setEndTimestamp = () =>
    setGameData((prevState) => ({
      ...prevState,
      timeStamps: {
        ...prevState.timeStamps,
        end: Date.now(),
      },
    }));

  useEffect(() => {
    let intervalId;
    if (isGameLive) {
      intervalId = setInterval(() => incrementTime(), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isGameLive]);

  useEffect(() => {
    if (gameData.hasOwnProperty('characters')) {
      if (Object.values(gameData.characters).every((char) => char.found)) {
        setEndTimestamp();
        setIsGameLive(false);
        setWin(true);
      }
    }
    // eslint-disable-next-line
  }, [gameData.characters]);

  return (
    <div id='app-container'>
      {!isGameLive && !win ? (
        <Modal startGameOne={startGameOne} startGameTwo={startGameTwo} />
      ) : null}
      {isGameLive && !win ? (
        <div>
          <Nav
            resetGame={resetGame}
            characters={gameData.characters}
            time={gameData.time}
            gameData={gameData}
            checkForWin={checkForWin}
          />
          <GameArea
            gameData={gameData}
            changeCharacterFound={changeCharacterFound}
            startGame={startGame}
            checkForWin={checkForWin}
          />
        </div>
      ) : null}
      {!isGameLive && win ? (
        <WinScreen timeStamps={gameData.timeStamps} resetGame={resetGame} />
      ) : null}
    </div>
  );
};

export default App;
