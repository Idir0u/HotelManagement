console.log("I'm in admin!!!!!!!!!!!!!!!!!!");
let rooms = [];
let defaultRooms = [
    { id: 1, type: 'Single', capacity: 1, price: 80, description: 'Perfectly designed for solo travelers or business guests who seek comfort and privacy in a cozy space equipped with modern amenities.', status: 'Available' },
    { id: 2, type: 'Double', capacity: 2, price: 120, description: 'Spacious room for two guests with a comfortable double bed and modern amenities.', status: 'Occupied' },
    { id: 3, type: 'Suite', capacity: 4, price: 250, description: 'Luxurious suite with premium amenities, including a king-size bed, living area, and a spacious bathroom.', status: 'Available' },
    { id: 4, type: 'Family', capacity: 5, price: 300, description: 'Ideal for families with children, offering multiple beds and a spacious living area.', status: 'Occupied' },
    { id: 5, type: 'Single', capacity: 1, price: 85, description: 'A cozy single room with modern amenities and a comfortable bed.', status: 'Available' },
    { id: 6, type: 'Double', capacity: 2, price: 130, description: 'A spacious double room with a comfortable bed and modern amenities.', status: 'Available' },
    { id: 7, type: 'Twin', capacity: 2, price: 100, description: 'A room with two single beds, perfect for friends or colleagues traveling together.', status: 'Available' },
    { id: 8, type: 'Suite', capacity: 4, price: 270, description: 'Luxurious suite with premium amenities, including a king-size bed, living area, and a spacious bathroom.', status: 'Occupied' },
    { id: 9, type: 'Family', capacity: 5, price: 320, description: 'Spacious family room with a cozy living area and modern amenities.', status: 'Available' },
    { id: 10, type: 'Single', capacity: 1, price: 90, description: 'A compact room designed for solo travelers with all essential amenities.', status: 'Occupied' },
    { id: 11, type: 'Double', capacity: 2, price: 135, description: 'Comfortable double room with elegant décor and modern facilities.', status: 'Available' },
    { id: 12, type: 'Twin', capacity: 2, price: 110, description: 'A twin room featuring two separate beds and modern amenities.', status: 'Available' },
    { id: 13, type: 'Suite', capacity: 4, price: 260, description: 'A deluxe suite with a king-size bed and luxurious amenities.', status: 'Available' },
    { id: 14, type: 'Family', capacity: 5, price: 310, description: 'Family-friendly room with a spacious layout and modern amenities.', status: 'Occupied' },
    { id: 15, type: 'Single', capacity: 1, price: 82, description: 'A private room with a single bed and essential amenities.', status: 'Available' },
    { id: 16, type: 'Double', capacity: 2, price: 125, description: 'A stylish double room with a cozy atmosphere and modern décor.', status: 'Occupied' },
    { id: 17, type: 'Twin', capacity: 2, price: 105, description: 'A comfortable twin room ideal for traveling companions.', status: 'Available' },
    { id: 18, type: 'Suite', capacity: 4, price: 255, description: 'A premium suite with luxury features and modern amenities.', status: 'Available' },
    { id: 19, type: 'Family', capacity: 5, price: 300, description: 'Spacious room for families with multiple beds and a living area.', status: 'Occupied' },
    { id: 20, type: 'Single', capacity: 1, price: 87, description: 'A quiet room with modern facilities, ideal for solo travelers.', status: 'Available' },
    { id: 21, type: 'Double', capacity: 2, price: 140, description: 'A bright and spacious room with a comfortable double bed.', status: 'Available' },
    { id: 22, type: 'Twin', capacity: 2, price: 108, description: 'Twin beds in a contemporary setting, perfect for two guests.', status: 'Occupied' },
    { id: 23, type: 'Suite', capacity: 4, price: 280, description: 'An elegant suite featuring a spacious living area and luxury furnishings.', status: 'Available' },
    { id: 24, type: 'Family', capacity: 5, price: 315, description: 'A family room equipped with all the comforts of home.', status: 'Occupied' },
    { id: 25, type: 'Single', capacity: 1, price: 88, description: 'A cozy single room offering modern comforts for one guest.', status: 'Available' },
    { id: 26, type: 'Double', capacity: 2, price: 132, description: 'A well-appointed room for two, featuring a comfortable bed and modern amenities.', status: 'Occupied' },
    { id: 27, type: 'Twin', capacity: 2, price: 115, description: 'Twin room with separate beds, perfect for shared stays.', status: 'Available' },
    { id: 28, type: 'Suite', capacity: 4, price: 265, description: 'Luxurious suite with a comfortable living area and top-notch amenities.', status: 'Available' },
    { id: 29, type: 'Family', capacity: 5, price: 305, description: 'A spacious family room with a comfortable layout and modern conveniences.', status: 'Occupied' },
    { id: 30, type: 'Single', capacity: 1, price: 85, description: 'A compact room with modern décor, ideal for business travelers.', status: 'Available' },
    { id: 31, type: 'Double', capacity: 2, price: 128, description: 'A warm and inviting room for two with elegant furnishings.', status: 'Available' },
    { id: 32, type: 'Twin', capacity: 2, price: 102, description: 'A twin room offering flexibility and comfort for guests.', status: 'Available' },
    { id: 33, type: 'Suite', capacity: 4, price: 275, description: 'A refined suite with luxurious furnishings and ample space.', status: 'Available' },
    { id: 34, type: 'Family', capacity: 5, price: 325, description: 'Family-friendly accommodations with ample space and comfort.', status: 'Occupied' },
    { id: 35, type: 'Single', capacity: 1, price: 90, description: 'A peaceful single room equipped with modern conveniences.', status: 'Available' },
    { id: 36, type: 'Double', capacity: 2, price: 138, description: 'A bright and airy double room perfect for couples.', status: 'Available' }
];

let currentPage = 1;
const rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var selectElems = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selectElems);

    fetchRooms();

    document.getElementById('addRoomButton').addEventListener('click', addRoom);
    document.getElementById('refreshTableButton').addEventListener('click', () => fetchRooms(currentPage));
    document.getElementById('prevPageButton').addEventListener('click', prevPage);
    document.getElementById('nextPageButton').addEventListener('click', nextPage);

    document.querySelectorAll('th[data-column]').forEach(th => {
        th.addEventListener('click', () => sortTable(th.getAttribute('data-column')));
    });
});

function fetchRooms(page = 1) {
console.log("I'm in fetch!!!!!!!!!!!!!!!!!!");

    fetch(`http://localhost:8081/api/allrooms?page=${page - 1}&size=${rowsPerPage}`)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            rooms = data.content;
            populateTable();
            showSuccessPopup('Room added successfully!');
            updatePagination(data.totalPages, page);
        })
        .catch(error => {
            rooms = defaultRooms;
            populateTable();
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
        showSuccessPopup('Room edited successfully!');
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
        showSuccessPopup('Room deleted successfully!');

    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Failed to delete room: ' + error.message);
    });
}

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
            <td>${room.occupied === false ? 'Available' : 'Occupied'}</td>
             
            <td>
                <button class="btn waves-effect waves-light blue modal-trigger edit-room-button" data-target="editRoomModal" data-id="${room.id}">
                    <i class="material-icons">edit</i>
                </button>
                <button class="btn waves-effect waves-light red delete-room-button" data-id="${room.id}">
                    <i class="material-icons">delete</i>
                </button>
                <button class="btn waves-effect waves-light green modal-trigger view-room-button" data-target="viewRoomModal" data-id="${room.id}">
                    <i class="material-icons">visibility</i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    truncateDescriptions();

    document.querySelectorAll('.edit-room-button').forEach(button => {
        button.addEventListener('click', () => editRoom( Number( button.getAttribute('data-id') ) ));
    });

    document.querySelectorAll('.delete-room-button').forEach(button => {
        button.addEventListener('click', () => confirmDelete( Number( button.getAttribute('data-id') ) ));
    });

    document.querySelectorAll('.view-room-button').forEach(button => {
        button.addEventListener('click', () => viewRoom( Number( button.getAttribute('data-id') ) ) );
    });
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
    document.getElementById('addRoomForm').onsubmit = function(event) {
        event.preventDefault();
        console.log("status in addRoom:", document.getElementById('status').value );
        var newRoom = {
            type: document.getElementById('roomType').value,
            capacity: document.getElementById('capacity').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            occupied: document.getElementById('status').value == 'Occupied' ? true : false
        };
        addRoomApi(newRoom);
        M.Modal.getInstance(document.getElementById('addRoomModal')).close();
    };
    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll('select'));
}

function editRoom(roomID) {
    var room = rooms.find(room => room.id === roomID);
        console.log("room: ", room);
        document.getElementById('editRoomType').value = room.type;
        document.getElementById('editCapacity').value = room.capacity;
        document.getElementById('editPrice').value = room.price;
        document.getElementById('editDescription').value = room.description;
        document.getElementById('editStatus').value = room.occupied ? 'Occupied' : 'Available';

    document.getElementById('editRoomForm').onsubmit = function(event) {
        event.preventDefault();
        console.log("status in editRoom:", document.getElementById('editStatus').value );
        var updatedRoom = {
            type: document.getElementById('editRoomType').value,
            capacity: document.getElementById('editCapacity').value,
            price: document.getElementById('editPrice').value,
            description: document.getElementById('editDescription').value,
            occupied: document.getElementById('editStatus').value === 'Occupied' ? true : false
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
    //console.log("room id:" , roomID);
    var room = rooms.find(room => room.id === roomID);
    //var room = rooms[roomID - 1];
    //var room = rooms.find(room => room.id === Number(roomID));
    //console.log("room: ", room);
    var roomType = room.type;
    var capacity = room.capacity;
    var price = room.price;
    var description = room.description;
    var status = room.status === true ? 'Occupied' : 'Available';
    //console.log("roomtype:" , roomType);

    var imageSrc;
    switch (roomType.replace(' Room', '').toLowerCase()) {
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
        case 'twin':
            imageSrc = 'twin-room.jpg';
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
                    <span class="text-lg text-grey-600">Price: <span class="text-lg font-bold text-yellow-700">$${price}/night</span></span>
                    <span class="text-lg text-grey-600">Status: <span class="text-lg font-bold text-yellow-700">${status}</span></span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('roomDetails').innerHTML = roomDetails;
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

function showSuccessPopup(message) {
    const successPopup = document.createElement('div');
    successPopup.className = 'success-popup';
    successPopup.innerHTML = `
        <div class="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg w-1/3">
            <div class="flex justify-between items-center">
                <p>${message}</p>
                <span class="success-popup-close cursor-pointer text-xl">&times;</span>
            </div>
        </div>
    `;
    document.body.appendChild(successPopup);

    const closeBtn = successPopup.querySelector('.success-popup-close');
    closeBtn.onclick = function() {
        document.body.removeChild(successPopup);
    };

    setTimeout(() => {
        if (document.body.contains(successPopup)) {
            document.body.removeChild(successPopup);
        }
    }, 5000);
}
