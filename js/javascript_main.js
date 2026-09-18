
function toggleLogin() {
  document
    .getElementById("loginDropdown")
    .classList.toggle("active");
}

document.addEventListener("click", function(event) {

    const dropdown = document.getElementById("loginDropdown");
    const loginLink = document.querySelector(".login-link");

    if (
        !dropdown.contains(event.target) &&
        !loginLink.contains(event.target)
    ) {
        dropdown.classList.remove("active");
    }
});