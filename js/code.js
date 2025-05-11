let currentPath = window.location.pathname;

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");

  if (currentPath.endsWith(linkPath)) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
// Active code

// JavaScript: Register Form Validation
// تسجيل المستخدم
let formRegister = document.getElementById("registerForm");
if (formRegister) {
  formRegister.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Reset error messages and input styles
    document
      .querySelectorAll(".error-message")
      .forEach((msg) => (msg.textContent = ""));
    document
      .querySelectorAll("input")
      .forEach((input) => input.classList.remove("error"));

    // Name validation
    const name = document.getElementById("registerUsername").value.trim();
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      document.getElementById("nameError").textContent =
        "Name must only contain letters.";
      document.getElementById("registerUsername").classList.add("error");
      valid = false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent =
        "Enter a valid email address.";
      document.getElementById("email").classList.add("error");
      valid = false;
    }

    // Password validation
    const password = document.getElementById("password").value.trim();
    if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters.";
      document.getElementById("password").classList.add("error");
      valid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById("conpassword").value.trim();
    if (password !== confirmPassword) {
      document.getElementById("conpasswordError").textContent =
        "Passwords do not match.";
      document.getElementById("conpassword").classList.add("error");
      valid = false;
    }

    // If all validations pass, save to sessionStorage
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

// Login form submission
let loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === username && u.password === password
    );

    if (user) {
      alert("Login successful!");
      window.location.href = "../index.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}
