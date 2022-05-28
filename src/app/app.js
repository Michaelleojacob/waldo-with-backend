import Nav from './components/nav';
import Modal from './components/modal';
import { useEffect, useState } from 'react';
import GameArea from './components/gameArea';
import WinScreen from './components/winscreen';
import getCorrectCharacters from './utils/staticGameData';
import {
  createNewUser,
  createMaps,
  staticCharOneInfo,
  staticCharTwoInfo,
} from './utils/staticGameData';
import { createTempUser, deleteAfter24Hours } from './firebase-utils/firestore';

const App = () => {
  const [isGameLive, setIsGameLive] = useState(false);
  const [gameData, setGameData] = useState({});
  const [win, setWin] = useState(false);
  // eslint-disable-next-line
  const [maps, setMaps] = useState(createMaps());
  // eslint-disable-next-line
  const [gameOneInfo, setGameOneInfo] = useState(staticCharOneInfo());
  // eslint-disable-next-line
  const [gameTwoInfo, setGameTwoInfo] = useState(staticCharTwoInfo());
  const [tempUserDocRef, setTempUserDocRef] = useState();

  const addStaticValuesToGameData = (num) => {
    const userInfoObj = createNewUser();
    setGameData((prevState) => ({
      ...prevState,
      ...userInfoObj,
    }));
  };

  const addCharactersToGameData = (num) => {
    const charObj = getCorrectCharacters(num);
    setGameData((prevState) => ({
      ...prevState,
      characters: { ...charObj },
    }));
  };

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

  const changeUserSelectedGame = (num) => {
    setGameData((prevState) => ({
      ...prevState,
      selectedGame: num,
    }));
  };

  const addSelectedMapToGameData = (mapNumber) => {
    const selected = mapNumber === 1 ? maps.one : maps.two;
    setGameData((prevState) => ({
      ...prevState,
      selectedMap: selected,
    }));
  };

  const startGameBasedOnSelectedValue = async (number) => {
    setIsGameLive(true);
    setWin(false);
    addCharactersToGameData(number);
    addSelectedMapToGameData(number);
    changeUserSelectedGame(number);
    const thisUserRef = await createTempUser();
    setTempUserDocRef(thisUserRef);
  };

  const resetGame = () => {
    setIsGameLive(false);
    setWin(false);
    setGameData({});
  };

  const createStartTimeStamp = () => setStartTimestamp();

  const incrementTime = () =>
    setGameData((prevState) => ({
      ...prevState,
      time: prevState.time + 1,
    }));

  const setStartTimestamp = () =>
    setGameData((prevState) => ({
      ...prevState,
      timestamps: {
        ...prevState.timestamps,
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
      timestamps: {
        ...prevState.timestamps,
        end: Date.now(),
      },
    }));

  useEffect(() => {
    addStaticValuesToGameData();
    deleteAfter24Hours();
  }, []);

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
        <Modal
          startGameBasedOnSelectedValue={startGameBasedOnSelectedValue}
          gameOneInfo={gameOneInfo}
          gameTwoInfo={gameTwoInfo}
          maps={maps}
        />
      ) : null}
      {isGameLive && !win ? (
        <div>
          <Nav
            characters={gameData.characters}
            time={gameData.time}
            gameData={gameData}
            checkForWin={checkForWin}
            tempUserDocRef={tempUserDocRef}
          />
          <GameArea
            gameData={gameData}
            changeCharacterFound={changeCharacterFound}
            createStartTimeStamp={createStartTimeStamp}
            checkForWin={checkForWin}
            maps={maps}
          />
        </div>
      ) : null}
      {!isGameLive && win ? (
        <WinScreen timestamps={gameData.timestamps} resetGame={resetGame} />
      ) : null}
    </div>
  );
};

export default App;
