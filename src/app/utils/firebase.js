import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDZfHqf1DOVKGruNGS5EglfucSAsv8acUI',
  authDomain: 'findus-afb51.firebaseapp.com',
  projectId: 'findus-afb51',
  storageBucket: 'findus-afb51.appspot.com',
  messagingSenderId: '320521837776',
  appId: '1:320521837776:web:b80c44c441c669129f12d5',
  measurementId: 'G-4PRGFLXVR3',
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}

const app = initializeApp(firebaseConfig);

export default app;
