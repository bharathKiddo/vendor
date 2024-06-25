//javascript array to store a vendor details//
let vendorArray = [];

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

// Overlay - pop up Function for form container//
function overlay() {
  document.getElementById('update_title').style.display = 'none';
  document.getElementById('add_title').style.display = 'block';
  
  document.getElementById('update-button').style.display = 'none';
  document.getElementById('submit-button').style.display = 'inline-block';

  var element = document.getElementById('form-overlay');
  element.style.display = "block";
}

// disable overlay - pop up function//
function overlayOff() {
  var element = document.getElementById('form-overlay');
  element.style.display = "none";
  document.getElementById('VendorForm').reset();
  resetValidationStyles();
}

//reset form error placeholders//
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

// Inserting New Records into the Table//
function insertion() {
  const newVendor = {
    vendorId: document.getElementById('vendorId').value,
    vendorName: document.getElementById('vendorName').value,
    phoneNumber1: document.getElementById('phoneNumber1').value,
    phoneNumber2: document.getElementById('phoneNumber2').value,
    email: document.getElementById('email').value,
    doorNo: document.getElementById('doorNo').value,
    line1: document.getElementById('line1').value,
    line2: document.getElementById('line2').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    country: document.getElementById('country').value,
    pincode: document.getElementById('pincode').value
};
if(!checkVendorId(newVendor.vendorId)){
  return false;
}
  addRow(newVendor);
}

//adding a new vendor details into array and table//
function addRow(vendor) {
  const tableBody = document.getElementById('tableBody'); 

  // if (!vendor.vendorId) {
  //   vendor.vendorId = vendorArray.length ? vendorArray[vendorArray.length - 1].vendorId + 1 : 1;
  // }
  vendorArray.push(vendor);
  const rowIndex = vendorArray.length - 1;
  const row = tableBody.insertRow();
  row.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" onchange="handleChange()"></td>
      <td>${rowIndex + 1}</td>
      <td>${vendor.vendorId}</td>
      <td>${vendor.vendorName}</td>
      <td>${vendor.phoneNumber1}<br>${vendor.phoneNumber2 || ''}</td>
      <td>${vendor.email || ''}</td>
      <td>${vendor.doorNo}, ${vendor.line1}${vendor.line2 ? ', ' + vendor.line2 : ''}, ${vendor.city}, ${vendor.state}<br>${vendor.country}-${vendor.pincode}</td>
      <td>
        <i class="fas fa-edit update-icon" title="Update" onclick="update(${rowIndex})"></i>
        <i class="fas fa-trash delete-icon" title="Delete" onclick="deleteRow(${rowIndex})"></i>
      </td>
  `;
  document.getElementById('VendorForm').reset();
  overlayOff();
  return true;
}

//delete a single row//
function deleteRow(index) {
  let deleteOverlay = document.getElementById('deleteRow');
  deleteOverlay.style.display = 'block'; 
  
  let message = document.getElementById('deleteMessage');
  if (message) {
    message.innerHTML = `Are you certain you want to remove Vendor ID-${vendorArray[index].vendorId}?`;
  }

  document.getElementById('confirmDelete').onclick = function() {
    if (index !== -1 && index < vendorArray.length) {
      vendorArray.splice(index, 1);

      // Remove the row from the table
      let tableBody = document.getElementById('tableBody');
      if (tableBody.rows.length > index) {
        tableBody.deleteRow(index);
      }

      //Update row's s.no//
      let rows = tableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        cells[1].innerText = i + 1;
        cells[7].getElementsByClassName('update-icon')[0].setAttribute('onclick', `update(${i})`);
        cells[7].getElementsByClassName('delete-icon')[0].setAttribute('onclick', `deleteRow(${i})`);
      }
      deleteOverlay.style.display = 'none';
    } 
  };

  //Cancel button//
  document.getElementById('cancelDelete').onclick = function() {
    deleteOverlay.style.display = 'none';
  };
}

let currentVendorId = null;

// edit button - update the values from array to the form//
function update(rowIndex) {
  overlay();
  //console.log(rowIndex);
  const vendor = vendorArray[rowIndex];
  currentVendorId = vendor.vendorId;
 // console.log(currentVendorId); //console
  //console.log(rowIndex);//console
  document.getElementById('add_title').style.display = 'none';
  document.getElementById('update_title').style.display = 'block';

  document.getElementById('update-button').style.display = 'inline-block';
  document.getElementById('submit-button').style.display = 'none';

  document.getElementById('vendorId').value = vendor.vendorId;
  document.getElementById('vendorName').value = vendor.vendorName;
  document.getElementById('phoneNumber1').value = vendor.phoneNumber1;
  document.getElementById('phoneNumber2').value = vendor.phoneNumber2 || '';
  document.getElementById('email').value = vendor.email || '';
  document.getElementById('doorNo').value = vendor.doorNo;
  document.getElementById('line1').value = vendor.line1;
  document.getElementById('line2').value = vendor.line2 || ''; 
  document.getElementById('city').value = vendor.city;
  document.getElementById('state').value = vendor.state;
  document.getElementById('country').value = vendor.country;
  document.getElementById('pincode').value = vendor.pincode;
}
let vendorIndex;

//Update the value into the array and form//
function updateForm(event) {
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

  if (!isValid) {
    // displayValidationErrors(); 
    return false;
  }
  
  if (currentVendorId !== null) {
    vendorIndex = findVendorIndexById(currentVendorId);

    if (vendorIndex !== -1) {
      const id = document.getElementById('vendorId').value.trim();
      const name = document.getElementById('vendorName').value.trim();
      const phoneNumber1 = document.getElementById('phoneNumber1').value.trim();
      const phoneNumber2 = document.getElementById('phoneNumber2').value.trim();
      const email = document.getElementById('email').value.trim();
      const doorNo = document.getElementById('doorNo').value.trim();
      const line1 = document.getElementById('line1').value.trim();
      const line2 = document.getElementById('line2').value.trim();
      const city = document.getElementById('city').value.trim();
      const state = document.getElementById('state').value.trim();
      const country = document.getElementById('country').value.trim();
      const pincode = document.getElementById('pincode').value.trim();

      // Validate the updated vendor ID
      if (!checkUpdateVendorId(id)) {
        return false;
      }
      vendorArray[vendorIndex].vendorId = id;
      vendorArray[vendorIndex].vendorName = name;
      vendorArray[vendorIndex].phoneNumber1 = phoneNumber1;
      vendorArray[vendorIndex].phoneNumber2 = phoneNumber2;
      vendorArray[vendorIndex].email = email;
      vendorArray[vendorIndex].doorNo = doorNo;
      vendorArray[vendorIndex].line1 = line1;
      vendorArray[vendorIndex].line2 = line2;
      vendorArray[vendorIndex].city = city;
      vendorArray[vendorIndex].state = state;
      vendorArray[vendorIndex].country = country;
      vendorArray[vendorIndex].pincode = pincode;

      let tableBody = document.getElementById('tableBody');
      let rows = tableBody.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        if (cells[2].innerText == currentVendorId) {
          cells[2].innerText = id;
          cells[3].innerText = name;
          cells[4].innerText = phoneNumber2 ? `${phoneNumber1}\n${phoneNumber2}` : `${phoneNumber1}`;
          cells[5].innerText = email;
          cells[6].innerText = line2 ? `${doorNo}, ${line1}, ${line2}, ${city}, ${state}\n${country}-${pincode}` : `${doorNo}, ${line1}, ${city}, ${state}\n${country}-${pincode}`;
          break;
        }
      }

      currentVendorId = null;
      vendorIndex='';
      document.getElementById('VendorForm').reset();
      overlayOff();
      return true;
    }
  }

  return false;
}

function findVendorIndexById(id) {
  return vendorArray.findIndex(vendor => vendor.vendorId == id);
}
// 
function submitForm(event) {
  event.preventDefault(); // Prevent form submission

  let isValid = true;

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

  if (!isValid) {
    //displayValidationErrors();
    return false;
  }
  insertion(); 
  return true;
}

//Validation Functions//
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
  if (phoneNumber1.value.trim() === "" || (!/^[0-9]+$/.test(phoneNumber1.value)) || 
      phoneNumber1.value.length!=maxLength) {
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
    if ((!/^[0-9]+$/.test(phoneNumber2.value)) || phoneNumber2.value.length!=maxLength) {
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
    return true; // Allow empty email field//
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
    country.placeholder=" Enter valid country*";
    country.classList.add('blinking-border');
    return false;
  } else {
    country.classList.remove('blinking-border');
    return true;
  }
}

 // Function to check if the vendor ID already exists on insertion//
 function checkVendorId(id) {
  for (let vendor of vendorArray) {
    if (vendor.vendorId === id) {
      document.getElementById('vendorId').value = "";
      document.getElementById('vendorId').placeholder = "Vendor ID already exists / Enter valid Vendor ID*";
      document.getElementById('vendorId').classList.add('blinking-border');
      return false;
    }
  }
  return true; 
}

// Function to check if the vendor ID already exists on update//
function checkUpdateVendorId(id) {
  let table = document.getElementById('tableBody')
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    if (i === vendorIndex) {
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
function updateSelectAllCheckbox() {
  let checkboxes = document.getElementsByClassName('row-checkbox');
  let selectAllCheckbox = document.getElementById('selectAll');
  let allChecked = true;

  for (let checkbox of checkboxes) {
      if (!checkbox.checked) {
          allChecked = false;
          break;
      }
  }

  selectAllCheckbox.checked = allChecked;
}

//to check and uncheck selectall toggle//
function handleChange(){
  toggleDeleteIcon();
  updateSelectAllCheckbox();
}

//multiple rows delete//
function deleteMultiRow() {
  let deleteOverlay = document.getElementById('deleteMulti');
  deleteOverlay.style.display = 'block';

  let checkboxes = document.getElementsByClassName('row-checkbox');
  let checkedRows = [];
  let indicesToRemove = [];

  // Collect all checked rows//
  for (let checkbox of checkboxes) {
      if (checkbox.checked) {
          let row = checkbox.parentNode.parentNode;
          checkedRows.push(row);
          let rowIndex = row.rowIndex - 1; // Assuming first row is the header//
          indicesToRemove.push(rowIndex);
      }
  }

  // Sort indices in descending order//
  indicesToRemove.sort((a, b) => b - a);

  let rowCount = checkedRows.length;
  let message = document.getElementById('deleteMultipleMessage');

  if (message) {
      if (rowCount === 1) {
          message.innerHTML = `Are you certain you want to delete this row?`;
      } else if (rowCount > 1) {
          message.innerHTML = `Are you certain you want to delete ${rowCount} rows?`;
      }

      // Confirm delete button//
      document.getElementById('confirmMultiDelete').onclick = function() {
          for (let index of indicesToRemove) {
              if (index !== -1 && index < vendorArray.length) {
                  vendorArray.splice(index, 1);
              }
          }

          // Remove the rows from the table//
          for (let row of checkedRows) {
              row.remove();
          }

          // Update row's s.no//
          let tableBody = document.getElementById('tableBody');
          let rows = tableBody.getElementsByTagName('tr');
          for (let i = 0; i < rows.length; i++) {
              let cells = rows[i].getElementsByTagName('td');
              cells[1].innerText = i + 1;
              cells[7].getElementsByClassName('update-icon')[0].setAttribute('onclick', `update(${i})`);
              cells[7].getElementsByClassName('delete-icon')[0].setAttribute('onclick', `deleteRow(${i})`);
          }

          deleteOverlay.style.display = 'none';
          toggleDeleteIcon();
      };

      // Cancel button //
      document.getElementById('cancelMultiDelete').onclick = function() {
          deleteOverlay.style.display = 'none';
      };
  }
}


