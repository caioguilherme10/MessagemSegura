const novoEmail = document.getElementById('email');
const novoPass = document.getElementById('password');
const novoName = document.getElementById('first_name');
const btnNovo = document.getElementById('btnNovo');


btnNovo.addEventListener('click' , e => {
		
    if(novoEmail.value == "" || novoPass.value == "" || novoName.value == ""){
        swal("Preencha os campos vazios!")
    }else{
        firebase.auth().createUserWithEmailAndPassword(novoEmail.value, novoPass.value).catch(function(error) {
            swal("Erro ao Cadastrar!")
        });
    }
});

localStorage.setObject("usu", []);

firebase.auth().onAuthStateChanged(firebaseUser =>{

    if(firebaseUser.uid){

        novocrypt = generateKeys();

        var user = {
            email: novoEmail.value,
            name : novoName.value
        };

        var array = localStorage.getObject("usu");
        array.push(user);
        localStorage.setObject("usu", array);

        firebase.database().ref('users/' + firebaseUser.uid).set({
            name : novoName.value,
            email : novoEmail.value,
            pass : novoPass.value,
            keyPri : novocrypt.getPrivateKey()
        });

        firebase.database().ref('pessoas').push({
            name : novoName.value,
            keyPub : novocrypt.getPublicKey(),
            email : novoEmail.value
        }).key;

        //alert("Feito com sucesso")
        
    }

});

function generateKeys() {
    var crypt = new JSEncrypt({default_key_size: 2048});
    return crypt;
};