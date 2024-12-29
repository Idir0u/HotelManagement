document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    const userDropdown = document.getElementById("user-dropdown");
    const userNameSpan = userDropdown.querySelector(".user-name");
    const logoutButton = document.getElementById("logout-button");

    // Vérifier si un utilisateur est connecté
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        loginButton.style.display = "none"; // Masquer le bouton de login
        userDropdown.style.display = "block"; // Afficher le dropdown
        userNameSpan.textContent = user.name; 
    } else {
        // Aucun utilisateur connecté
        loginButton.style.display = "block"; // Afficher le bouton de login
        userDropdown.style.display = "none"; // Masquer le dropdown
    }

    // Gestion de la déconnexion
    logoutButton.addEventListener("click", async function (event) {
        event.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8081/api/users/logout", {
                method: "GET",
                credentials: "include"
            });
    
            if (response.ok) {
                // Supprimer les infos utilisateur de localStorage
                localStorage.removeItem("user");
                alert("Logged out successfully!");
                window.location.href = "login.html"; // Rediriger vers la page de login
            } else {
                const error = await response.text();
                alert("Logout failed: " + error);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred during logout");
        }
    });
});