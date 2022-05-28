import { db } from './firebase';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

export const createTempUser = async () => {
  try {
    const docRef = await addDoc(collection(db, 'tempUsers'), {
      name: 'anon',
      selectedGame: null,
      timestamps: {
        start: null,
        end: null,
      },
      characters: {
        one: false,
        two: false,
        three: false,
      },
      createdAt: serverTimestamp(),
    });
    console.log(`document written with id: ${docRef.id}`);
    return docRef.id;
  } catch (e) {
    console.error('error adding document', e);
  }
};

export const getCharCoords = async (gameNum, charNum) => {
  const selectedGame = gameNum === 1 ? 'gameOneChars' : 'gameTwoChars';
  const docRef = doc(db, selectedGame, charNum);
  const docSnap = await getDoc(docRef);
  const { x, y } = docSnap.data();
  return { x, y };
};

export const getTempUser = async (id) => {
  const userSnap = await getDoc(doc(db, 'tempUsers', id));
  if (userSnap.exists()) {
    console.log(userSnap.data());
  }
};

export const updateTempUserName = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    name: 'lol',
  });
};

export const updateNestedFields = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    'characters.one': true,
  });
};
