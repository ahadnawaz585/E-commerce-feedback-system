class QuestionManager {
    constructor() {
      this.departmentSelect = document.getElementById("departmentSelect");
      this.questionsTable = document.getElementById("questionsTable");
      this.questionsBody = document.getElementById("questionsBody");
      this.setupQuestionFormButton();
      this.fetchDepartments();
      this.setupEventListeners();
    }
  
    fetchDepartments() {
      fetch("../../db/departments/read.php")
        .then(response => response.json())
        .then(data => {
          this.populateDepartments(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    populateDepartments(departments) {
        const noneOption = document.createElement("option");
        noneOption.value = "";
        noneOption.textContent = "None";
        this.departmentSelect.appendChild(noneOption);
      departments.forEach(department => {
        const option = document.createElement("option");
        option.value = department.id;
        option.textContent = department.name;
        this.departmentSelect.appendChild(option);
      });
      // Add 'None' option
    }
  
    setupEventListeners() {
      this.departmentSelect.addEventListener("change", () => {
        const selectedDepartment = this.departmentSelect.value;
        if (selectedDepartment === "") {
          this.hideTable();
        } else {
          this.fetchQuestions(selectedDepartment);
        }
      });
  
      this.questionsBody.addEventListener("click", event => {
        if (event.target.classList.contains("deleteBtn")) {
          const id = event.target.dataset.id;
          this.deleteQuestion(id);
        }
      });
    }
  
    fetchQuestions(departmentId) {
      const url = departmentId ? `../../db/surveyQuestion/read.php?departmentId=${departmentId}` : `../../db/surveyQuestion/read.php`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            this.displayQuestions(data);
            this.showTable();
          } else {
            this.hideTable();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    displayQuestions(questions) {
      this.questionsBody.innerHTML = "";
      questions.forEach(question => {
        this.addRowToTable(question);
      });
    }
  
    addRowToTable(question) {
      const row = this.questionsBody.insertRow();
      row.innerHTML = `<td>${question.id}</td><td>${question.questionText}</td><td><button class="deleteBtn" data-id="${question.id}">Delete</button></td>`;
    }
  
    deleteQuestion(id) {
      fetch("../../db/surveyQuestion/delete.php", {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(result => {
          console.log(result);
          this.fetchQuestions(this.departmentSelect.value);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    showTable() {
      this.questionsTable.style.display = "table";
    }
  
    hideTable() {
      this.questionsTable.style.display = "none";
    }

    setupQuestionFormButton() {
        const questionFormButton = document.getElementById("questionFormButton");
        questionFormButton.addEventListener("click", () => {
            window.location.href = "https://feedbacksystem.com/?page=questionForm";
        });
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    new QuestionManager();
  });
  