// Function to fetch a joke from the API
function fetchJoke() {
  // Make a GET request to the API endpoint
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      const setup = data.setup; // Extract the setup from the API response
      const punchline = data.punchline; // Extract the punchline from the API response
      showNotification(setup, punchline); // Display the notification with the fetched joke
      updateNotificationCount(); // Update the notification count
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
    });
}

// Function to display a notification with the fetched joke
function showNotification(setup, punchline) {
  const notificationContainer = document.getElementById('notification-container');

  // Create a new div element for the notification
  const notification = document.createElement('div');
  notification.classList.add('notification'); // Add CSS class for styling
  notification.innerHTML = `
    <div class="setup">${setup}</div>
    <div class="punchline">${punchline}</div>
  `;

  // Create an audio element for the notification sound
  const audio = new Audio('notification-sound.mp3');
  audio.play(); // Play the notification sound

  // Append the notification to the container
  notificationContainer.appendChild(notification);
}

// Function to update the notification count
function updateNotificationCount() {
  const notificationCountElement = document.getElementById('notification-count');
  const currentCount = parseInt(notificationCountElement.textContent);
  const newCount = currentCount + 1;
  notificationCountElement.textContent = newCount;
  vibrateBell();

}
function vibrateBell(){
  var notificationbell=document.getElementById('notification-bell');
  notificationbell.classList.add('vibrate');
  setTimeout(() => {
    notificationbell.classList.remove('vibrate');
  }, 500);
}
// Fetch joke and display notification every 10 seconds
setInterval(fetchJoke, 10000);
