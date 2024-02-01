document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si les cookies existent
  const emailCookie = getCookie("userEmail");
  const passwordCookie = getCookie("userPassword");

  console.log("userEmail cookie:", emailCookie);
  console.log("userPassword cookie:", passwordCookie);

  // Si les cookies existent, rediriger vers la page des clients
  if (emailCookie && passwordCookie) {
    console.log("Redirection vers adminStock.html");
    window.location.href = "adminStock.html";
  }

  // Remplir les champs s'ils existent
  if (emailCookie && passwordCookie) {
    document.querySelector('input[name="email"]').value = emailCookie;
    document.querySelector('input[name="password"]').value = passwordCookie;
    document.querySelector('input[type="checkbox"]').checked = true;
  }

  // Ajouter un gestionnaire d'événements pour le formulaire
  document.querySelector("form").addEventListener("submit", function (event) {
    // Vérifier si la case "rester connecté" est cochée
    const isChecked = document.querySelector('input[type="checkbox"]').checked;

    console.log("Checkbox cochée :", isChecked);

    // Si cochée, enregistrer les informations dans les cookies et rediriger
    if (isChecked) {
      const emailValue = document.querySelector('input[name="email"]').value;
      const passwordValue = document.querySelector('input[name="password"]').value;

      console.log("Enregistrement des cookies");
      setCookie("userEmail", emailValue, 30);
      setCookie("userPassword", passwordValue, 30);

      // Rediriger vers la page des clients
      window.location.href = "adminStock.html";
    } else {
      // Sinon, supprimer les cookies
      console.log("Suppression des cookies");
      deleteCookie("userEmail");
      deleteCookie("userPassword");
    }
  });

  // Fonction pour définir un cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Fonction pour obtenir la valeur d'un cookie
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }

  // Fonction pour supprimer un cookie
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
});
