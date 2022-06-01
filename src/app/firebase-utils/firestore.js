import { db } from './firebase';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
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
    return userSnap.data();
  }
};

export const checkIfUserExists = async (id) => {
  const userSnap = await getDoc(doc(db, 'tempUsers', id));
  return userSnap.exists();
};

export const updateTempUserName = async (id, nameInfo) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    name: nameInfo,
  });
};

export const updatedbCharFound = async (id, charNum) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    [`characters.${charNum}`]: true,
  });
};

export const updatedbStartTimestamp = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    'timestamps.start': serverTimestamp(),
  });
};

export const updatedEndTimestamp = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    'timestamps.end': serverTimestamp(),
  });
  return await getTotalTime(id);
};

export const getTotalTime = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  const { timestamps } = (await getDoc(userRef)).data();
  await updateDoc(userRef, {
    time: timestamps.end - timestamps.end,
  });
};

export const updatedbEndTimestamp = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  await updateDoc(userRef, {
    'timestamps.end': serverTimestamp(),
  });
};

export const deleteCurrentTempUser = async (id) => {
  const useRef = doc(db, 'tempUsers', id);
  await deleteDoc(useRef);
};

export const deleteAfter24Hours = async () => {
  const tempUsers = query(collection(db, 'tempUsers'));
  const userSnap = await getDocs(tempUsers);
  const now = Math.floor(Date.now() / 1000);
  const cutoff = Math.floor(now - 2 * 60 * 60);
  userSnap.forEach((doc) => {
    const { createdAt } = doc.data();
    if (createdAt.seconds < cutoff) {
      return deleteFromFireStore(doc.id);
    }
  });
};

const deleteFromFireStore = async (id) => {
  await deleteDoc(doc(db, 'tempUsers', id));
};

export const checkdbIfAllCharsAreFound = async (id) => {
  const userRef = doc(db, 'tempUsers', id);
  const userSnap = await getDoc(userRef);
  const { characters } = userSnap.data();
  return Object.values(characters).every((item) => item === true);
};
