
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = {
        room: { id: 101 },
        startDate: document.getElementById("dateStart").value,
        endDate: document.getElementById("dateLast").value,
        totalAmount: 0.0,
        guestFirstName: document.getElementById("nom").value,
        guestLastName: document.getElementById("prenom").value,
        guestEmail: document.getElementById("email").value,
        guestPhone: document.getElementById("telephone").value,
        user: null,
    };

    try {
        const response = await fetch("http://localhost:8080/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            alert("Réservation enregistrée avec succès!");
            console.log(result);
        } else {
            alert("Erreur lors de l'enregistrement de la réservation.");
            console.error("Response error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Erreur de réseau. Veuillez réessayer plus tard.");
    }
});
