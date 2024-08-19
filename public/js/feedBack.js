class FeedbackSystem {
    constructor() {
        this.departmentSelect = document.getElementById("departmentSelect");
        this.questionForm = document.getElementById("questionForm");
        this.messageContainer = document.getElementById("messageContainer"); // Get the message container
        this.feedbackTable = document.getElementById("feedbackTable").getElementsByTagName('tbody')[0];
        this.submitButton = document.getElementById("submitButton");
        this.customerIDInput = document.getElementById("customerID");
        this.departmentIDInput = document.getElementById("departmentID");
        this.fetchDepartments();
        this.addChangeEvent();
        this.addCheckboxChangeListeners();
        this.addFormSubmitListener();
        const tokenCookie = this.getCookie('token');
        if (tokenCookie) {
            this.showSnackbar('You are all set to work!');
        }
    }

    fetchDepartments() {
        const userID = this.getUserIdFromToken();
        fetch(`../../db/departments/userDepartment.php?userID=${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    this.showNoDepartmentsMessage();
                } else {
                    this.populateDepartments(data);
                }
            });
    }

    showNoDepartmentsMessage() {
        const noDepartmentsMessage = document.createElement('div');
        noDepartmentsMessage.className = 'no-departments-message';
        noDepartmentsMessage.textContent = 'Your feedback is already submitted. Thank you for your feedback!';
        document.body.appendChild(noDepartmentsMessage);
        this.messageContainer.appendChild(noDepartmentsMessage);
    }

    populateDepartments(data) {
        var noneOption = document.createElement("option");
        noneOption.text = "None";
        noneOption.value = "";
        this.departmentSelect.appendChild(noneOption);
        data.forEach(department => {
            var option = document.createElement("option");
            option.text = department.name;
            option.value = department.id;
            this.departmentSelect.appendChild(option);
        });
    }

    addChangeEvent() {
        this.departmentSelect.addEventListener("change", () => {
            this.handleDepartmentChange();
        });
    }

    handleDepartmentChange() {
        var selectedDepartmentId = this.departmentSelect.value;
        if (selectedDepartmentId === "") {
            this.questionForm.style.display = "none";
        } else {
            fetch(`../../db/surveyQuestion/read.php?departmentId=${selectedDepartmentId}`)
                .then(response => response.json())
                .then(data => {
                    this.populateQuestions(data);
                });
        }
    }

    populateQuestions(data) {

        if (!this.feedbackTable) {
            // If feedbackTable is null, return early
            return;
        }
        this.feedbackTable.innerHTML = "";
        data.forEach(question => {
            var row = document.createElement("tr");
            var questionCell = document.createElement("td");
            questionCell.textContent = question.questionText;
            row.appendChild(questionCell);
            var radios = ["Agreed", "Very Agreed", "Neutral", "Not Agreed", "Strongly Disagree"];
            radios.forEach(radioLabel => {
                var radioCell = document.createElement("td");
                var radio = document.createElement("input");
                radio.type = "checkbox";
                radio.name = "question_" + question.id;
                radio.value = radioLabel;
                radioCell.appendChild(radio);
                row.appendChild(radioCell);
            });
            this.feedbackTable.appendChild(row);
        });
        this.questionForm.style.display = "block";
        this.addCheckboxChangeListeners();
    }

    addCheckboxChangeListeners() {
        const allRows = this.feedbackTable.getElementsByTagName('tr');
        for (let i = 0; i < allRows.length; i++) {
            const checkboxes = allRows[i].querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    this.checkAllQuestionsAnswered();
                });
            });
        }
    }


    checkAllQuestionsAnswered() {
        const allRows = this.feedbackTable.getElementsByTagName('tr');
        let allQuestionsAnswered = true;
        for (let i = 0; i < allRows.length; i++) {
            const checkboxes = allRows[i].querySelectorAll('input[type="checkbox"]');
            let questionAnswered = false;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    questionAnswered = true;
                }
            });
            if (!questionAnswered) {
                allQuestionsAnswered = false;
                break;
            }
        }
        this.submitButton.disabled = !allQuestionsAnswered;
    }

    addFormSubmitListener() {
        this.questionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitResponse();
        });
    }

    getUserIdFromToken() {
        const token = this.getCookie('token');
        const decodedToken = decodeURIComponent(token);
        const decodedTokenFinal = atob(decodedToken);
        const tokenParts = decodedTokenFinal.split(':');
        const userId = tokenParts[0];
        return userId;
    }

    submitResponse() {
        const customerID = this.getUserIdFromToken();
        const departmentID = this.departmentSelect.value;
        const responses = [];

        const allRows = this.feedbackTable.getElementsByTagName('tr');
        for (let i = 0; i < allRows.length; i++) {
            const checkboxes = allRows[i].querySelectorAll('input[type="checkbox"]');
            const questionID = checkboxes[0].name.split("_")[1];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    responses.push({
                        customerID: customerID,
                        departmentID: departmentID,
                        questionID: questionID,
                        response: checkbox.value
                    });
                }
            });
        }



        fetch("../../db/surveyResponse/create.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responses)
        })
            .then(response => response.text())
            .then(data => {
                this.showSuccessMessage();
                // Reload the page after a short delay
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Response submitted successfully.';
        this.messageContainer.appendChild(successMessage); // Append message to message container
        setTimeout(() => {
            successMessage.remove();
        }, 2000);
    }


    getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    showSnackbar(message) {
        const snackbar = document.createElement('div');
        snackbar.className = 'snackbar';
        snackbar.textContent = message;
        document.body.appendChild(snackbar);
        setTimeout(() => {
            snackbar.remove();
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const feedbackSystem = new FeedbackSystem();
});
