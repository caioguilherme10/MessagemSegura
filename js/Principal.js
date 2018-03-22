const btnLogout = document.getElementById('Sair');
	
// A funçao para deslogar o usuario do firebase. com o evento de click e a funcao signOut.
btnLogout.addEventListener('click', e => {
		
    firebase.auth().signOut();
    localStorage.setObject("usu", []);
	//O usuario e mandado para a pagina inicial.
	window.location.replace("Login.html");
});


var array = localStorage.getObject("usu");

const dbRefObjec = firebase.database().ref();

const two = dbRefObjec.child('users').orderByChild('email').equalTo(array[0].email);

two.on('child_added', snap => {

    document.getElementById("name").innerHTML = snap.val().name;
    document.getElementById("name2").innerHTML = snap.val().name;
    document.getElementById("email").innerHTML = snap.val().email;

    var user = {
        name: snap.val().name,
        email: snap.val().email,
        keyPri : snap.val().keyPri
    };

    array = [];
    array.push(user);
    localStorage.setObject("usu", array);

});



const dbRefList = dbRefObjec.child('pessoas');


dbRefList.on('child_added', snap2 => {

    var array2 = localStorage.getObject("usu");

    let name = snap2.val().name;

    if(name == array2[0].name){

    }else{
        contacts.innerHTML += "<ul  onclick=escolhido('" + name+ "','"+ snap2.val().email +"','"+ snap2.key + "')>"+
                        "<li class='contact'>"+
                        "<div class='wrap'>"+
                        "<span class='contact-status online'></span>"+
                        "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
                        "<div class='meta'>"+
                        "<p class='name'>"+ snap2.val().name +"</p>"+
                        "<p class='preview'></p>"+
                        "</div>"+
                        "</div>"+
                        "</li>"+
                        "</ul>";
    }
                        
});

dbRefList.on('child_changed', snap2 => {

    var array2 = localStorage.getObject("usu");

    let name = snap2.val().name;

    if(name == array2[0].name){

    }else{
        contacts.innerHTML += "<ul onclick=escolhido('" + name +"','"+ snap2.val().email +"','"+ snap2.key +"')>"+
                        "<li class='contact'>"+
                        "<div class='wrap'>"+
                        "<span class='contact-status online'></span>"+
                        "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
                        "<div class='meta'>"+
                        "<p class='name'>"+ snap2.val().name +"</p>"+
                        "<p class='preview'></p>"+
                        "</div>"+
                        "</div>"+
                        "</li>"+
                        "</ul>";
    }

});

function escolhido(nome,email,keyU) {

    newMessagem.innerHTML = ""; 

    document.getElementById("keyR").innerHTML = keyU;

    const dbRefList20 = dbRefObjec.child('pessoas').orderByChild('email').equalTo(email);

    dbRefList20.on('child_added', snap20 =>{

        var keyPub = snap20.val().keyPub;

        document.getElementById("nomeChat").innerHTML = nome;

        var decrypt = new JSEncrypt();
    
        const dbRefList2 = dbRefObjec.child('pessoas');

        dbRefList2.on('child_added', snap3 => {

            var array3 = localStorage.getObject("usu");

            decrypt.setPrivateKey(array3[0].keyPri);
            
            if(snap3.val().name == array3[0].name){

                document.getElementById("keyS").innerHTML = snap3.key;

                const dbRefList3 = dbRefObjec.child('message');

                dbRefList3.on('child_added', snap4 => {

                    var keyS1 = document.getElementById('keyS');
                    var keyS = keyS1.textContent;

                    if((snap4.val().keyS == keyS)&&(snap4.val().keyR == keyU)){

                        var uncrypted = decrypt.decrypt(snap4.val().messagemS);

                        newMessagem.innerHTML += "<li class='sent'>"+
					                            "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
					                            "<p>"+ uncrypted+"</p>"+
				                                "</li>";
                    }
                    if((snap4.val().keyR == keyS)&&(snap4.val().keyS == keyU)){

                        var uncrypted = decrypt.decrypt(snap4.val().messagemR);

                        newMessagem.innerHTML += "<li class='replies'>"+
					                            "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
					                            "<p>"+ uncrypted+"</p>"+
				                                "</li>";
                    }
                });

                /*dbRefList3.on('child_changed', snap4 => {

                    if((snap4.val().keyS == snap3.key)&&(snap4.val().keyR == keyU)){

                        var uncrypted = decrypt.decrypt(snap4.val().messagemS);

                        newMessagem.innerHTML += "<li class='sent'>"+
					                            "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
					                            "<p>"+ uncrypted+"</p>"+
				                                "</li>";
                    }
                    if((snap4.val().keyR == snap3.key)&&(snap4.val().keyS == keyU)){

                        var uncrypted = decrypt.decrypt(snap4.val().messagemR);

                        newMessagem.innerHTML += "<li class='replies'>"+
					                            "<img src='http://emilcarlsson.se/assets/louislitt.png' alt='' />"+
					                            "<p>"+ uncrypted+"</p>"+
				                                "</li>";
                    }
                });*/

            }else{
            }

        });
    });
    

}

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log("ta on");
    }else{
        console.log("ta off");
        localStorage.setObject("usu", []);
        window.location.replace("Login.html");
    }
});