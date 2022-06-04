import {
  updateTempUserName,
  pushToHighscores,
} from '../firebase-utils/firestore';

const secondsToMinutes = (time) => {
  const seconds = Number(time);
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const formatHours = (val) => `${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;

  //only seconds
  if (hours < 1 && minutes < 1)
    return [minutes, seconds % 60].map(format).join(':');

  //format minutes
  if (hours < 1 && minutes >= 1)
    return [minutes, seconds % 60].map(format).join(':');

  //includes hours lol
  return [hours, minutes, seconds % 60].map(formatHours).join(':');
};

const WinScreen = ({
  resetGame,
  tempUserDocRef,
  highscores,
  setHighscores,
  time,
  userMadeHighscores,
  name,
  updateUserName,
  allowSubmit,
  setAllowSubmit,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allowSubmit || !userMadeHighscores) return;
    if (allowSubmit && userMadeHighscores) {
      setAllowSubmit(false);
      await updateTempUserName(tempUserDocRef, name);
      await pushToHighscores(tempUserDocRef);
    }
    return;
  };

  const getUserIndex = (arr, id) => arr.filter((item) => item.id === id);

  const updateFieldChange = (id) => (e) => {
    let newArr = [...highscores];
    const user = getUserIndex(newArr, id);
    user[0].name = e.target.value.replace(/[^a-z]/gi, '');
    updateUserName(user[0].name);
    setHighscores(newArr);
  };

  return (
    <div id='winscreen-container'>
      <div id='winscreen-content'>
        <div>
          {userMadeHighscores
            ? 'congrats you made highscores!'
            : 'congrats you won!'}
        </div>
        <div id='speed'>
          <div>final time:</div>
          <div id='completion-time'>
            {time === null ? 'loading...' : secondsToMinutes(time)}
          </div>
        </div>
        {userMadeHighscores ? (
          <form id='winscreen-form' onSubmit={handleSubmit}>
            <fieldset id='winscreen-fieldset' disabled={!allowSubmit}>
              <div id='submit-name'>
                <div>
                  {allowSubmit
                    ? 'enter a name:'
                    : 'your score has been recorded!'}
                </div>
                <input
                  className={allowSubmit ? 'display-input' : 'hide-input'}
                  placeholder='anon'
                  value={name}
                  onChange={updateFieldChange(tempUserDocRef)}
                  maxLength={4}
                  type='text'></input>
              </div>
            </fieldset>
          </form>
        ) : null}
        <button onClick={resetGame}>play again?</button>
        <HighScores highscores={highscores} tempUserDocRef={tempUserDocRef} />
      </div>
    </div>
  );
};

export default WinScreen;

const HighScores = ({ highscores, tempUserDocRef }) => {
  return (
    <div className='highscores'>
      {highscores.map((score, index) => (
        <EachScore
          obj={score}
          index={index}
          key={index}
          tempUserDocRef={tempUserDocRef}
        />
      ))}
    </div>
  );
};

const EachScore = ({ obj, index, tempUserDocRef }) => {
  return (
    <div className={obj.id === tempUserDocRef ? 'userScore' : 'score'}>
      <div>{index + 1}.</div>
      <div>{obj.name}</div>
      <div>{secondsToMinutes(obj.time)}</div>
    </div>
  );
};
