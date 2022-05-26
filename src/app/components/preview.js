const EachChar = ({ char }) => {
  return (
    <div id='preview-chars'>
      <img
        className='preview-char-icon'
        src={process.env.PUBLIC_URL + char.image}
        alt={char.name + ' image'}></img>
      <div className='char-name-and-from'>
        <div className='char-name'>{char.name}</div>
        <div className='char-from'>{char.from}</div>
      </div>
    </div>
  );
};

const PreviewContent = ({ chars, map, start }) => {
  return (
    <div id='preview-content'>
      <div id='preview-img-container'>
        <img
          id='preview-img'
          src={process.env.PUBLIC_URL + map}
          alt='img1'></img>
      </div>
      <div id='chars-and-start-container'>
        <EachChar char={chars.one} />
        <EachChar char={chars.two} />
        <EachChar char={chars.three} />
        <div id='start-btn-container'>
          <button id='start-game-btn' onClick={start}>
            start
          </button>
        </div>
      </div>
    </div>
  );
};

const Preview = ({ selected, start, gameOneInfo, gameTwoInfo, maps }) => {
  return (
    <div id='prev-wrapper'>
      {selected === 1 ? (
        <PreviewContent start={start} chars={gameOneInfo} map={maps.one} />
      ) : (
        <PreviewContent start={start} chars={gameTwoInfo} map={maps.two} />
      )}
    </div>
  );
};

export default Preview;
