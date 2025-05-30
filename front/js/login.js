document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        try {
            const response = await fetch("http://localhost:8081/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                sessionStorage.setItem("user", JSON.stringify(user));  // Save to sessionStorage instead of localStorage

                alert("Login successful!");
                window.location.href = "home.html";  // Or wherever you'd like to redirect
            } else {
                const error = await response.text();
                alert("Login failed: " + error);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred during login");
        }
    });
});
