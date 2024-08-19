function validateForm() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (password != confirmPassword) {
        document.getElementById("passwordError").style.display = "block";
        return false;
    }
    return true;
}