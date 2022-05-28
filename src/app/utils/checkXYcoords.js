const checkWidth = (obj) => {
  const widthRatio = obj.naturalWidth / obj.clientWidth;
  const xCoordToCheck = obj.xClickCoord * widthRatio;
  const low = obj.x - 50;
  const high = obj.x + 50;
  if (xCoordToCheck >= low && xCoordToCheck <= high) {
    return true;
  }
  return false;
};

const checkHeight = (obj) => {
  const heightRatio = obj.naturalHeight / obj.clientHeight;
  const yCoordToCheck = obj.yClickCoord * heightRatio;
  const low = obj.y - 50;
  const high = obj.y + 50;
  //   console.log(`low:${low} high:${high} xcoord:${yCoordToCheck}`);
  if (yCoordToCheck >= low && yCoordToCheck <= high) {
    return true;
  }
  return false;
};

const compareXYClickWithXYCharacter = (obj) => {
  console.log(obj);
  const { clientWidth, clientHeight } = obj.imageDimensions;
  const { naturalWidth, naturalHeight } = obj.naturalDimensions;
  const { xClickCoord, yClickCoord } = obj.clickCoords;
  const { x, y } = obj.characterCoords;

  const xResult = checkWidth({ x, clientWidth, naturalWidth, xClickCoord });
  const yResult = checkHeight({ y, clientHeight, naturalHeight, yClickCoord });

  if (xResult === true && yResult === true) {
    return true;
  }
  return false;
};

export default compareXYClickWithXYCharacter;
