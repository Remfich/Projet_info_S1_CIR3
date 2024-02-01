const loginForm = document.getElementById("inscription");
const loginButton = document.getElementById("inscriptionsubmit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const nom = loginForm.nom.value;
    const prenom = loginForm.prenom.value;
    
    if (email == "Em@il" && nom == "Nom" && prenom == "Prenom" && password == "MotDePasse") {
        alert("You have successfully logged in.");
        //window.location.replace("adminClient.html");
    } else {
        alert("login invalide");
    }
})