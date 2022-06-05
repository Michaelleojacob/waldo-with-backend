import NavDropdown from './navdropdown';
import { useState } from 'react';

const Time = ({ time }) => {
  const secondCounter = time % 60;
  const minuteCounter = Math.floor((time % 3600) / 60);
  const hourCounter = Math.floor(time / 3600);

  const computedSecond =
    String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
  const computedMinute =
    String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
  const computedHour =
    String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

  return (
    <div>
      {computedHour}:{computedMinute}:{computedSecond}
    </div>
  );
};

const Nav = ({ characters, time, resetGame }) => {
  const [dropIsOpen, setDropIsOpen] = useState(false);

  const forceClose = () => setDropIsOpen(false);

  const toggleIsOpen = () => setDropIsOpen(!dropIsOpen);

  const handleDropdown = () => toggleIsOpen();

  const handleReset = () => resetGame();

  return (
    <div id='nav-container'>
      <div id='nav-title' onClick={handleReset}>
        <p id='nav-find'>Find</p>
        <p id='nav-us'>Us</p>
        <span className='title-tooltip-text'>reset game</span>
      </div>
      <Time time={time} />
      <div id='dropdown-container'>
        <button id='dropbtn' onClick={handleDropdown} onBlur={forceClose}>
          <span className='dropbtn-tooltip-text'>click here</span>
          {
            Object.values(characters).filter((char) => char.found === false)
              .length
          }
        </button>

        {dropIsOpen ? <NavDropdown characters={characters} /> : null}
      </div>
    </div>
  );
};

export default Nav;
