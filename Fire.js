import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB1tv1-Mk_CAY5nUvaoun5zeg6Z6nOQJaU",
        authDomain: "grem-customlogin.firebaseapp.com",
        databaseURL: "https://grem-customlogin.firebaseio.com",
        projectId: "grem-customlogin",
        storageBucket: "grem-customlogin.appspot.com",
        messagingSenderId: "452326262426",
        appId: "1:452326262426:web:8d6b7532b732af4bef8123",
        measurementId: "G-R9DJYM8H37",
      });
    }
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
