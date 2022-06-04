import CheckLocation from './checkLocation';
import { useState } from 'react';

const GameArea = ({ gameData, changeCharacterFound, keepLookingTT }) => {
  const [clickActive, setClickActive] = useState(false);
  const [clickCoords, setClickCoords] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [naturalDimensions, setNaturalDimensions] = useState({});

  const handleClick = (e) => {
    const { clientHeight, clientWidth } = e.target;
    setImageDimensions({ clientHeight, clientWidth });
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickCoords({ xClickCoord: x, yClickCoord: y });
    setClickActive(true);
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalDimensions({ naturalWidth, naturalHeight });
  };

  const forceClickInactive = () =>
    setTimeout(() => {
      setClickActive(false);
    }, 250);

  return (
    <div id='game-image-container'>
      {clickActive ? (
        <CheckLocation
          selectedGame={gameData.selectedGame}
          characters={gameData.characters}
          imageDimensions={imageDimensions}
          clickCoords={clickCoords}
          forceClickInactive={forceClickInactive}
          naturalDimensions={naturalDimensions}
          changeCharacterFound={changeCharacterFound}
          userIdDocref={gameData.userIdDocref}
          keepLookingTT={keepLookingTT}
        />
      ) : null}
      <img
        onClick={handleClick}
        className='game-image'
        src={process.env.PUBLIC_URL + gameData.selectedMap}
        alt={gameData.gameNum}></img>
    </div>
  );
};

export default GameArea;
