const submitBtn = document.getElementById("submitBtn");
const detailBox = document.getElementById("detailbox");

window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("addressData"));

  if (savedData) {
    savedData.forEach((entry) => {
      const data = createDataElement(entry);
      data.addEventListener("click", () => {
        deleteFromLocalStorage(entry);
        data.remove(); 
      });
      detailBox.appendChild(data);
    });
  }
});
submitBtn.addEventListener("click", function () {
  const nameInput = document.getElementById("Name");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");
  const contactNoInput = document.getElementById("contactno");
  const birthdayInput = document.getElementById("birthday");
  const codeInput = document.getElementById("code");
  const stateInput = document.getElementById("state");
  if (
    !nameInput.value ||
    !addressInput.value ||
    !emailInput.value ||
    !contactNoInput.value ||
    !birthdayInput.value ||
    !codeInput.value ||
    !stateInput.value
  ) {
    alert("All fields are mandatory");
    return;
  }

  //optional
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailInput.value)) {
    alert("Please enter a valid email address");
    return;
  }
  const contactRegex = /^\d+$/;
  if (!contactRegex.test(contactNoInput.value)) {
    alert("Please enter a valid contact number");
    return;
  }

  const entry = {
    name: nameInput.value,
    address: addressInput.value,
    email: emailInput.value,
    contact: contactNoInput.value,
    birthday: birthdayInput.value,
    code: codeInput.value,
    state: stateInput.value,
  };
  const data = createDataElement(entry);
  detailBox.appendChild(data);

  saveToLocalStorage(entry);

  nameInput.value = "";
  addressInput.value = "";
  emailInput.value = "";
  contactNoInput.value = "";
  birthdayInput.value = "";
  codeInput.value = "";
  stateInput.value = "";
});

function createDataElement(entry) {
  const data = document.createElement("div");

  for (const key in entry) {
    const paragraph = document.createElement("p");
    paragraph.textContent =
      key.charAt(0).toUpperCase() + key.slice(1) + ": " + entry[key];
    data.appendChild(paragraph);
  }
  return data;
}
function saveToLocalStorage(entry) {
  let savedData = JSON.parse(localStorage.getItem("addressData")) || [];
  savedData.push(entry);
  localStorage.setItem("addressData", JSON.stringify(savedData));
}
function deleteFromLocalStorage(entryToDelete) {
  let savedData = JSON.parse(localStorage.getItem("addressData")) || [];
  const updatedData = savedData.filter(
    (entry) => JSON.stringify(entry) !== JSON.stringify(entryToDelete)
  );
  localStorage.setItem("addressData", JSON.stringify(updatedData));
}