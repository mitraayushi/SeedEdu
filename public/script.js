// function connectWallet() {
//     alert("Wallet connection functionality will be implemented here.");
// }

// document.getElementById('request-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert("Your request has been submitted!");
// });
let clientAddress;
function showInvestPopup(address) {
  document.getElementById("invest-popup").style.display = "flex";
  clientAddress = address;
}

function closeInvestPopup() {
  document.getElementById("invest-popup").style.display = "none";
}

function submitInvestment() {
  const amount = document.getElementById("investment-amount").value;
  if (amount > 0) {
    // alert(`You have successfully invested $${amount}!`);
    fetch("/withdraw", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        clientAddress,
        claimAmt: amount,
      }),
    });
    closeInvestPopup();
  } else {
    alert("Please enter a valid amount to invest.");
  }
}

const isWalletConnected = () => {
  return localStorage.getItem("clientAddress");
};
window.onload = () => {
  if (isWalletConnected) {
    document.querySelector(".connect-wallet").innerText = "Connected";
  }
};

// Ensure the script only runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Toggle chat popup display
  const chatBtn = document.getElementById('chatBtn');
  const chatPopup = document.getElementById('chatPopup');
  const closeChat = document.getElementById('closeChat');

  // Show the popup when the chat button is clicked
  chatBtn.addEventListener('click', () => {
      chatPopup.style.display = 'flex';
  });

  // Hide the popup when the close button is clicked
  closeChat.addEventListener('click', () => {
      chatPopup.style.display = 'none';
  });

  // Handle sending messages
  const sendMessageBtn = document.getElementById('sendMessage');
  const chatBody = document.getElementById('chatBody');
  const userMessageInput = document.getElementById('userMessage');

  sendMessageBtn.addEventListener('click', async() => {
    const userMessage = userMessageInput.value;
    if (userMessage) {
      const response = await fetch('http://127.0.0.1:8000/chat_gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }), // Use the inputText as prompt
      });
      const data = await response.json();
      console.log(data.ans, "===================");
  
      appendMessage('user', userMessage);
      setTimeout(() => {
  
        appendMessage('bot', ` ${data.ans}`);
      }, 100);
      userMessageInput.value = '';
    }
  });

  // Function to append messages to chat
  function appendMessage(sender, message) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
      messageDiv.textContent = message;
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom
  }
});
