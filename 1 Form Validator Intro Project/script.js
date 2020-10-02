const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

// Show input
function showError(element, errorMessage) {
  const formContainer = element.parentElement;
  formContainer.className = "form-container error";
  const small = formContainer.querySelector("small");
  small.innerText = errorMessage;
}

function showSuccess(element) {
  const formContainer = element.parentElement;
  formContainer.className = "form-container success";
}

// Check required

function firstUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkRequired(elementArray) {
  (elementArray || []).forEach((element) => {
    if (!element) return fasle;
    if (!element.value) {
      showError(element, `${firstUpper(element.id)} is required.`);
    } else {
      switch (element.id) {
        case "username":
          if (element.value.length >= 3 && element.value.length <= 20) showSuccess(element);

          if (!(element.value.length >= 3 && element.value.length <= 20)) {
            showError(element, `${firstUpper(element.id)} length must between 3-20 digits.`);
          }
          break;

        case "email":
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (emailRegex.test(element.value)) showSuccess(element);

          if (!emailRegex.test(element.value)) {
            showError(element, `${firstUpper(element.id)} format is error.`);
          }
          break;

        case "password":
          console.log("element.value.length => ", element.value.length >= 6);
              if (element.value.length >= 6) showSuccess(element);
              
          if (element.value.length < 6) {
            showError(element, `${firstUpper(element.id)} length must more than 6 digits.`);
          }
          break;

        case "password-confirm":
          if (passwordConfirm.value === password.value) showSuccess(passwordConfirm);

          if (passwordConfirm.value !== password.value) {
            showError(passwordConfirm, "Password and password confirm must the same.");
          }
          break;

        default:
          break;
      }
    }
  });
}

//  Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // way 2
  checkRequired([username, email, password, passwordConfirm]);

  // way 1
  //   if (!username.value) {
  //     showError(username, "Username is required.");
  //   } else {
  //     showSuccess(username);
  //   }

  //   if (!email.value) {
  //     showError(email, "Email is required.");
  //   } else {
  //     const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //     if (emailRegex.test(email.value)) showSuccess(email);

  //     if (!emailRegex.test(email.value)) {
  //       showError(email, "Email format is error.");
  //     }
  //   }

  //   if (!password.value) {
  //     showError(password, "Password is required.");
  //   } else {
  //     showSuccess(password);
  //   }

  //   if (!passwordConfirm.value) {
  //     showError(passwordConfirm, "Password Confirm is required.");
  //   } else {
  //     if (passwordConfirm.value === password.value) showSuccess(passwordConfirm);

  //     if (passwordConfirm.value !== password.value) {
  //       showError(
  //         passwordConfirm,
  //         "Password and password confirm must the same."
  //       );
  //     }
  //   }
});
