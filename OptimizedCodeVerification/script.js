const inputs = document.querySelectorAll(".otp-inputs input");
const verifyBtn = document.getElementById("verifyBtn");

// Avance automatique et suppression fluide
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});


verifyBtn.addEventListener("click", () => {
  const otp = Array.from(inputs).map((i) => i.value).join("");
  if (otp.length < inputs.length) {
    alert("Please enter the complete 4-digit code.");
  } else {
    alert("OTP Verified Successfully ✅");
  }
});
