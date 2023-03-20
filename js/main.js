document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
      loginUser(username, password);
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
      signupUser(username, password);
    });
  }
});

async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/.netlify/functions/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      window.location.href = "dashboard.html";
    } else {
      showError("login-error", "Invalid email or password.");
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    showError("login-error", "An error occurred. Please try again.");
  }
}

async function signupUser(username, password) {
  try {
    const response = await fetch("/.netlify/functions/auth", {
      method: "POST",
      body: JSON.stringify({ action: "signup", username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      alert("Signed up successfully!");
      window.location.href = "login.html"; // Redirect to the login page
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error in signupUser:", error);
    alert(`Error: ${error.message}`);
  }
}
