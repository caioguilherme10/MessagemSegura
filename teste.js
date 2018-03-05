// Initialize Firebase
var config = {
    apiKey: "AIzaSyCo3LoTiIzs-5PnEQ4P2fu7ar9RhSjUBpk",
    authDomain: "test1-52fcf.firebaseapp.com",
    databaseURL: "https://test1-52fcf.firebaseio.com",
    projectId: "test1-52fcf",
    storageBucket: "test1-52fcf.appspot.com",
    messagingSenderId: "881595179922"
};
firebase.initializeApp(config);

/*const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const uid = '1';
console.log(usersRef);
const daveRef = usersRef.child(uid);
console.log(daveRef);
daveRef.update({name : 'dave5'});

const dbRefObjec1 = firebase.database().ref();
const dbRefList1 = dbRefObjec1.child('users');

dbRefList1.on('child_added', snap => {
    console.log(snap.val().name);
});*/

const auth = firebase.auth();
var novoEmail = "caio4@gmail.com";
var novoPass = "caio0123";
var novoName = "caio2";

firebase.auth().createUserWithEmailAndPassword(novoEmail, novoPass).then(function(){});

/*o metodo signInWithEmailAndPassword serve para fazer o login no firebase.
auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
	// Handle Errors here.
	if (email == ""||pass == "") {
		alert("Preencha os dados vazios!")
	}else{
		alert("Dados incorretos!")
	}
    // ...
});*/

firebase.auth().onAuthStateChanged(firebaseUser =>{
    console.log(firebaseUser.uid);

    firebase.database().ref('users/' + firebaseUser.uid).set({
        name : novoName,
        email : novoEmail,
        pass : novoPass
    });

});

const dbRefObjec = firebase.database().ref();
const dbRefList = dbRefObjec.child('users');
			
			
//Sync list changes.metodo de recuperar os dados do usuario.
dbRefList.on('child_added', snap => {
    console.log(snap.val().email);
});

firebase.auth().signOut();