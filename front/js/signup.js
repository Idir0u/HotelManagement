document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        
        const name = document.querySelector("input[placeholder='Enter your name']").value;
        const email = document.querySelector("input[placeholder='Enter your email']").value;
        const phoneNumber = document.querySelector("input[placeholder='Enter your phone number']").value;
        const password = document.querySelector("input[placeholder='Enter your password']").value;

        try {
           
            const response = await fetch("http://localhost:8081/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phoneNumber, password })
            });

            if (response.ok) {
                const user = await response.json();

                alert("Signup successful!");
                window.location.href = "login.html";
            } else {
                const error = await response.text();
                alert("Signup failed: " + error);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred during signup");
        }
    });
});