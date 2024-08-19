document.addEventListener('DOMContentLoaded', function() {
    class FeedbackForm {
        constructor() {
            this.questionsContainer = document.getElementById('questions-container');
            this.submitBtn = document.getElementById('submitBtn');
            this.messageContainer = document.getElementById('message-container');
            this.formContainer = document.getElementById('form-container');
            this.inputs = [];
            this.userId = this.getUserIdFromToken();
            this.init();
        }

        getUserIdFromToken() {
            const token = this.getCookie('token');
            if (!token) {
                this.showMessage('User token not found. Please log in.', 'error');
                return null;
            }
            const decodedToken = decodeURIComponent(token);
            const decodedTokenFinal = atob(decodedToken);
            const tokenParts = decodedTokenFinal.split(':');
            return tokenParts[0];
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

        async fetchQuestions() {
            try {
                const response = await fetch(`../../db/websiteFeedback/check.php?userId=${this.userId}`);
                const isFeedbackSubmitted = await response.json();
                if (!isFeedbackSubmitted) {
                    this.showMessage('Feedback has already been submitted.\nThanks for your feedback', 'success');
                    this.formContainer.style.display = 'none';
                } else {
                    console.log("heelo ")
                    const questionsResponse = await fetch('../../db/questions/read.php');
                    const questions = await questionsResponse.json();
                    this.renderQuestions(questions);
                }
            } catch (error) {
                this.showMessage('Error fetching questions.', 'error');
                console.error('Error fetching questions:', error);
            }
        }

        renderQuestions(questions) {
            if (!questions || questions.length === 0) {
                this.showMessage('No questions available.', 'error');
                return;
            }

            questions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `
                    <p>${question.questionText}</p>
                    <input type="text" id="answer-${question.id}" placeholder="Enter your answer">
                `;
                this.questionsContainer.appendChild(questionDiv);
                this.inputs.push(document.getElementById(`answer-${question.id}`));
            });

            this.inputs.forEach(input => {
                input.addEventListener('input', this.handleInputChange.bind(this));
            });
        }

        handleInputChange() {
            const allAnswered = this.inputs.every(input => input.value.trim() !== '');
            this.submitBtn.disabled = !allAnswered;
        }

        async onSubmit() {
            this.messageContainer.innerHTML = '';
            const allAnswered = this.inputs.every(input => input.value.trim() !== '');
            if (!allAnswered) {
                this.showMessage('Please answer all questions before submitting.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('userId', parseInt(this.userId));

            this.inputs.forEach(input => {
                const questionId = input.id.split('-')[1];
                const answerText = input.value;
                formData.append('questionId[]', questionId);
                formData.append('answer[]', answerText);
            });

            try {
                const response = await fetch('../../db/websiteFeedback/create.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    this.showMessage('Feedback submitted successfully!', 'success');
                    this.formContainer.style.display = 'none';
                    window.location.href = "http://feedbacksystem.com/?page=success";
                } else {
                    this.showMessage('Failed to submit feedback. Please try again later.', 'error');
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                this.showMessage('An error occurred while submitting feedback. Please try again later.', 'error');
            }
        }

        showMessage(message, type) {
            this.messageContainer.innerHTML = message;
            this.messageContainer.style.color = type === 'error' ? 'red' : 'green';
        }

        init() {
            if (!this.questionsContainer) {
                console.error('Questions container not found.');
                return;
            }
            if (!this.submitBtn) {
                console.error('Submit button not found.');
                return;
            }

            if (this.userId) {
                this.fetchQuestions();
                this.submitBtn.addEventListener('click', this.onSubmit.bind(this));
                this.submitBtn.disabled = true;
            } else {
                this.showMessage('User ID not found in token.', 'error');
            }
        }
    }

    new FeedbackForm();
});
