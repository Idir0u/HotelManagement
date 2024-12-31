let reservations = [];
let currentPage = 1;
const rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    fetchReservations();

    document.getElementById('refreshTableButton').addEventListener('click', () => fetchReservations(currentPage));
    document.getElementById('prevPageButton').addEventListener('click', prevPage);
    document.getElementById('nextPageButton').addEventListener('click', nextPage);

    document.querySelectorAll('th[data-column]').forEach(th => {
        th.addEventListener('click', () => sortTable(th.getAttribute('data-column')));
    });
});

function fetchReservations(page = 1) {
    fetch(`http://localhost:8081/reservations?page=${page - 1}&size=${rowsPerPage}`)
        .then(response => response.json())
        .then(data => {
            reservations = data.content;
            populateTable();
            updatePagination(data.totalPages, page);
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorPopup('Failed to fetch reservations. Please try again later.');
        });
}

function populateTable() {
    const tableBody = document.getElementById('reservationTableBody');
    tableBody.innerHTML = '';

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.id}</td>
            <td>${reservation.room.type}</td>
            <td>$${reservation.totalAmount}</td>
            <td>${reservation.startDate}</td>
            <td>${reservation.endDate}</td>
            <td>
                <button class="btn waves-effect waves-light green modal-trigger view-reservation-button" data-target="viewReservationModal" data-id="${reservation.id}">
                    <i class="material-icons">visibility</i>
                </button>
                <button class="btn waves-effect waves-light red delete-reservation-button" data-id="${reservation.id}">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.view-reservation-button').forEach(button => {
        button.addEventListener('click', () => viewReservation( Number( button.getAttribute('data-id') ) ));
    });

    document.querySelectorAll('.delete-reservation-button').forEach(button => {
        button.addEventListener('click', () => confirmDelete( Number( button.getAttribute('data-id') ) ) );
    });
}

function sortTable(columnIndex) {
    var table = document.getElementById("reservationTable");
    var rows = Array.from(table.rows).slice(1);
    var isAscending = table.getAttribute("data-sort-asc") === "true";
    rows.sort(function(a, b) {
        var cellA = a.cells[columnIndex].innerText.toLowerCase();
        var cellB = b.cells[columnIndex].innerText.toLowerCase();
        if (!isNaN(cellA) && !isNaN(cellB)) {
            cellA = parseFloat(cellA.replace('$', ''));
            cellB = parseFloat(cellB.replace('$', ''));
        }
        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });
    rows.forEach(function(row) {
        table.tBodies[0].appendChild(row);
    });
    table.setAttribute("data-sort-asc", !isAscending);
}

function updatePagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = `
        <li class="${currentPage === 1 ? 'disabled' : 'waves-effect'}"><a href="#!" onclick="prevPage()"><i class="material-icons">chevron_left</i></a></li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <li class="${i === currentPage ? 'active' : 'waves-effect'}"><a href="#!" onclick="goToPage(${i})">${i}</a></li>
        `;
    }

    paginationContainer.innerHTML += `
        <li class="${currentPage === totalPages ? 'disabled' : 'waves-effect'}"><a href="#!" onclick="nextPage()"><i class="material-icons">chevron_right</i></a></li>
    `;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchReservations(currentPage);
    }
}

function nextPage() {
    currentPage++;
    fetchReservations(currentPage);
}

function goToPage(page) {
    currentPage = page;
    fetchReservations(currentPage);
}

function viewReservation(reservationID) {
    const reservation = reservations.find(reservation => reservation.id === reservationID);
    const room = reservation.room;
    const user = reservation.user ? reservation.user.name : 'Guest';

    const reservationDetails = `
        <div class="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-2xl">
            <div class="p-6">
                <h3 class="text-xl font-bold text-dark-grey-900">Reservation Details</h3>
                <p class="text-grey-700 text-base leading-6 mt-2">Room Type: ${room.type}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">Total Price: $${reservation.totalAmount}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">Start Date: ${reservation.startDate}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">End Date: ${reservation.endDate}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">User: ${user}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">Capacity: ${room.capacity}</p>
                <p class="text-grey-700 text-base leading-6 mt-2">Description: ${room.description}</p>
            </div>
        </div>
    `;
    document.getElementById('reservationDetails').innerHTML = reservationDetails;
}

function confirmDelete(reservationID) {
    var deleteButton = document.getElementById('confirmDeleteButton');
    deleteButton.onclick = function() {
        deleteReservationApi(reservationID);
        M.Modal.getInstance(document.getElementById('deleteConfirmationModal')).close();
    };
    M.Modal.getInstance(document.getElementById('deleteConfirmationModal')).open();
}

function deleteReservationApi(reservationID) {
    fetch(`http://localhost:8081/reservations/${reservationID}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
        reservations = reservations.filter(reservation => reservation.id !== reservationID);
        populateTable();
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Failed to delete reservation: ' + error.message);
    });
}

function showErrorPopup(message) {
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.innerHTML = `
        <div class="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg w-1/3">
            <div class="flex justify-between items-center">
                <p>${message}</p>
                <span class="error-popup-close cursor-pointer text-xl">&times;</span>
            </div>
        </div>
    `;
    document.body.appendChild(errorPopup);

    const closeBtn = errorPopup.querySelector('.error-popup-close');
    closeBtn.onclick = function() {
        document.body.removeChild(errorPopup);
    };

    setTimeout(() => {
        if (document.body.contains(errorPopup)) {
            document.body.removeChild(errorPopup);
        }
    }, 5000);
}