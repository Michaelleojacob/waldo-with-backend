//this logic+component is for the pop up that happens on click

import compareXYClickWithXYCharacter from '../utils/checkXYcoords';

const CharacterButton = (props) => {
  return (
    <button
      className='character-button'
      value={props.character.number}
      onClick={props.handleCheckXYCoords}
      disabled={props.character.found}
      style={
        props.character.found
          ? {
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }
          : {}
      }>
      {props.character.name}
    </button>
  );
};

const CheckLocation = (props) => {
  //gamedata and characters
  const { gameData, changeCharacterFound } = props;
  const { characters } = gameData;

  //changefound status
  // const { changeCharacterFound } = props;
  //dimensions and click values
  const { xClickCoord, yClickCoord } = props.clickCoords;
  const { clientWidth, clientHeight } = props.imageDimensions;
  //need natural for ratio calculations

  const closeModal = (e) => {
    if (
      e.target.id === 'menu-modal-container' ||
      e.target.id === 'menu-modal-circle'
    ) {
      props.forceClickInactive();
    }
  };

  const handleCheckXYCoords = (e) => {
    const targetNumber = e.target.value;
    const character = characters[targetNumber];
    const obj = {
      characterCoords: character.coords,
      clickCoords: props.clickCoords,
      naturalDimensions: props.naturalDimensions,
      clientDimensions: props.imageDimensions,
    };
    const result = compareXYClickWithXYCharacter(obj);
    if (result) {
      changeCharacterFound(targetNumber);
    }
    props.forceClickInactive();
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

export default CheckLocation;
