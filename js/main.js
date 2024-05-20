const passwordInput = document.querySelector("#passwordInput");
const copyButton = document.querySelector("#copyButton");
const toast = document.querySelector("#toast");
const togglePassword = document.querySelector("#togglePassword");

passwordInput.addEventListener("input", function () {
  const password = this.value;

  const strengthIndicator = document.querySelector(
    "#password-strength-indicator"
  );

  const strengthText = document.querySelector("#password-strength-text");

  const strengths = {
    0: "Muito fraca",
    1: "Fraca",
    2: "Moderada",
    3: "Forte",
    4: "Muito Forte",
  };

  let score = 0;

  if (password.length >= 8) score++;
  if (password.match(/[a-z]/)) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^a-zA-Z0-9]/)) score++;

  const width = (score / 4) * 100;

  strengthIndicator.style.width = `${width}%`;

  switch (score) {
    case 1:
      strengthIndicator.style.backgroundColor = "#e70b0b";
      break;
    case 2:
      strengthIndicator.style.backgroundColor = "#FFB74D";
      break;
    case 3:
      strengthIndicator.style.backgroundColor = "#FFF176";
      break;
    case 4:
      strengthIndicator.style.backgroundColor = "#81C784";
      break;
    default:
      strengthIndicator.style.backgroundColor = "transparent";
      break;
  }

  if (password.length > 0) {
    strengthText.innerHTML = `Força: ${strengths[score]}`;
  } else {
    strengthText.innerHTML = "";
  }
});

copyButton.addEventListener("click", function () {
  const password = passwordInput.value;

  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      Toastify({
        text: "Senha copiada!",
        duration: 3000,
        destinatio: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#fff",
          color: "#000",
          borderBottom: "4px solid #00ff00",
        },
        oncClick: function () {},
      }).showToast();
    });
  }
});

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.textContent = type === "password" ? "👁️" : "🙈";
});
