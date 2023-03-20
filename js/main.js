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

async function loginUser(username, password) {
  try {
    const response = await fetch("/.netlify/functions/auth", {
      method: "POST",
      body: JSON.stringify({ action: "login", username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      alert("Logged in successfully!");
      window.location.href = "dashboard.html"; // Redirect to the dashboard page
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    alert(`Error: ${error.message}`);
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
