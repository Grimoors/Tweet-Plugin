// check if login cookie exists
if (document.cookie.includes("loggedIn=true")) {
    // show the normal index.html
    window.location.href = "index.html";
  } else {
    // show the login page
    const loginPage = document.createElement("div");
    loginPage.innerHTML = `
      <h1>Welcome to Twitter Login Page</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <button type="submit">Login</button>
      </form>
    `;
    document.body.appendChild(loginPage);
  
    // handle form submit
    const form = loginPage.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = form.elements.username.value;
      const password = form.elements.password.value;
      // check if username and password are correct
      if (username === "twitteruser" && password === "twitterpassword") {
        // set login cookie
        document.cookie = "loggedIn=true";
        // redirect to index.html
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }