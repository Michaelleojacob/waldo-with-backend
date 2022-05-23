const App = () => {
  const handleClick = () => console.log('hi');

  return (
    <div>
      <div>hi from app</div>
      <div>dude wtf</div>
      <button onClick={handleClick}>click to add data to firebase</button>
    </div>
  );
};

export default App;
