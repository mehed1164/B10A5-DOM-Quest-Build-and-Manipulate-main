const donationButton = document.getElementById('donationButton');
const historyButton = document.getElementById('historyButton');
let historyList = document.getElementById('historyList');
const donationSection = document.getElementById('donationContent');
const historySection = document.getElementById('historyContent');

// Toggle visibility of sections and highlight active button
donationButton.addEventListener('click', function () {
    toggleVisibility(donationSection, historySection, donationButton, historyButton);
});

historyButton.addEventListener('click', function () {
    toggleVisibility(historySection, donationSection, historyButton, donationButton);
    displayHistory();
});

// Function to toggle visibility of sections
function toggleVisibility(activeSection, inactiveSection, activeButton, inactiveButton) {
    activeSection.style.display = 'block';
    inactiveSection.style.display = 'none';
    
    // Highlight active button
    activeButton.classList.add('bg-green-500');
    activeButton.classList.remove('border-gray-300', 'text-gray-700');
    inactiveButton.classList.add('border-gray-300', 'text-gray-700');
    inactiveButton.classList.remove('bg-green-500');
}

// Add donation to history
function addToHistory(title, amount) {
    let date = new Date().toLocaleString();
    let historyCard = document.createElement('div');

    historyCard.className = 'bg-white shadow-md p-4 rounded-lg mb-2';
    historyCard.innerHTML = `
        <p class="font-bold">${title}</p>
        <p>Amount: ${amount} BDT</p>
        <p>Date: ${date}</p>
    `;
    historyList.prepend(historyCard);
}

// Display donation history
function displayHistory() {
    if (historyList.children.length === 0) {
        historyList.innerHTML = '<p>No donation history available.</p>';
    }
}

// Donation function
function donate(sector) {
    let accountBalanceElement = document.getElementById('account-balance');
    let sectorButtonElement;
    let inputElement;

    if (sector === 600) {
        sectorButtonElement = document.getElementById('btn-noakhali-600');
        inputElement = document.getElementById('add-money-noakhali');
    } else if (sector === 500) {
        sectorButtonElement = document.getElementById('btn-feni-500');
        inputElement = document.getElementById('add-money-feni');
    } else if (sector === 1200) {
        sectorButtonElement = document.getElementById('btn-quota-1200');
        inputElement = document.getElementById('add-money-Quota');
    } else {
        console.error("Invalid sector");
        return;
    }

    const accountBalance = Number(accountBalanceElement.innerText);
    const sectorAmount = Number(sectorButtonElement.innerText);
    const donationAmount = Number(inputElement.value);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationAmount <= accountBalance) {
        accountBalanceElement.innerText = accountBalance - donationAmount;
        sectorButtonElement.innerText = sectorAmount + donationAmount;
        addToHistory(`Donation to ${sectorButtonElement.innerText}`, donationAmount);
        inputElement.value = "";

        // Show modal for confirmation
        const modal = document.getElementById('my_modal_5');
        modal.showModal();
    } else {
        alert("Insufficient balance for this donation.");
    }
}

// Close modal event listener
document.getElementById('closeModalButton').addEventListener('click', function () {
    const modal = document.getElementById('my_modal_5');
    modal.close();
});
