export const createNewUser = () => {
  const userData = {
    name: 'anon',
    timestamps: {
      start: null,
      end: null,
    },
    time: 0,
  };
  return { ...userData };
};

export const createMaps = () => {
  const mapObj = {
    one: '/assets/egor-klyuchnyk-full-x-season-web.jpg',
    two: '/assets/egor-klyuchnyk-small.jpg',
  };
  return { ...mapObj };
};

export const staticCharOneInfo = () => {
  const gameOneData = {
    one: {
      name: 'No-Face',
      from: 'spirited away',
      number: 'one',
      found: false,
      image: '/assets/noface.jpg',
    },
    two: {
      name: 'Johnny Bravo',
      from: 'cartoon network',
      number: 'two',
      found: false,
      image: '/assets/johhnybravo.png',
    },
    three: {
      name: 'Meg',
      from: 'family guy',
      number: 'three',
      found: false,
      image: '/assets/meg.jpg',
    },
  };
  return { ...gameOneData };
};

export const staticCharTwoInfo = () => {
  const gameTwoData = {
    one: {
      name: 'Waldo',
      from: 'wheres waldo',
      number: 'one',
      found: false,
      image: '/assets/waldo.png',
    },
    two: {
      name: 'Totoro',
      from: 'my neighbor totoro',
      number: 'two',
      found: false,
      image: '/assets/bestTotoro.jpeg',
    },
    three: {
      name: 'Pale Man',
      from: "pan's labyrinth",
      number: 'three',
      found: false,
      image: '/assets/paleman1.jpg',
    },
  };
  return { ...gameTwoData };
};

const getCorrectCharacters = (num) => {
  let obj;
  switch (num) {
    case 1:
      obj = staticCharOneInfo();
      break;
    case 2:
      obj = staticCharTwoInfo();
      break;
    default:
      console.log('something went horribly wrong form getCorrectCharacters');
      break;
  }
  return obj;
};

export default getCorrectCharacters;
