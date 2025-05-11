let currentPath = document.location.pathname;
let navlikes = document.querySelectorAll(" .navbar .nav-link");
navlikes.forEach((link) => {
  let path = link.pathname;

  if (currentPath === path) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
// active link

let formRegister = document.getElementById("form-register");

if (formRegister) {
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = formRegister.name.value.trim(); // 
    let email = formRegister.email.value.trim();
    let password = formRegister.password.value;
    let compassword = formRegister.compassword.value;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let nameRegex = /^[a-zA-Z\s]+$/;

    // Clear previous error messages
    let errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((msg) => (msg.textContent = ""));

    let inputs = formRegister.querySelectorAll("input");
    inputs.forEach((input) => input.classList.remove("is-invalid"));

    let valid = true;

    if (!nameRegex.test(name)) {
      valid = false;
      formRegister.name.classList.add("is-invalid");
      formRegister.name.nextElementSibling.textContent = "Enter a valid name.";
    }

    if (!emailRegex.test(email)) {
      valid = false;
      formRegister.email.classList.add("is-invalid");
      formRegister.email.nextElementSibling.textContent =
        "Enter a valid email.";
    }

    if (password.length < 6) {
      valid = false;
      formRegister.password.classList.add("is-invalid");
      formRegister.password.nextElementSibling.textContent =
        "Password must be at least 6 characters.";
    }

    if (password !== compassword) {
      valid = false;
      formRegister.compassword.classList.add("is-invalid");
      formRegister.compassword.nextElementSibling.textContent =
        "Passwords do not match.";
    }

    if (valid) {
      let users = JSON.parse(sessionStorage.getItem("users")) || [];
      const user = { username: name, email: email, password: password };
      users.push(user);
      sessionStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      window.location.href = "./login.html";
    }
  });
}
// register
/* login  */

let formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = formLogin.email.value.trim();
    let password = formLogin.password.value;

    let users = JSON.parse(sessionStorage.getItem("users")) || [];

    let foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      alert("Login successful!");
      sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
      window.location.href = "../index.html"; 
    } else {
      alert("Invalid email or password!");
    }
  });
}
