// Get the chat container, message form, and message input element
const chatContainer = document.querySelector('#chat-container');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

// Function to display new chat messages
function displayMessage(message) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.innerText = message;
  chatContainer.appendChild(chatMessage);
}

// Function to send a chat message to the server using AJAX
function sendMessage(message) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/send-message');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log('Message sent successfully');
    } else {
      console.error('An error occurred while sending the message');
    }
  };
  xhr.send(JSON.stringify({ message }));
}

// Function to receive chat messages from the server using AJAX
function receiveMessages() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/receive-messages');
  xhr.onload = () => {
    if (xhr.status === 200) {
      const messages = JSON.parse(xhr.responseText);
      messages.forEach((message) => {
        displayMessage(message);
      });
    } else {
      console.error('An error occurred while receiving messages');
    }
  };
  xhr.send();
}

// Attach an event listener to the message form to listen for submit events
messageForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the message value from the message input element
  const message = messageInput.value;

  // Display the new message on the chat container
  displayMessage(message);

  // Send the message to the server
  sendMessage(message);

  // Clear the message input element
  messageInput.value = '';
});

// Poll the server every 5 seconds to receive new chat messages
setInterval(() => {
  receiveMessages();
}, 5000);
