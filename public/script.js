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
