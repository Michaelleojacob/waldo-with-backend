const checkWidth = (obj) => {
  const widthRatio = obj.naturalWidth / obj.clientWidth;
  const xCoordToCheck = obj.xClickCoord * widthRatio;
  const low = obj.x - 50;
  const high = obj.x + 50;

  const xResult = xCoordToCheck >= low && xCoordToCheck <= high ? true : false;
  return xResult;
};

const checkHeight = (obj) => {
  const heightRatio = obj.naturalHeight / obj.clientHeight;
  const yCoordToCheck = obj.yClickCoord * heightRatio;
  const low = obj.y - 50;
  const high = obj.y + 50;

  const yResult = yCoordToCheck >= low && yCoordToCheck <= high ? true : false;
  return yResult;
};

const compareXYClickWithXYCharacter = (obj) => {
  const { clientWidth, clientHeight } = obj.imageDimensions;
  const { naturalWidth, naturalHeight } = obj.naturalDimensions;
  const { xClickCoord, yClickCoord } = obj.clickCoords;
  const { x, y } = obj.characterCoords;

  const xResult = checkWidth({ x, clientWidth, naturalWidth, xClickCoord });
  const yResult = checkHeight({ y, clientHeight, naturalHeight, yClickCoord });

  const xyResult = xResult === true && yResult === true ? true : false;
  return xyResult;
};

export default compareXYClickWithXYCharacter;
