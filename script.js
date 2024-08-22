function connectWallet() {
    alert("Wallet connection functionality will be implemented here.");
}

document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Your request has been submitted!");
});

function showInvestPopup() {
    document.getElementById('invest-popup').style.display = 'flex';
}

function closeInvestPopup() {
    document.getElementById('invest-popup').style.display = 'none';
}

function submitInvestment() {
    const amount = document.getElementById('investment-amount').value;
    if (amount > 0) {
        alert(`You have successfully invested $${amount}!`);
        closeInvestPopup();
    } else {
        alert("Please enter a valid amount to invest.");
    }
}



