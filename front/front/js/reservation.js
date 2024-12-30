document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Check if the user object is available
  console.log("User:", user);  // Log to check if the user object is retrieved correctly

  // If the user is logged in, auto-fill the form fields
  if (user) {
      document.getElementById("name").value = user.name || '';  // Ensure user.name exists
      document.getElementById("email").value = user.email || '';
      document.getElementById("telephone").value = user.phoneNumber || '';  // Adjust if necessary
  } else {
      // If the user is not logged in, the fields remain empty
      console.log('User is not logged in.');
  }

  // Handle form submission
  const reservationForm = document.querySelector('form');
  reservationForm.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent page reload on form submission

      // Retrieve form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const telephone = document.getElementById('telephone').value;
      const dateStart = document.getElementById('dateStart').value;
      const dateEnd = document.getElementById('dateLast').value;

      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);

      // Check if roomId and totalAmount are available in localStorage
      const price = localStorage.getItem('price');
      const numberOfNights = (endDate - startDate) / (1000 * 3600 * 24);
      const totalAmount = price * numberOfNights;
      const roomId = localStorage.getItem('roomId');
      console.log(totalAmount);
      

      if (!roomId || !totalAmount) {
          alert('No room selected or total amount not found.');
          return;
      }

      // Create the reservation object with userId or null if not logged in
      const reservationData = {
          roomId: roomId,
          totalAmount: totalAmount,
          startDate: dateStart,
          endDate: dateEnd,
          userId: user ? user.id : null,  // If logged in, use the user id, otherwise null
      };

      console.log('Reservation Data:', reservationData);  // Log to check the data

      // Send the reservation data to the backend
      fetch('http://localhost:8081/reservations/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
      })
      .then(response => response.json())
      .then(responseData => {
          if (responseData.reservationId) {
              alert('Reservation successful! Your reservation ID is ' + responseData.reservationId);
          } else {
              alert('There was an error with your reservation. Please try again.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while making the reservation.');
      });
  });
});
