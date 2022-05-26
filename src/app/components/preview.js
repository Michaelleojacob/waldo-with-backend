// const EachChar = ({ char }) => {
//   return (
//     <div id='preview-chars'>
//       <img
//         className='preview-char-icon'
//         src={process.env.PUBLIC_URL + char.image}
//         alt={char.name + ' image'}></img>
//       <div className='char-name-and-from'>
//         <div className='char-name'>{char.name}</div>
//         <div className='char-from'>{char.from}</div>
//       </div>
//     </div>
//   );
// };

// const PreviewContent = ({ chars, img, start }) => {
//   return (
//     <div id='preview-content'>
//       <div id='preview-img-container'>
//         <img
//           id='preview-img'
//           src={process.env.PUBLIC_URL + img}
//           alt='img1'></img>
//       </div>
//       <div id='chars-and-start-container'>
//         <EachChar char={chars.one} />
//         <EachChar char={chars.two} />
//         <EachChar char={chars.three} />
//         <div id='start-btn-container'>
//           <button id='start-game-btn' onClick={start}>
//             start
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const Preview = ({ selected, start }) => {
  return (
    <div id='prev-wrapper'>
      {selected === 1 ? (
        // <PreviewContent start={start} />
        <div>one</div>
      ) : (
        // <PreviewContent start={start} />
        <div>two</div>
      )}
    </div>
  );
};

export default Preview;
