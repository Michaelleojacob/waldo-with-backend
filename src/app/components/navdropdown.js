const EachCharacter = (props) => {
  const { char } = props;
  return (
    <div
      className={'character-card'}
      style={char.found ? { opacity: 0.5 } : {}}>
      <img
        className='char-image'
        src={process.env.PUBLIC_URL + char.image}
        alt={char.name}></img>
      <div
        style={
          char.found
            ? {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }
            : {}
        }>
        {char.name}
      </div>
    </div>
  );
};

const NavDropdown = (props) => {
  const { characters } = props;
  return (
    <div id='dropdown-content'>
      <EachCharacter char={characters.one} />
      <EachCharacter char={characters.two} />
      <EachCharacter char={characters.three} />
    </div>
  );
};

export default NavDropdown;
