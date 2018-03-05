// Pegando o elemento do butao sair.
const btnLogout = document.getElementById('buttonLogout');
	
// A funçao para deslogar o usuario do firebase. com o evento de click e a funcao signOut.
btnLogout.addEventListener('click', e => {
    
    firebase.auth().signOut();
    //O usuario e mandado para a pagina inicial.
    window.location.replace("Login.html");
});