export const createNewUser = () => {
  const userData = {
    name: 'anon',
    selectedGame: null,
    timestamps: {
      start: null,
      end: null,
      time: null,
    },
  };
  return { ...userData };
};

export const staticGameOneData = () => {
  const gameOneData = {
    map: '/assets/egor-klyuchnyk-full-x-season-web.jpg',
    characters: {
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
    },
  };
  return { ...gameOneData };
};

export const staticGameTwoData = () => {
  const gameTwoData = {
    map: '/assets/egor-klyuchnyk-small.jpg',
    characters: {
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
    },
  };
  return { ...gameTwoData };
};
