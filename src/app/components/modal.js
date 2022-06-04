import { useState } from 'react';
import Preview from './preview';
import {
  staticCharOneInfo,
  staticCharTwoInfo,
  createMaps,
} from '../utils/staticGameData';

const Modal = ({ startGameBasedOnSelectedValue }) => {
  const [selected, setSelected] = useState(1);

  const handleStart = () => {
    switch (selected) {
      case 1:
        startGameBasedOnSelectedValue(1);
        break;
      case 2:
        startGameBasedOnSelectedValue(2);
        break;
      default:
        console.log('error');
        break;
    }
  };

  return (
    <div id='init-modal-container'>
      <div id='modal-content'>
        <div id='modal-title'>
          <p id='find'>Find</p>
          <p id='us'>Us</p>
        </div>
        <div id='instructions'>
          <div>- select map</div>
          <div>- press start</div>
        </div>
        <div id='select-game-btns'>
          <button className='select-map-btn' onClick={() => setSelected(1)}>
            A.D 2.222
          </button>
          <button className='select-map-btn' onClick={() => setSelected(2)}>
            Universe 113
          </button>
        </div>
        <Preview
          selected={selected}
          start={handleStart}
          gameOneInfo={staticCharOneInfo()}
          gameTwoInfo={staticCharTwoInfo()}
          maps={createMaps()}
        />
        <div id='artist-name'>artwork by Egor Klycuhnyk</div>
      </div>
    </div>
  );
};

export default Modal;
