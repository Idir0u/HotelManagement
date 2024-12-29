let currentPage = 0;
const pageSize = 10;

// Define images for each room type (make sure the paths are correct)
const roomImages = {
  "Single Room": [
    "img/room/single-room1.jpg",
    "img/room/single-room2.jpg",
    "img/room/single-room3.jpg"
  ],
  "Double Room": [
    "img/room/double-room1.jpg",
    "img/room/double-room2.jpg",
    "img/room/double-room3.jpg"
  ],
  "Twin Room": [
    "img/room/twin-room1.jpg",
    "img/room/twin-room2.jpg",
    "img/room/twin-room3.jpg"
  ],
  "Suite Room": [
    "img/room/suite-room1.jpg",
    "img/room/suite-room2.jpg",
    "img/room/suite-room3.jpg"
  ],
  "Family Room": [
    "img/room/family-room1.jpg",
    "img/room/family-room2.jpg",
    "img/room/family-room3.jpg"
  ]
};

// Fetch rooms based on the current page
async function fetchRooms(page) {
  try {
    const { priceMin, priceMax, type, capacity } = getFilterValues();
    let url = `http://localhost:8081/api/rooms?page=${page}&size=${pageSize}`;

    // Add filters to the URL only if they are set
    if (priceMin !== null) {
      url += `&priceMin=${priceMin}`;
    }
    if (priceMax !== null) {
      url += `&priceMax=${priceMax}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (capacity) {
      url += `&capacity=${capacity}`;
    }

    console.log(`Fetching rooms with URL: ${url}`); // Check the URL
    const response = await fetch(url);
    const data = await response.json();
    console.log('Fetched data:', data); // Check the data returned from the backend
    renderRooms(data.content);
    updatePagination(data);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
}

// Get filter values from the filter form
function getFilterValues() {
  const price = document.getElementById("price").value;
  const type = document.getElementById("type").value;
  const capacity = document.getElementById("capacity").value;

  // Initialize priceMin and priceMax
  let priceMin = null;
  let priceMax = null;

  // Set priceMin and priceMax based on selected price filter
  if (price === "Less than 200€/night") {
    priceMax = 200;
  } else if (price === "200€ - 500€/night") {
    priceMin = 200;
    priceMax = 500;
  } else if (price === "Plus 500€/night") {
    priceMin = 500;
  }

  return { priceMin, priceMax, type, capacity };
}

// Render the room cards on the page
function renderRooms(rooms) {
  const container = document.getElementById('room-cards-container');
  container.innerHTML = ''; // Clear previous cards

  rooms.forEach(room => {
    // Randomly select an image from the respective room type
    const randomImage = getRandomImage(room.type);

    const card = `
      <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full flex">
        <img class="w-1/3 rounded-l-lg object-cover" src="${randomImage}" alt="${room.type} Image">
        <div class="p-4 flex flex-col justify-between w-2/3">
          <h2 class="text-lg font-semibold mb-3">${room.type} N°${room.id}</h2>
          <div class="flex items-center text-gray-500 text-sm space-x-6 mb-3">
            <div class="flex items-center">
              <img src="img/icons8-account-50.png" alt="" class="w-4 h-4"> ${room.capacity} Guests
            </div>
          </div>
          <p class="text-gray-600 text-sm mb-4">${room.description}</p>
          <div class="flex items-center justify-between">
            <p class="text-base font-bold">$${room.price} per night</p>
            <button class="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800">Book Now</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Function to randomly pick an image for a given room type
function getRandomImage(roomType) {
  const images = roomImages[roomType];
  return images ? images[Math.floor(Math.random() * images.length)] : '';
}

// Update the pagination controls (Previous/Next)
function updatePagination(data) {
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');

  // Ensure that the buttons exist before attaching event listeners
  if (prevButton && nextButton) {
    // Enable/Disable the Previous button
    prevButton.disabled = data.number === 0;

    // Enable/Disable the Next button
    nextButton.disabled = data.number === data.totalPages - 1;
  }
}

// Handlers for the Previous and Next buttons (ensure buttons exist before attaching)
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

if (prevButton) {
  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      console.log('Going to Previous Page:', currentPage); // Debugging line
      fetchRooms(currentPage); // Fetch rooms for the previous page
    }
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    currentPage++;
    console.log('Going to Next Page:', currentPage); // Debugging line
    fetchRooms(currentPage); // Fetch rooms for the next page
  });
}

// Search button listener
document.getElementById("Search").addEventListener("click", function () {
  currentPage = 0; // Reset to the first page when a new search is made
  fetchRooms(currentPage); // Fetch rooms based on the selected filters
});

// Initial fetch
fetchRooms(currentPage);
