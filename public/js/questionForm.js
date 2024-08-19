document.addEventListener('DOMContentLoaded', function () {
    const addQuestionForm = document.getElementById('addQuestionForm');
    const questionsBody = document.getElementById('questionsBody');
    const questionTextInput = document.getElementById('questionText');
    const submitButton = addQuestionForm.querySelector('button[type="submit"]');

    function fetchQuestions() {
        fetch('../../db/questions/read.php')
            .then(response => response.json())
            .then(questions => {
                questionsBody.innerHTML = '';
                questions.forEach(question => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${question.id}</td>
                        <td>${question.questionText}</td>
                        <td><button class="deleteBtn" data-id="${question.id}">Delete</button></td>
                    `;
                    questionsBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    function toggleSubmitButton() {
        submitButton.disabled = questionTextInput.value.trim() === '';
    }

    addQuestionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const questionText = questionTextInput.value;

        fetch('../../db/questions/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questionText })
        })
        .then(response => {
            if (response.ok) {
                fetchQuestions();
                questionTextInput.value = '';
                toggleSubmitButton();
            } else {
                throw new Error('Failed to add question');
            }
        })
        .catch(error => console.error('Error adding question:', error));
    });

    questionsBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteBtn')) {
            const id = event.target.getAttribute('data-id');
            fetch(`../../db/questions/delete.php?id=${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    fetchQuestions();
                } else {
                    throw new Error('Failed to delete question');
                }
            })
            .catch(error => console.error('Error deleting question:', error));
        }
    });

    questionTextInput.addEventListener('input', toggleSubmitButton);

    fetchQuestions();
    toggleSubmitButton();
});
