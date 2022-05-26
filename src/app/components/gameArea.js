import CheckLocation from './checkLocation';
import { useState } from 'react';

const GameArea = (props) => {
  const { gameData, changeCharacterFound, startGame } = props;
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

  // const forceClickInactive = () => setClickActive(false);
  const forceClickInactive = () =>
    setTimeout(() => {
      setClickActive(false);
    }, 250);

  return (
    <div id='game-image-container'>
      {clickActive ? (
        <CheckLocation
          gameData={gameData}
          imageDimensions={imageDimensions}
          clickCoords={clickCoords}
          forceClickInactive={forceClickInactive}
          naturalDimensions={naturalDimensions}
          changeCharacterFound={changeCharacterFound}
        />
      ) : null}
      <img
        onClick={handleClick}
        className='game-image'
        src={process.env.PUBLIC_URL + gameData.image}
        alt={gameData.gameNum}
        onLoad={startGame}></img>
    </div>
  );
};

export default GameArea;
