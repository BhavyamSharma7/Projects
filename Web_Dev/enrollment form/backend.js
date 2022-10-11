var i = 1; /* to check which row is added i.e it will help us to set background color */

/* validation funtion will first validate all input fields ,if all return true then only it will insertdata in array  */

function validateAndInsert() {
  if (
    (validateName() &&
      validateEmail() &&
      validateWebsite() &&
      validateImageLink() &&
      validateGender() &&
      validateSkill()) == true
  ) {
    insertData();
    clearInputField();
    i++;
    displayInputRecord();
  }
}

/* clearInputField will clear all input and error fields */
function clearInputField() {
  document.getElementById("userform").reset();
  resetError();
}

/* validations of all input fields */

//validateName() will validate user input name
function validateName() {
  var name = document.getElementById("inputName").value;
  if (name == "") {
    document.getElementById("nameerror").innerHTML =
      " ** please enter your name **";
    return false;
  } else if (name.length < 3 || name.length > 20) {
    document.getElementById("nameerror").innerHTML =
      " ** length of name must be between 3 and 20 ** ";
    return false;
  }
  document.getElementById("nameerror").innerHTML = " ";
  return true;
}

// validateEmail() will validate user input email
function validateEmail() {
  var email = document.getElementById("inputEmail").value;
  if (email == "") {
    document.getElementById("emailerror").innerHTML =
      " ** please enter your email id **";
    return false;
  } else if (email.indexOf("@") <= 0) {
    document.getElementById("emailerror").innerHTML =
      " ** please enter valid email id ** ";
    return false;
  } else if (
    email.charAt(email.length - 4) != "." &&
    email.charAt(email.length - 3) != "."
  ) {
    document.getElementById("emailerror").innerHTML =
      " ** please enter valid email id **";
    return false;
  }

  document.getElementById("emailerror").innerHTML = " ";
  return true;
}

/* regular expression for checking url */

function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

// ValidateWebsite() will validate the image URL by comparing with regular expression
function validateWebsite() {
  var website = document.getElementById("inputWebsite").value;
  if (website == "") {
    document.getElementById("websiteerror").innerHTML =
      " ** please enter your website url ** ";
    return false;
  } else if (isValidURL(website) == false) {
    document.getElementById("websiteerror").innerHTML =
      " ** please enter valid website url ** ";
    return false;
  }
  document.getElementById("websiteerror").innerHTML = " ";
  return true;
}

// ValidateImageLink() will validate the image URL by comparing with regular expression
function validateImageLink() {
  var image = document.getElementById("inputImageLink").value;
  if (image == "") {
    document.getElementById("imageerror").innerHTML =
      " ** please enter your image url ** ";
    return false;
  } else if (isValidURL(image) == false) {
    document.getElementById("imageerror").innerHTML =
      " ** please enter valid image link ** ";
    return false;
  }
  document.getElementById("imageerror").innerHTML = " ";
  return true;
}

// validateGender() will validate all radiobuttons
function validateGender() {
  var male = document.getElementById("radiomale");
  var female = document.getElementById("radiofemale");
  if (!male.checked && !female.checked) {
    document.getElementById("gendererror").innerHTML =
      " ** please select your gender ** ";
    return false;
  }
  document.getElementById("gendererror").innerHTML = "";
  return true;
}

// ValidateSkill() wiil validate all checkboxes
function validateSkill() {
  var skill1 = document.getElementById("inlineCheckbox1").checked;
  var skill2 = document.getElementById("inlineCheckbox2").checked;
  var skill3 = document.getElementById("inlineCheckbox3").checked;

  if (skill1 == "" && skill2 == "" && skill3 == "") {
    document.getElementById("skillerror").innerHTML =
      " ** please select atleast one skill ** ";
    return false;
  }
  document.getElementById("skillerror").innerHTML = "";
  return true;
}

/* resetError() will clear all error fields */

function resetError() {
  document.getElementById("nameerror").innerHTML = " ";
  document.getElementById("emailerror").innerHTML = " ";
  document.getElementById("imageerror").innerHTML = " ";
  document.getElementById("websiteerror").innerHTML = " ";
  document.getElementById("gendererror").innerHTML = " ";
  document.getElementById("skillerror").innerHTML = " ";
}

// 2-D dyanmic array in which we will store data of students

var database = [
  [
    "Matt Rolling",
    "Male",
    "matt.r@emailcom",
    "www.mattr.com",
    "Java,CSS",
    "photos/dummy2.png",
  ],
  [
    "John Doe",
    "Male",
    "john.doe@email.com",
    "www.johndoe.com",
    "Java,HTML",
    "photos/dummy1.jpg",
  ],
];

// insertData() will insert data in array

function insertData() {
  database.push([
    getName(),
    getGender(),
    getEmail(),
    getWebsite(),
    getSkills(),
    getImageLink(),
  ]);
}

/* function to get values entered by user */

// to get name
function getName() {
  var name = document.getElementById("inputName").value;
  return name;
}

// to get email
function getEmail() {
  var email = document.getElementById("inputEmail").value;
  return email;
}

// to get website url
function getWebsite() {
  var website = document.getElementById("inputWebsite").value;
  return website;
}

// to get image link
function getImageLink() {
  var link = document.getElementById("inputImageLink").value;
  return link;
}

// to get gender from radio buttons
function getGender() {
  var gender = document.querySelector('input[type="radio"]:checked');
  return gender.value;
}

// to get user input skills from checkboxes
function getSkills() {
  var skill = "";
  var skill1 = document.getElementById("inlineCheckbox1");
  var skill2 = document.getElementById("inlineCheckbox2");
  var skill3 = document.getElementById("inlineCheckbox3");
  if (skill1.checked == true) {
    skill = skill + skill1.value;
    if (skill2.checked == true) {
      skill = skill + ", " + skill2.value;
      if (skill3.checked == true) {
        skill = skill + ", " + skill3.value;
      }
    } else {
      if (skill3.checked == true) {
        skill = skill + ", " + skill3.value;
      }
    }
  } else {
    if (skill2.checked == true) {
      skill = skill + skill2.value;
      if (skill3.checked == true) {
        skill = skill + ", " + skill3.value;
      }
    } else {
      if (skill3.checked == true) {
        skill = skill + skill3.value;
      }
    }
  }
  return skill;
}

var animation = "fadeIn"; // fadeIn animation class

// displayInputRecord() will display input record on the screen
function displayInputRecord() {
  var tableBody = document.getElementById("tableBody");
  const row = document.createElement("tr"); // to create new row
  var clas = "cell";
  if (i % 2 == 0) {
    clas = "oddCell";
  }

  row.innerHTML = `
        <td class="${clas}">
          <div class="innerCell" id="innerName">${database[i][0]}</div>
          <div class="innerCell">${database[i][1]}</div>
          <div class="innerCell">${database[i][2]}</div>
          <div class="innerCell"><a href="${database[i][3]}" target="_blank">${database[i][3]}</a></div>
          <div class="innerCell" id="innerSkill">${database[i][4]}</div>
        </td>
        <td class="${clas}">
            <img class="image" src="${database[i][5]}" alt="${database[i][0]}_image">
        </td>`;
  tableBody.insertBefore(row, tableBody.childNodes[0]); // to append new row to tablebody container
  row.classList.add("fadeIn"); // to assign class fadeIn to newly created row
}
