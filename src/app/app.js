import Nav from './components/nav';
import Modal from './components/modal';
import { useEffect, useState } from 'react';
import GameArea from './components/gameArea';
import WinScreen from './components/winscreen';
import getCorrectCharacters from './utils/staticGameData';
import Tooltip from './components/tooltip';
import {
  createNewUser,
  createMaps,
  staticCharOneInfo,
  staticCharTwoInfo,
} from './utils/staticGameData';
import {
  checkdbIfAllCharsAreFound,
  createTempUser,
  deleteAfter24Hours,
  getHighscores,
  getTempUser,
  getTotalTime,
  pushToHighscores,
  updatedbCharFound,
  updatedbEndTimestamp,
  updatedbSelectedGame,
  updatedbStartTimestamp,
  updateUserWithUserID,
  updateTempUserName,
} from './firebase-utils/firestore';

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
  const [highscores, setHighscores] = useState([]);
  const [time, setTime] = useState(null);
  const [userMadeHighscores, setUserMadeHighscores] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [tooltip, setTooltip] = useState({ text: '', status: '' });
  const [ttTimer, setTTTimer] = useState(null);

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

  const checkDbForWin = async () => {
    const res = await checkdbIfAllCharsAreFound(tempUserDocRef);
    if (res) {
      await updatedbEndTimestamp(tempUserDocRef);
      setEndTimestamp();
      setIsGameLive(false);
      setWin(true);
      const time = await getTotalTime(tempUserDocRef);
      setTime(time);
      await checkIfUserMadeHighscores();
    }
  };

  const checkIfUserMadeHighscores = async () => {
    const user = await getTempUser(tempUserDocRef);

    if (highscores.length === 0) return makeNewHighscores(user);

    if (highscores.length < 10) return makeNewHighscores(user);

    return user.time < highscores[highscores.length - 1].time
      ? makeNewHighscores(user)
      : false;
  };

  const makeNewHighscores = (user) => {
    setUserMadeHighscores(true);
    setAllowSubmit(true);
    const arr = [...highscores];
    if (arr.length === 10) arr.pop();
    arr.push(user);
    const sortedArr = arr.sort((a, b) => a.time - b.time);
    setHighscores(sortedArr);
  };

  const updateTooltip = (text, status) => {
    clearTimeout(ttTimer);
    setTTTimer(null);
    setTooltip({ text, status });
    setTTTimer(
      setTimeout(() => {
        setTooltip({ text: '', status: '' });
      }, 2000)
    );
  };

  const keepLookingTT = () => updateTooltip('keep looking!', false);

  const changeCharacterFound = async (characterNum) => {
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
    updateTooltip(`${gameData.characters[characterNum].name} found!`, 'true');
    await updatedbCharFound(tempUserDocRef, characterNum);
    await checkDbForWin();
  };

  const addSelectedMapToGameData = (mapNumber) => {
    const selected = mapNumber === 1 ? maps.one : maps.two;
    setGameData((prevState) => ({
      ...prevState,
      selectedMap: selected,
      selectedGame: mapNumber,
    }));
  };

  const startGameBasedOnSelectedValue = async (number) => {
    addStaticValuesToGameData();
    setIsGameLive(true);
    addCharactersToGameData(number);
    addSelectedMapToGameData(number);
    const thisUserRef = await createTempUser();
    setTempUserDocRef(thisUserRef);
    await updatedbSelectedGame(thisUserRef, number);
    await updatedbStartTimestamp(thisUserRef);
    await updateUserWithUserID(thisUserRef);
    setStartTimestamp();
    setHighscores(await getHighscores(number));
  };

  const updateUserName = (newName) => {
    setGameData((prevState) => ({
      ...prevState,
      name: newName,
    }));
  };

  const resetGame = async () => {
    if (userMadeHighscores && allowSubmit) {
      setAllowSubmit(false);
      const checkIfNameIsEmpty =
        gameData.name.trim() === '' ? 'anon' : gameData.name;
      await updateTempUserName(tempUserDocRef, checkIfNameIsEmpty);
      await pushToHighscores(tempUserDocRef);
    }
    setIsGameLive(false);
    setWin(false);
    setGameData({});
    setTempUserDocRef();
    setHighscores([]);
    setTime(null);
    setUserMadeHighscores(false);
    setAllowSubmit(false);
  };

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

  // on first render
  useEffect(() => {
    const deleteOld = async () => await deleteAfter24Hours();
    deleteOld();
  }, []);

  // timer
  useEffect(() => {
    let intervalId;
    if (isGameLive) {
      intervalId = setInterval(() => incrementTime(), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isGameLive]);

  useEffect(() => {
    if (gameData.hasOwnProperty('characters')) {
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
          />
          <Tooltip tooltip={tooltip} setTooltip={setTooltip} />
          <GameArea
            gameData={gameData}
            changeCharacterFound={changeCharacterFound}
            createStartTimeStamp={setStartTimestamp}
            checkForWin={checkForWin}
            maps={maps}
            keepLookingTT={keepLookingTT}
          />
        </div>
      ) : null}
      {!isGameLive && win ? (
        <WinScreen
          resetGame={resetGame}
          tempUserDocRef={tempUserDocRef}
          highscores={highscores}
          setHighscores={setHighscores}
          time={time}
          userMadeHighscores={userMadeHighscores}
          updateUserName={updateUserName}
          name={gameData.name}
          allowSubmit={allowSubmit}
          setAllowSubmit={setAllowSubmit}
        />
      ) : null}
    </div>
  );
};

export default App;
