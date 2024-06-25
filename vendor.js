// input's border color change based on validation//
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
      input.addEventListener('keydown', function() {
        this.style.border = '2px solid rgba(255, 255, 255, 0.97);'; 
        this.classList.remove('blinking-border');
      });
    });
  });
});

// Overlay -pop up Function
function overlay() {
  document.getElementById('update_title').style.display = 'none';
  document.getElementById('add_title').style.display = 'block';
  
  document.getElementById('update-button').style.display = 'none';
  document.getElementById('submit-button').style.display = 'inline-block';

  var element = document.getElementById('form-overlay');
  element.style.display = "block";
}

// disable overlay function
function overlayOff() {
  var element = document.getElementById('form-overlay');
  element.style.display = "none";
  document.getElementById('VendorForm').reset();
  resetValidationStyles();
}

function resetValidationStyles() {
  const elements = [
    { id: 'vendorId', placeholder: 'ID*' },
    { id: 'vendorName', placeholder: 'Name*' },
    { id: 'phoneNumber1', placeholder: 'Phone number*' },
    { id: 'phoneNumber2', placeholder: 'Alternate number' },
    { id: 'email', placeholder: 'john@email.com' },
    { id: 'doorNo', placeholder: 'Door number*' },
    { id: 'line1', placeholder: 'Line 1*' },
    { id: 'line2', placeholder: 'Line 2' },
    { id: 'city', placeholder: 'City*' },
    { id: 'state', placeholder: 'State*' },
    { id: 'pincode', placeholder: 'Pincode*' },
    { id: 'country', placeholder: 'Country*' }
  ];

  elements.forEach(element => {
    const inputElement = document.getElementById(element.id);
    if (inputElement) {
      inputElement.classList.remove('blinking-border');
      inputElement.style.border = '2px solid rgba(255, 255, 255, 0.97);';
      inputElement.placeholder = element.placeholder;
    }
  });
}

// Inserting New Records into the Table
function insertion() {
  let id = document.getElementById('vendorId').value;
  let name = document.getElementById('vendorName').value;
  let phone1 = document.getElementById('phoneNumber1').value;
  let phone2 = document.getElementById('phoneNumber2').value;
  let email = document.getElementById('email').value;
  let doorNo = document.getElementById('doorNo').value;
  let line1 = document.getElementById('line1').value;
  let line2 = document.getElementById('line2').value;
  let city = document.getElementById('city').value;
  let state = document.getElementById('state').value;
  let pincode = document.getElementById('pincode').value;
  let country = document.getElementById('country').value;

  let table = document.getElementById('ven_table');

  if (!checkVendorId(id, table)) {
    return false;
  }
  let rowCount = table.rows.length;
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td><input type="checkbox" class="row-checkbox" onchange="toggleDeleteIcon()"></td>
    <td>${rowCount}</td>
    <td>${id}</td>
    <td>${name}</td>
    <td>${phone1}<br>${phone2}</td>
    <td>${email}</td>
    <td>${line2 ? `${doorNo}, ${line1}, ${line2}, ${city}, ${state}<br>${country}-${pincode}` : `${doorNo}, ${line1}, ${city}, ${state}<br>${country}-${pincode}`}</td>
    <td>
    <i class="fas fa-edit update-icon" title="Update" onclick="update(this.parentNode.parentNode)"></i>
    <i class="fas fa-trash delete-icon" title="Delete" onclick="deleteRow(this)"></i>
  </td>
  `;
  table.appendChild(tr);
 // jsonValues();
  document.getElementById('VendorForm').reset();
  overlayOff();
  return true;
}

// Delete Button on Table
function deleteRow(img) {
  let deleteOverlay = document.getElementById('deleteRow');
  deleteOverlay.style.display = 'block'; 
  
  let id = img.parentNode.parentNode.cells[1].innerText; 
  let message = document.getElementById('deleteMessage');
  if (message) {
    message.innerHTML = `Are you certain you want to remove Vendor ID-${id}?`;
  
  // Handle Delete button click
  document.getElementById('confirmDelete').onclick = function() {
    let row = img.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Update serial numbers for each row
    let table = document.getElementById('ven_table');
    let rows = table.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
      rows[i].getElementsByTagName('td')[0].innerText = i;
    }
    // Hide the popup
    deleteOverlay.style.display = 'none';
  };
  // Handle Cancel button click
  document.getElementById('cancelDelete').onclick = function() {
    deleteOverlay.style.display = 'none';
  };
}
}

let currentRow = null;
let currentIndex;
// Update the values into the form
function update(row) {
  currentRow = row;
  currentIndex = row.rowIndex;
  // To make a form visible ('block')
  overlay();
  
  document.getElementById('add_title').style.display = 'none';
  document.getElementById('update_title').style.display = 'block';

  document.getElementById('update-button').style.display = 'inline-block';
  document.getElementById('submit-button').style.display = 'none';

  const cells = row.getElementsByTagName('td');
  
  document.getElementById('vendorId').value = cells[2].innerText;
  document.getElementById('vendorName').value = cells[3].innerText;

  const phoneNumbers = cells[4].innerText.split('\n');
  document.getElementById('phoneNumber1').value = phoneNumbers[0];
  if (phoneNumbers[1]) {
    document.getElementById('phoneNumber2').value = phoneNumbers[1];
  }
  document.getElementById('email').value = cells[5].innerText;

  const addressParts = cells[6].innerText.split(', ');
  if (addressParts.length == 5) {
    document.getElementById('doorNo').value = addressParts[0];
    document.getElementById('line1').value = addressParts[1];
    document.getElementById('line2').value = addressParts[2];
    document.getElementById('city').value = addressParts[3];
    const addPart = addressParts[4].split('\n');
    document.getElementById('state').value = addPart[0];
    const addParts = addPart[1].split('-');
    document.getElementById('country').value = addParts[0];
    document.getElementById('pincode').value = addParts[1];
  } else {
    document.getElementById('doorNo').value = addressParts[0];
    document.getElementById('line1').value = addressParts[1];
    document.getElementById('city').value = addressParts[2];
    const addPart = addressParts[3].split('\n');
    document.getElementById('state').value = addPart[0];
    const addParts = addPart[1].split('-');
    document.getElementById('country').value = addParts[0];
    document.getElementById('pincode').value = addParts[1];
  }
}

// Form Submission
function updateForm(event) {
  if (currentRow) {
    // Get the cells of the current row
    const cells = currentRow.getElementsByTagName('td');

    const id = document.getElementById('vendorId').value;
    const name = document.getElementById('vendorName').value;
    const phoneNumber1 = document.getElementById('phoneNumber1').value;
    const phoneNumber2 = document.getElementById('phoneNumber2').value;
    const email = document.getElementById('email').value;
    const doorNo = document.getElementById('doorNo').value;
    const line1 = document.getElementById('line1').value;
    const line2 = document.getElementById('line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const pincode = document.getElementById('pincode').value;

    let table = document.getElementById('ven_table');
      if (!checkUpdateVendorId(id, table)) {
        return false;
      }
    
    cells[2].innerText = id;
    cells[3].innerText = name;
    cells[4].innerText = phoneNumber2 ? `${phoneNumber1}\n${phoneNumber2}` : `${phoneNumber1}`;
    cells[5].innerText = email;
    cells[6].innerText = line2 ? `${doorNo}, ${line1}, ${line2}, ${city}, ${state}\n${country}-${pincode}` : `${doorNo}, ${line1}, ${city}, ${state}\n${country}-${pincode}`;

    // Clear the current row reference
    currentRow = null;

    document.getElementById('VendorForm').reset();
    overlayOff();
    return true;
  }
}
//document.getElementById('vendorForm').addEventListener('submit', updateForm);

//javascript object to store a vendor details
let vendorArray = [];

function jsonValues() {

  const form = document.getElementById('VendorForm');
  const vendorData = {};

  form.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]').forEach(input => {
    vendorData[input.name] = input.value.trim();
  });
  vendorArray.push(vendorData);

  console.log('Current array:', vendorArray);
}

// 
function submitForm(event) {
  event.preventDefault(); // Prevent form submission

  // Variable to track if the form is vald
  let isValid = true;

  // Perform validation
  if (!validateVendorId()) isValid = false;
  if (!validateVendorName()) isValid = false;
  if (!validatePhoneNumber1()) isValid = false;
  if (!validatePhoneNumber2()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validateDoorNo()) isValid = false;
  if (!validateLine1()) isValid = false;
  if (!validateCity()) isValid = false;
  if (!validateState()) isValid = false;
  if (!validatePincode()) isValid = false;
  if (!validateCountry()) isValid = false;

  // Check if the form is valid
  if (!isValid) {
    //displayValidationErrors();
    return false;
  }

  // If no validation errors, proceed with form insertion or update
  if (currentRow) {
    updateForm();
  } else {
    insertion(); 
  }
  return true;
}

//Validation Functions
function validateVendorId() {
  const vendorId = document.getElementById('vendorId');
  const vendorIdValue = vendorId.value.trim();
  if (vendorIdValue === "") {
    vendorId.placeholder = "Enter valid vendor ID*";
    vendorId.classList.add('blinking-border');
    return false;
  } else {
    vendorId.classList.remove('blinking-border'); 
    return true;
  }
}

function validateVendorName() {
  const vendorName = document.getElementById('vendorName');
  if (vendorName.value.trim() === "") {
    vendorName.placeholder=" Enter valid vendor Name*";
    vendorName.classList.add('blinking-border');
    return false;
  } else {
    vendorName.classList.remove('blinking-border');
    return true;
  }
}

function validatePhoneNumber1() {
  const phoneNumber1 = document.getElementById('phoneNumber1');
  const maxLength = 10;
  if (phoneNumber1.value.trim() === "" || phoneNumber1.value.length!=maxLength) {
    phoneNumber1.value='';
    phoneNumber1.placeholder="Enter 10 digits phone number*";
    phoneNumber1.classList.add('blinking-border');
    return false;
  }else {
    phoneNumber1.classList.remove('blinking-border');
    return true;
  }
}

function validatePhoneNumber2() {
  const phoneNumber2 = document.getElementById('phoneNumber2');
  const maxLength = 10;
  if(phoneNumber2.value!=''){
    if ( phoneNumber2.value.length!=maxLength) {
      phoneNumber2.value='';
      phoneNumber2.placeholder="Enter 10 digits phone number*";
      phoneNumber2.classList.add('blinking-border');
      return false;
    } else {
    phoneNumber2.classList.remove('blinking-border');
    return true;
    }
  }else{
    return true;
  }  
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)*$/;
//  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email !== '') {
    if (!emailPattern.test(email)) {
      emailInput.value = '';
      emailInput.placeholder = "Enter valid email address";
      emailInput.classList.add('blinking-border');
      return false;
    } else {
      emailInput.classList.remove('blinking-border');
      return true;
    }
  } else {
    return true; // Allow empty email field
  }
}

function validateDoorNo() {
  const doorNo = document.getElementById('doorNo');
  if (doorNo.value.trim() === "") {
    doorNo.placeholder="Enter valid door number*";
    doorNo.classList.add('blinking-border');
    return false;
  } else {
    doorNo.classList.remove('blinking-border');
    return true;
  }
}

function validateLine1() {
  const line1 = document.getElementById('line1');
  if (line1.value.trim() === "") {
    line1.placeholder=" Enter valid street*";
    line1.classList.add('blinking-border');
    return false;
  } else {
    line1.classList.remove('blinking-border');
    return true;
  }
}

function validateCity() {
  const city = document.getElementById('city');
  if (city.value.trim() === "") {
    city.placeholder=" Enter valid city*";
    city.classList.add('blinking-border');
    return false;
  } else {
    city.classList.remove('blinking-border');
    return true;
  }
}

function validateState() {
  const state = document.getElementById('state');
  if (state.value.trim() === "") {
    state.placeholder="Enter valid state*";
    state.classList.add('blinking-border');
    return false;
  } else {
    state.classList.remove('blinking-border');
    return true;
  }
}

function validatePincode() {
  const pincode = document.getElementById('pincode');
  const length = 6;
  if (pincode.value.trim() === "" || (!/^[0-9]+$/.test(pincode.value)) || pincode.value.length!=length) {
    pincode.value=""
    pincode.placeholder="Enter 6 digits pincode*";
    pincode.classList.add('blinking-border');
    return false;
  } else {
    pincode.classList.remove('blinking-border');
    return true;
  }
}

function validateCountry() {
  const country = document.getElementById('country');
  if (country.value.trim() === "" || (!/^[a-zA-Z]+$/.test(country.value.trim()))) {
    country.value='';
    country.placeholder=" Enter valid country*";
    country.classList.add('blinking-border');
    return false;
  } else {
    country.classList.remove('blinking-border');
    return true;
  }
}

 // Function to check if the vendor ID already exists on insertion
 function checkVendorId(id, table) {
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
      if (rows[i].cells[2].innerHTML === id) {
        vendorId.value = "";
        vendorId.placeholder = "Vendor ID already exists / Enter valid Vendor ID*";
        vendorId.classList.add('blinking-border');
        return false;
      }
  }
  return true; 
}

// Function to check if the vendor ID already exists on update
function checkUpdateVendorId(id, table) {
  let rows = table.rows;
  for (let i = 1; i < rows.length; i++) {
    if (i === currentIndex) {
      continue;
    };
    if (rows[i].cells[2].innerHTML === id) {
      vendorId.value = "";
      vendorId.placeholder = "Vendor ID already exists / Enter valid Vendor ID*";
      vendorId.classList.add('blinking-border');
      return false;
      }
  }
  return true; 
}


//selecting all rows//
function toggleDeleteIcon() {
  let checkboxes = document.getElementsByClassName('row-checkbox');
  let deleteIcon = document.getElementById('deleteAll');
  let anyChecked = false;

  for (let checkbox of checkboxes) {
      if (checkbox.checked) {
          anyChecked = true;
          break;
      }
  }
  if (anyChecked) {
      deleteIcon.classList.remove('disabled');
  } else {
      deleteIcon.classList.add('disabled');
  }
}

function toggleSelectAll(selectAllCheckbox) {
  let checkboxes = document.getElementsByClassName('row-checkbox');
  for (let checkbox of checkboxes) {
      checkbox.checked = selectAllCheckbox.checked;
  }
  toggleDeleteIcon();
}

//multiple row delete//
function deleteMultiRow() {
  let deleteOverlay = document.getElementById('deleteMulti');
  deleteOverlay.style.display = 'block';

  let checkboxes = document.getElementsByClassName('row-checkbox');
  let checkedRows = [];

  // Collect all checked rows
  for (let checkbox of checkboxes) {
      if (checkbox.checked) {
          checkedRows.push(checkbox.parentNode.parentNode); 
      }
  }
let rowcount = checkedRows.length;
  //confirmation message
  let message = document.getElementById('deleteMultipleMessage');
  if (message) {
    if(rowcount === 1){
      message.innerHTML = `Are you certain you want to delete this row?`;
    }
    else if(rowcount > 1){
      message.innerHTML = `Are you certain you want to delete ${rowcount} rows?`;
    }
    // Confirm delete button 
    document.getElementById('confirmMultiDelete').onclick = function() {
      for (let row of checkedRows) {
        row.remove();
      }

      // Update row numbers 
      let table = document.getElementById('ven_table');
      let rows = table.getElementsByTagName('tr');
      for (let i = 1; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[1].innerText = i;
      }

      // Hide the overlay and delete confirmation popup     
      deleteOverlay.style.display = 'none';
      
      // Update delete icon state
      toggleDeleteIcon();
    };  
    document.getElementById('cancelMultiDelete').onclick = function() {
      deleteOverlay.style.display = 'none';
    }; 
  }
}


