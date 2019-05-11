import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyDXyL_N6EXKdWe5_T2cA4RUb5l1Qm4V84Y",
  authDomain: "test-fc28b.firebaseapp.com",
  databaseURL: "https://test-fc28b.firebaseio.com",
  projectId: "test-fc28b",
  storageBucket: "test-fc28b.appspot.com",
  messagingSenderId: "726783818688",
  appId: "1:726783818688:web:ae39775ad22936ae"
};

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

//firestoreの初期化
export const db = firebase.firestore();