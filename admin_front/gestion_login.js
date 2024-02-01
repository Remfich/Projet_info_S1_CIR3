const loginForm = document.getElementById("login");
const loginButton = document.getElementById("submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    
    if (email == "Em@il" && password == "MotDePasse") {
        alert("You have successfully logged in.");
        window.location.replace("adminClient.html");
    } else {
        alert("login invalide");
    }
})