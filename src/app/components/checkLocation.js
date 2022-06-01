//this logic+component is for the pop up that happens on click

import compareXYClickWithXYCharacter from '../utils/checkXYcoords';
import { getCharCoords } from '../firebase-utils/firestore';

const CheckLocation = ({
  selectedGame,
  changeCharacterFound,
  characters,
  clickCoords,
  imageDimensions,
  naturalDimensions,
  forceClickInactive,
}) => {
  //dimensions and click values
  const { xClickCoord, yClickCoord } = clickCoords;
  const { clientWidth, clientHeight } = imageDimensions;
  //need natural for ratio calculations

  const closeModal = (e) => {
    if (
      e.target.id === 'menu-modal-container' ||
      e.target.id === 'menu-modal-circle'
    ) {
      forceClickInactive();
    }
  };

  const handleCheckXYCoords = async (e) => {
    const charNum = e.target.value;
    const characterCoords = await getCharCoords(selectedGame, charNum);
    const obj = {
      characterCoords,
      clickCoords,
      naturalDimensions,
      imageDimensions,
    };
    const result = compareXYClickWithXYCharacter(obj);
    if (result) {
      changeCharacterFound(charNum);
    }
    forceClickInactive();
  };

  return (
    <div
      id='menu-modal-container'
      onClick={(e) => closeModal(e)}
      style={{ width: clientWidth, height: clientHeight }}>
      <div
        id='menu-modal-circle'
        style={{
          transform: `translate(calc(${xClickCoord}px - 50%), calc(${yClickCoord}px - 50%))`,
        }}></div>
      <div
        id='menu-modal-selection'
        style={{
          transform: `translate(calc(${xClickCoord}px + 50%), calc(${yClickCoord}px - 50%))`,
        }}>
        <div id='character-selection'>
          <CharacterButton
            character={characters.one}
            handleCheckXYCoords={handleCheckXYCoords}
          />
          <CharacterButton
            character={characters.two}
            handleCheckXYCoords={handleCheckXYCoords}
          />
          <CharacterButton
            character={characters.three}
            handleCheckXYCoords={handleCheckXYCoords}
          />
        </div>
      </div>
    </div>
  );
};

const CharacterButton = ({ character, handleCheckXYCoords }) => {
  return (
    <button
      className='character-button'
      value={character.number}
      onClick={handleCheckXYCoords}
      disabled={character.found}
      style={
        character.found
          ? {
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }
          : {}
      }>
      {character.name}
    </button>
  );
};

export default CheckLocation;
