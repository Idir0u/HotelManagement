let rooms = [];
let currentPage = 1;
const rowsPerPage = 10;

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

function fetchRooms() {
    fetch(`http://localhost:8081/api/allrooms?page=${page - 1}&size=${rowsPerPage}`)
        .then(response => response.json())
        .then(data => {
            rooms = data.content;
            populateTable();
            updatePagination(data.totalPages, page);
        })
        .catch(error => {
            rooms = [
                { id: 1, type: 'Single', capacity: 1, price: 80, description: 'Perfectly designed for solo travelers or business guests who seek comfort and privacy in a cozy space equipped with modern amenities.', status: 'Available' },
                { id: 2, type: 'Double', capacity: 2, price: 120, description: 'Spacious room for two guests with a comfortable double bed and modern amenities.', status: 'Occupied' },
                { id: 3, type: 'Suite', capacity: 4, price: 250, description: 'Luxurious suite with premium amenities, including a king-size bed, living area, and a spacious bathroom.', status: 'Available' },
                { id: 4, type: 'Family', capacity: 5, price: 300, description: 'Ideal for families with children, offering multiple beds and a spacious living area.', status: 'Occupied' },
                { id: 5, type: 'Single', capacity: 1, price: 85, description: 'A cozy single room with modern amenities and a comfortable bed.', status: 'Available' },
                { id: 6, type: 'Double', capacity: 2, price: 130, description: 'A spacious double room with a comfortable bed and modern amenities.', status: 'Available' },
                { id: 7, type: 'Suite', capacity: 4, price: 260, description: 'A luxurious suite with premium amenities, including a king-size bed, living area, and a spacious bathroom.', status: 'Available' },
                { id: 8, type: 'Family', capacity: 5, price: 320, description: 'A family room with multiple beds and a spacious living area, perfect for families with children.', status: 'Occupied' },
                { id: 9, type: 'Single', capacity: 1, price: 90, description: 'A cozy single room with modern amenities and a comfortable bed.', status: 'Available' },
                { id: 10, type: 'Double', capacity: 2, price: 140, description: 'A spacious double room with a comfortable bed and modern amenities.', status: 'Available' },
                { id: 11, type: 'Suite', capacity: 4, price: 270, description: 'A luxurious suite with premium amenities, including a king-size bed, living area, and a spacious bathroom.', status: 'Available' },
                { id: 12, type: 'Family', capacity: 5, price: 330, description: 'A family room with multiple beds and a spacious living area, perfect for families with children.' },
            ];
            console.error('Error:', error);
            showErrorPopup('Failed to fetch rooms. Please try again later.');
        });
}

function addRoomApi(room) {
    console.log("new room", room);
    fetch('http://localhost:8081/api/room', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        }
    )
    .then(response => {
        console.log("response", response);
        if (!response.ok) {
        return response.json().then(error => {
            throw new Error(error.message);
        });
        }
        return response.json();
    })
    .then(data => {
        console.log("data", data);
        rooms.push(data);
        populateTable();
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Failed to add room: ' + error.message);
    });
}

function editRoomApi(roomID, updatedRoom) {
    fetch(`http://localhost:8081/api/room/${roomID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRoom)
    })
    .then(response => {
        if (!response.ok) {
        return response.json().then(error => {
            throw new Error(error.message);
        });
        }
        return response.json();
    })
    .then(data => {
        const index = rooms.findIndex(room => room.id === roomID);
        rooms[index] = data;
        populateTable();
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Failed to edit room: ' + error.message);
    });
}

function deleteRoomApi(roomID) {
    fetch(`http://localhost:8081/api/room/${roomID}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
        return response.json().then(error => {
            throw new Error(error.message);
        });
        }
        let row = document.getElementById('roomTableBody').querySelector(`tr td:first-child:contains(${roomID})`).parentNode;
        document.getElementById('roomTableBody').removeChild(row);

    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Failed to delete room: ' + error.message);
    });
}




document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var selectElems = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selectElems);

    //fetching rooms
    fetchRooms();

    // Populate the table with initial data
    populateTable();
    
});

function populateTable() {

    const tableBody = document.getElementById('roomTableBody');
    tableBody.innerHTML = '';

    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.id}</td>
            <td>${room.type}</td>
            <td>${room.capacity}</td>
            <td>$${room.price}</td>
            <td class="description">${room.description}</td>
            <td>${room.status}</td>
            <td>
                <button class="btn waves-effect waves-light blue modal-trigger" data-target="editRoomModal" onclick="editRoom(${room.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="btn waves-effect waves-light red" onclick="confirmDelete(${room.id})">
                    <i class="material-icons">delete</i>
                </button>
                <button class="btn waves-effect waves-light green modal-trigger" data-target="viewRoomModal" onclick="viewRoom(${room.id})">
                    <i class="material-icons">visibility</i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    truncateDescriptions();
}

function truncateDescriptions() {
    var descriptions = document.querySelectorAll('.description');
    descriptions.forEach(function(description) {
        if (description.textContent.length > 75) {
            description.textContent = description.textContent.substring(0, 75) + '...';
        }
    });
}

function sortTable(columnIndex) {
    var table = document.getElementById("roomTable");
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
        fetchRooms(currentPage);
    }
}

function nextPage() {
    currentPage++;
    fetchRooms(currentPage);
}

function goToPage(page) {
    currentPage = page;
    fetchRooms(currentPage);
}

function addRoom() {
    console.log("add room");
    document.getElementById('addRoomForm').onsubmit = function(event) {
        event.preventDefault();
        var newRoom = {
            type: document.getElementById('roomType').value,
            capacity: document.getElementById('capacity').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            status: document.getElementById('status').value
        };
        addRoomApi(newRoom);
        console.log("new room", newRoom);
        M.Modal.getInstance(document.getElementById('addRoomModal')).close();
    };
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll('select'));
}

function editRoom(roomID) {
    
    document.getElementById('editRoomForm').onsubmit = function(event) {
        event.preventDefault();
        var updatedRoom = {
            type: document.getElementById('editRoomType').value,
            capacity: document.getElementById('editCapacity').value,
            price: document.getElementById('editPrice').value,
            description: document.getElementById('editDescription').value,
            status: document.getElementById('editStatus').value
        };
    editRoomApi(roomID, updatedRoom);
    M.Modal.getInstance(document.getElementById('editRoomModal')).close();
    };

    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll('select'));
}

function confirmDelete(roomID) {
    var deleteButton = document.getElementById('confirmDeleteButton');
    deleteButton.onclick = function() {
        deleteRoomApi(roomID);
        M.Modal.getInstance(document.getElementById('deleteConfirmationModal')).close();
    };
    M.Modal.getInstance(document.getElementById('deleteConfirmationModal')).open();
}

function viewRoom(roomID) {
    var row = rooms.find(room => room.id === roomID);
    var roomType = row.type;
    var capacity = row.capacity;
    var price = row.price;
    var description = row.description;
    var status = row.status;


    var imageSrc;
    switch (roomType.toLowerCase()) {
        case 'single':
            imageSrc = 'single-room.jpg';
            break;
        case 'double':
            imageSrc = 'double-room.jpg';
            break;
        case 'suite':
            imageSrc = 'suite-room.jpg';
            break;
        case 'family':
            imageSrc = 'family-room.jpg';
            break;
        default:
            imageSrc = 'default-room.jpg';
    }

    var roomDetails = `
        <div class="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-2xl">
            <img src="${imageSrc}" alt="${roomType} Room" class="w-full h-64 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-dark-grey-900">${roomType} Room</h3>
                <p class="text-grey-700 text-base leading-6 mt-2">${description}</p>
                <ul class="mt-4 text-sm text-grey-800">
                    <li><img src="icons8-account-50.png" alt="Capacity Icon" class="inline w-4 h-4 mr-2"> ${capacity} Guests</li>
                    <li><img src="icons8-size-50.png" alt="Size Icon" class="inline w-4 h-4 mr-2"> 20m<sup>2</sup></li>
                    <li><img src="icons8-highlights-48.png" alt="Highlights Icon" class="inline w-4 h-4 mr-2"> Free WiFi, TV, Compact and Cozy</li>
                </ul>
                <div class="mt-6 flex justify-between items-center">
                    <span class="text-lg text-grey-600">Price: <span class="text-lg font-bold text-yellow-700">${price}/night</span></span>
                    <span class="text-lg text-grey-600">Status: <span class="text-lg font-bold text-yellow-700">${status}</span></span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('roomDetails').innerHTML = roomDetails;
}