document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 0;

    // Fonction pour récupérer les utilisateurs
    function fetchUsers(page) {
        fetch(`http://localhost:8081/api/users/clients?page=${page}&size=10`)
            .then(response => response.json())
            .then(data => {
                populateTable(data.content);  // Remplir le tableau avec les utilisateurs
                togglePaginationButtons(data);  // Activer/désactiver les boutons de pagination
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    // Fonction pour remplir le tableau avec les utilisateurs
    function populateTable(users) {
        const userTableBody = document.getElementById("userTableBody");
        userTableBody.innerHTML = "";  // Vider les lignes précédentes

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border-b p-4">${user.id}</td>
                <td class="border-b p-4">${user.name}</td>
                <td class="border-b p-4">${user.email}</td>
                <td class="border-b p-4">${user.phoneNumber || "-"}</td>
                <td class="border-b p-4">
                    <button class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 view-btn" data-id="${user.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 delete-btn" data-id="${user.id}">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        // Ajout des événements pour le bouton de suppression
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", async function () {
                const userId = btn.getAttribute("data-id");
                await deleteUser(userId);  // Appeler la fonction de suppression
            });
        });
    }

    // Fonction pour activer/désactiver les boutons de pagination
    function togglePaginationButtons(data) {
        document.getElementById("prevPage").disabled = data.first;
        document.getElementById("nextPage").disabled = data.last;
    }

    // Fonction pour supprimer un utilisateur
    async function deleteUser(userId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const response = await fetch(`http://localhost:8081/api/users/delete/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Utilisateur supprimé avec succès !");
                    fetchUsers(currentPage);  // Recharger la liste des utilisateurs après suppression
                } else {
                    alert("Erreur lors de la suppression de l'utilisateur.");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    }

    // Gestion de la pagination
    document.getElementById("prev-btn").addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            fetchUsers(currentPage);
        }
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentPage++;
        fetchUsers(currentPage);
    });

    // Initialisation du chargement des utilisateurs
    fetchUsers(currentPage);
});
