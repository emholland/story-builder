// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ed2mMisJetf4l96KrhtUP6sS_OLRG3U",
  authDomain: "storybuilder-153f1.firebaseapp.com",
  databaseURL: "https://storybuilder-153f1-default-rtdb.firebaseio.com",
  projectId: "storybuilder-153f1",
  storageBucket: "storybuilder-153f1.firebasestorage.app",
  messagingSenderId: "1061530797877",
  appId: "1:1061530797877:web:ec4e062f5f9484775f2e7c",
  measurementId: "G-N5DMY71FPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);