(() => {
    'use strict';

    // Firebaseの設定
    const firebaseConfig = {
        apiKey: "AIzaSyA7yxmdWnINOQTDVoDCjSjEmPGrzo4QZ5M",
        authDomain: "km-image.firebaseapp.com",
        databaseURL: "https://km-image.firebaseio.com",
        projectId: "km-image",
        storageBucket: "km-image.appspot.com",
        messagingSenderId: "938207171059",
        appId: "1:938207171059:web:2bd52aa3e82909ca"
    };

    // Firebaseの初期化
    firebase.initializeApp(firebaseConfig);

    // ストレージのルートの参照を取得
    const storageRef = firebase.storage().ref();

    //画像フォルダの
    const imageRef = storageRef.child('images/test.png');

    const uploadImage = document.getElementById('upload-image');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        const targetFile = uploadImage.files[0];
        imageRef.put(targetFile)
        /*
        .then(() => {
            console.log('アップロードしました')
        });
        */
    })

    

    /*

    // 参照に画像を
    var ref = storageRef.child('test.jpg');

    ref.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
    });

    */
})();