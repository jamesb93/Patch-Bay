import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { writable } from 'svelte/store';

const firebaseConfig = {
	"apiKey": import.meta.env.VITE_FIREBASE_APIKEY,
	"authDomain": import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	"projectId": import.meta.env.VITE_FIREBASE_PROJECT_ID,
	"storageBucket": import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	"messagingSenderId": import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	"appId": import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = writable(null);

onAuthStateChanged(auth, (u) => {
	user.set(u);
});

export { app, auth, user };
