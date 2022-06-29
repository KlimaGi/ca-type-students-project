const studentFormEl = document.querySelector("form#student-form");
const searchForm = document.querySelector("form#search-form");
// jei null tai kuriamas studentas
let editStudent = null;

const INITIAL_STUDENT_DATA = [
  {
    name: "Lily",
    surname: "Doe",
    age: 32,
    phone: "867979797",
    email: "lily@mail.com",
    itKnowledge: 7,
    groupName: "type 2",
    interests: ["node.js", "js"],
  },
  {
    name: "Zari",
    surname: "Goe",
    age: 29,
    phone: "865676984",
    email: "zari@mail.com",
    itKnowledge: 4,
    groupName: "type 2",
    interests: ["js", "c#", "node.js"],
  },
  {
    name: "Oscar",
    surname: "Rio",
    age: 43,
    phone: "864453697",
    email: "oscar@mail.com",
    itKnowledge: 2,
    groupName: "type 3",
    interests: ["JS"],
  },
  {
    name: "Edy",
    surname: "Foe",
    age: 39,
    phone: "869769797",
    email: "edy@mail.com",
    itKnowledge: 4,
    groupName: "type 3",
    interests: ["node.js", "JS"],
  },
  {
    name: "Bea",
    surname: "Di",
    age: 27,
    phone: "862324249",
    email: "bea@mail.com",
    itKnowledge: 7,
    groupName: "type 1",
    interests: ["node.js", "c#"],
  },
];

let hideByStar = (word) =>
  word
    .split("")
    .map((a) => (a = "*"))
    .join("");

function renderStudent(studentData) {
  let studentName = studentData.name;
  let studentSurname = studentData.surname;
  let studentAge = studentData.age;
  let studentPhone = studentData.phone;
  let studentEmail = studentData.email;
  let studentItKnowledge = studentData.itKnowledge;
  let studentGroup = studentData.groupName;
  let interests = studentData.interests;

  let studentsListEl = document.querySelector("#students-list");
  let studentItem = document.createElement("div");
  studentItem.classList.add("student-item");

  let nameEl = document.createElement("p");
  nameEl.innerHTML = `<strong>Name</strong>:
    <span class="student-name"> ${studentName} </span>`;

  let surnameEl = document.createElement("p");
  surnameEl.innerHTML = `<strong>Surname</strong>: <span class="student-surname">${studentSurname}</span>`;

  let studentAgeEl = document.createElement("p");
  studentAgeEl.innerHTML = `<strong>Age</strong>: <span class="student-age">${studentAge}</span>`;

  let studentPhoneEl = document.createElement("p");
  studentPhoneEl.innerHTML = `<strong>Phone</strong>: ${hideByStar(
    studentPhone
  )}`;

  let studentEmailEl = document.createElement("p");
  studentEmailEl.innerHTML = `<strong>Email</strong>: ${hideByStar(
    studentEmail
  )}`;

  let studentKnowledgeEl = document.createElement("p");
  studentKnowledgeEl.innerHTML = `<strong>IT knowledge</strong>: <span class="student-it-knowledge">${studentItKnowledge}</span>`;

  let studentGroupEl = document.createElement("p");
  studentGroupEl.innerHTML = `<strong>Student group</strong>: <span class="student-group">${studentGroup}</span>`;
  // --------- get all checkboxes checked values
  let interestWrapperEl = document.createElement("div");
  interestWrapperEl.classList.add("interest-wrapper");

  let interestTitleEl = document.createElement("h4");
  interestTitleEl.classList.add("interest-title");
  interestTitleEl.textContent = "Interests: ";

  let interestListEl = document.createElement("ul");
  interestListEl.classList.add("interest-list");

  interests.forEach((interest) => {
    let interestItemElement = document.createElement("li");
    interestItemElement.textContent = interest;

    interestListEl.append(interestItemElement);
  });

  interestWrapperEl.append(interestTitleEl, interestListEl);

  // buttons
  let privateInfoButton = document.createElement("button");
  privateInfoButton.textContent = "Show private info";
  privateInfoButton.classList.add("private-btn");

  privateInfoButton.addEventListener("click", () => {
    if (!privateInfoButton.classList.contains("hide")) {
      studentPhoneEl.innerHTML = `<strong>Phone</strong>: ${studentPhone}`;
      studentEmailEl.innerHTML = `<strong>Email</strong>: ${studentEmail}`;
      privateInfoButton.textContent = "Hide personal info";
    } else {
      let hidePhone = hideByStar(studentPhone);
      let hideEmail = hideByStar(studentEmail);
      studentPhoneEl.innerHTML = `<strong>Phone</strong>: ${hidePhone}`;
      studentEmailEl.innerHTML = `<strong>Email</strong>: ${hideEmail}`;
      privateInfoButton.textContent = "Show personal info";
    }
    privateInfoButton.classList.toggle("hide");
  });

  let deleteStudentButton = document.createElement("button");
  deleteStudentButton.textContent = "Remove student";
  deleteStudentButton.classList.add("btn-delete");

  deleteStudentButton.addEventListener("click", () => {
    studentItem.remove();
    let deleteText = `Student ${studentName} ${studentSurname} is removed`;
    alertMessage(deleteText);
  });

  let editStudentButton = document.createElement("button");
  editStudentButton.textContent = "Edit";
  editStudentButton.classList.add("btn");

  editStudentButton.addEventListener("click", () => {
    studentFormEl.elements.name.value = studentName;
    studentFormEl.elements.surname.value = studentSurname;
    studentFormEl.elements.age.value = studentAge;
    studentFormEl.elements.phone.value = studentPhone;
    studentFormEl.elements.email.value = studentEmail;
    studentFormEl.elements.group.value = studentGroup;
    document.querySelector("#student-it-knowledge").value = studentItKnowledge;
    studentFormEl.elements["it-knowledge"].value = studentItKnowledge;

    studentFormEl.elements.languages.forEach((formInterest) => {
      formInterest.checked = false;
      interests.forEach((studentInterest) => {
        if (studentInterest.value === formInterest.value) {
          formInterest.checked = true;
        }
      });
    });

    editStudent = studentItem;

    let submitBtn = studentFormEl.querySelector('[type="submit"]');
    submitBtn.textContent = "Save Changes";

    submitBtn.addEventListener("click", () => {
      submitBtn.textContent = "Submit";
    });
    itKnowledgeOutputReset();
  });

  studentItem.append(
    nameEl,
    surnameEl,
    studentAgeEl,
    studentPhoneEl,
    studentEmailEl,
    studentKnowledgeEl,
    studentGroupEl,
    interestWrapperEl,
    privateInfoButton,
    deleteStudentButton,
    editStudentButton
  );

  if (editStudent) {
    editStudent.replaceWith(studentItem);
    editStudent = null;

    let alertText = `Student edited (${studentName} ${studentSurname})`;
    alertMessage(alertText);
    studentFormEl.querySelector('[type="submit]').textContent = "Submit";
  } else {
    studentsListEl.prepend(studentItem);
    let alertText = `Student created (${studentName} ${studentSurname})`;
    alertMessage(alertText);
  }
}

function renderInitialData(students) {
  students.map((student) => {
    renderStudent(student);
  });
}
renderInitialData(INITIAL_STUDENT_DATA);

function itKnowledgeOutputReset() {
  const itKnowledgeInputEl = document.querySelector("#student-it-knowledge");
  const itKnowledgeOutputEl = document.querySelector("#it-knowledge-output");

  itKnowledgeOutputEl.textContent = itKnowledgeInputEl.value;

  itKnowledgeInputEl.addEventListener("input", (event) => {
    itKnowledgeOutputEl.textContent = event.target.value;
  });
}
itKnowledgeOutputReset();

studentFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  // event.target select'ina form'a
  let formIsValid = formErrorHandler(event.target);

  if (!formIsValid) return;

  let formInterests = studentFormEl.querySelectorAll(
    'input[name="languages"]:checked'
  );
  let interestValues = [...formInterests].map((interest) => {
    return interest.value;
  });

  let studentFormData = {
    name: document.querySelector("#student-name").value,
    surname: document.getElementById("student-surname").value,
    age: studentFormEl.querySelector("#student-age").value,
    phone: studentFormEl.querySelector('[name="phone"]').value,
    email: event.target.elements.email.value,
    itKnowledge: event.target.elements["it-knowledge"].value,
    groupName: document.querySelector('input[name="group"]:checked').value,
    interests: interestValues,
  };
  renderStudent(studentFormData);

  //studentFormEl.reset();
  event.target.reset();

  localStorage.removeItem("form-info");
});

function alertMessage(text, elementClass = "") {
  const alertEl = document.querySelector("#alert");
  alertEl.textContent = text;

  if (elementClass) alertEl.classList.add(elementClass);

  setTimeout(() => {
    alertEl.textContent = "";
    if (elementClass) alertEl.classList.remove(elementClass);
  }, 5000);
}

function formErrorHandler(form) {
  // pasalina error span'us
  form
    .querySelectorAll(".input-error-message")
    .forEach((input) => input.remove());

  let requiredInputs = form.querySelectorAll("input.required");

  let validForm = true;

  requiredInputs.forEach((input) => {
    input.classList.remove("input-error");

    if (!input.value) {
      inputErrorMessage(input, "This field is required.");
      validForm = false;
      return;
    }

    if (input.name === "name" && input.value.length < 3) {
      inputErrorMessage(input, "The name should have at least 3 letters.");
      validForm = false;
      return;
    }

    if (input.name === "surname" && input.value.length < 3) {
      inputErrorMessage(input, "The surname should have at least 3 letters.");
      validForm = false;
      return;
    }

    if (input.name === "age") {
      if (input.value < 0) {
        inputErrorMessage(input, "The age should be more than 0.");
        validForm = false;
        return;
      }
      if (input.value > 120) {
        inputErrorMessage(input, "Are you sure this is your age?");
        validForm = false;
        return;
      }
    }

    if (input.name === "phone") {
      if (input.value.length < 9 || input.value.length > 12) {
        inputErrorMessage(input, "Wrong phone number.");
        validForm = false;
        return;
      }
    }

    if (input.name === "email") {
      if (!input.value.includes("@") || input.value.length < 5) {
        inputErrorMessage(input, "Wrong email.");
        validForm = false;
        return;
      }
    }
  });

  return validForm;
}

function inputErrorMessage(inputElement, errorMessage) {
  let alertText = "Not all fields are filled";
  alertMessage(alertText, "error-alert");

  inputElement.classList.add("input-error");

  let inputError = document.createElement("span");
  inputError.textContent = errorMessage;
  inputError.classList.add("input-error-message");

  inputElement.after(inputError);
}
// document.body.dataset.hide = false;
// console.log(document.body.dataset.hide);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchInput = event.target.elements.search.value.toLowerCase().trim();

  let searchVariation = event.target.elements.variations.value;
  console.log(searchVariation);

  let allStudents = document.querySelectorAll(".student-item");

  allStudents.forEach((student) => {
    let studentName = student
      .querySelector(".student-name")
      .textContent.toLowerCase()
      .trim();
    let studentSurname = student
      .querySelector(".student-surname")
      .textContent.toLowerCase()
      .trim();
    let studentAge = student.querySelector(".student-age").textContent.trim();
    let studentItKnowledge = student.querySelector(
      ".student-it-knowledge"
    ).textContent;
    let studentGroup = student
      .querySelector(".student-group")
      .textContent.toLocaleLowerCase();

    switch (searchVariation) {
      case "name":
        if (studentName.includes(searchInput)) student.style.display = "block";
        else student.style.display = "none";
        break;

      case "surname":
        if (studentSurname.includes(searchInput))
          student.style.display = "block";
        else student.style.display = "none";
        break;

      case "age":
        if (studentAge === searchInput) student.style.display = "block";
        else student.style.display = "none";
        break;

      case "it-knowledge":
        if (studentItKnowledge === searchInput) student.style.display = "block";
        else student.style.display = "none";
        break;

      case "group":
        if (studentGroup === searchInput) student.style.display = "block";
        else student.style.display = "none";
        break;

      default:
        console.error("netinkamas");
    }
  });
});

function storeFormDataInLocalStorage1() {
  let nameValEl = document.querySelector("#student-name");
  let surnameValEl = document.getElementById("student-surname");
  let ageValEl = document.querySelector("#student-age");
  let phoneValueEl = document.querySelector('[name="phone"]');
  let emailValueEl = document.querySelector("#student-email");
  let itKnowledgeValueEl = document.querySelector("#student-it-knowledge");
  let groupValueEl = document.querySelector('[name="group"]:checked');

  console.log(itKnowledgeValueEl);
  console.log(groupValueEl);

  nameValEl.addEventListener("input", (event) => {
    localStorage.setItem("name", nameValEl.value);
  });
  nameValEl.value = localStorage.getItem("name");

  surnameValEl.addEventListener("input", (event) => {
    let surnameValue = event.target.value;
    localStorage.setItem("surname", surnameValue);
  });
  surnameValEl.value = localStorage.getItem("surname");

  ageValEl.addEventListener("input", (event) => {
    let ageValue = event.target.value;
    localStorage.setItem("age", ageValue);
  });
  ageValEl.value = localStorage.getItem("age");

  phoneValueEl.addEventListener("input", (event) => {
    let phoneValue = event.target.value;
    localStorage.setItem("phone", phoneValue);
  });
  phoneValueEl.value = localStorage.getItem("phone");

  emailValueEl.addEventListener("input", (event) => {
    let emailValue = event.target.value;
    localStorage.setItem("email", emailValue);
  });
  emailValueEl.value = localStorage.getItem("email");

  itKnowledgeValueEl.addEventListener("input", (event) => {
    localStorage.setItem("it-knowledge", itKnowledgeValueEl.value);
  });
}
//storeFormDataInLocalStorage1();

// {
//     itKnowledge: event.target.elements["it-knowledge"].value,
//     group: event.target.elements.group.value,
//     interests: interestValues,
// }
// -----------------------*
function storeFormDataInLocalStorage2() {
  let interests = [];

  studentFormEl.addEventListener("input", (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;

    if (inputName === "languages") {
      console.log(inputValue);

      if (interests.includes(inputValue)) {
        let filteredInterests = interests.filter(
          (interest) => interest !== inputValue
        );
        interests = filteredInterests;
      } else {
        interests.push(inputValue);
      }

      console.log(interests);

      let jsonInterests = JSON.stringify(interests);
      localStorage.setItem(inputName, jsonInterests);
    } else {
      localStorage.setItem(inputName, inputValue);
    }
  });

  // dir grazina objekto formatu
  //console.dir(studentFormEl.elements.name.value);

  studentFormEl.elements.name.value = localStorage.getItem("name");
  studentFormEl.elements.surname.value = localStorage.getItem("surname");
  studentFormEl.elements.age.value = localStorage.getItem("age");
  studentFormEl.elements.phone.value = localStorage.getItem("phone");
  studentFormEl.elements.email.value = localStorage.getItem("email");
  studentFormEl.elements["it-knowledge"].value =
    localStorage.getItem("it-knowledge");
  studentFormEl.elements.group.value = localStorage.getItem("group");

  let parsedInterests = JSON.parse(localStorage.getItem("interest"));
  // veikia idingai
  parsedInterests.map((interest) => {
    console.log(studentFormEl);
    studentFormEl.querySelector(`input[value="${interest}"]`).checked = true;
  });
}
//storeFormDataInLocalStorage2();

function storeFormDataInLocalStorage3() {
  studentFormEl.addEventListener("input", () => {
    let formInterest = document.querySelectorAll(
      'input[name="languages"]:checked'
    );
    let interestValues = [...formInterest].map((interest) => {
      return interest.value;
    });

    let formInfo = {
      name: studentFormEl.querySelector("#student-name").value,
      surname: studentFormEl.querySelector("#student-surname").value,
      age: studentFormEl.querySelector("#student-age").value,
      phone: studentFormEl.querySelector("#student-phone").value,
      email: studentFormEl.querySelector("#student-email").value,
      itKnowledge: studentFormEl.querySelector("#student-it-knowledge").value,
      group: studentFormEl.elements.group.value,
      interests: interestValues,
    };

    localStorage.setItem("form-info", JSON.stringify(formInfo));
  });

  let parsedFormInfo = JSON.parse(localStorage.getItem("form-info"));

  if (parsedFormInfo) {
    studentFormEl.querySelector("#student-name").value = parsedFormInfo.name;
    studentFormEl.querySelector("#student-surname").value =
      parsedFormInfo.surname;
    studentFormEl.querySelector("#student-age").value = parsedFormInfo.age;
    studentFormEl.querySelector("#student-phone").value = parsedFormInfo.phone;
    studentFormEl.querySelector("#student-email").value = parsedFormInfo.email;

    studentFormEl.querySelector("#student-it-knowledge").value =
      parsedFormInfo.itKnowledge;
    studentFormEl.elements.group.value = parsedFormInfo.group;

    parsedFormInfo.interests.map((interest) => {
      studentFormEl.querySelector(`input[value="${interest}"]`).checked = true;
    });
  }
}
storeFormDataInLocalStorage3();

itKnowledgeOutputReset();
