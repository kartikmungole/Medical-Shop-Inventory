let medicines = JSON.parse(localStorage.getItem('medicines')) || []; // Retrieve medicines from localStorage or initialize empty

// Function to add a medicine to the list
function addMedicine() {
    const medicineInput = document.getElementById('medicineInput');
    const medicineName = medicineInput.value.trim();

    if (medicineName === '') {
        alert('Please enter a medicine name.');
        return;
    }

    if (!medicines.includes(medicineName)) {
        medicines.push(medicineName);
        localStorage.setItem('medicines', JSON.stringify(medicines)); // Save to localStorage
        alert('Medicine added successfully.');
        medicineInput.value = ''; // Clear input
    } else {
        alert('Medicine already exists in the inventory.');
    }
}

// Function to display the list of medicines
function displayMedicines() {
    const medicineList = document.getElementById('medicineList');
    if (medicineList) { // Ensure the element exists on the page
        medicineList.innerHTML = ''; // Clear the current list

        medicines.forEach((medicine, index) => {
            const li = document.createElement('li');
            li.textContent = medicine;

            // Remove button for each medicine
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeMedicine(index);

            li.appendChild(removeButton);
            medicineList.appendChild(li);
        });
    }
}

// Function to remove a medicine from the list
function removeMedicine(index) {
    medicines.splice(index, 1);
    localStorage.setItem('medicines', JSON.stringify(medicines)); // Update localStorage
    displayMedicines();
}

// Function to search for a medicine
function searchMedicine() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toLowerCase();

    if (searchQuery === '') {
        alert('Please enter a medicine name to search.');
        return;
    }

    const foundMedicine = medicines.find(medicine => medicine.toLowerCase() === searchQuery);
    
    if (foundMedicine) {
        alert(`Medicine "${foundMedicine}" is available in the inventory.`);
    } else {
        alert('Medicine not found.');
    }
}

// Initialize the medicines list if on the available medicines page
if (window.location.pathname.includes('available.html')) {
    displayMedicines();
}
