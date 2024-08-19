function openTab(tabName) {
    let i, tabContent;
    tabContent = document.getElementsByClassName("tab");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    let tab = document.getElementById(tabName);
    if (tab) {
        tab.style.display = "block";
    } else {
        console.error("Tab not found: " + tabName);
    }
    if (tabName === 'productTab') {
        fetch('../../db/productFeedback/report.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayProductFeedback(data);
            })
            .catch(error => console.error('Error fetching product feedback:', error));
    } else if (tabName === 'platformTab') {
        loadQuestions();
    }
}

function downloadPDF(tabName) {
    const element = document.getElementById(tabName);
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Feedback Report</title>');
    newWindow.document.write('<link rel="stylesheet" type="text/css" href="styles.css">');  // Include CSS if needed
    newWindow.document.write('<style>@media print { .no-print { display: none; } .feedback-item { border: 1px solid #ccc; padding: 10px; margin: 10px 0; } }</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(element.innerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}function displayProductFeedback(data) {
    let productTab = document.getElementById('productTab');
    productTab.innerHTML = `
        <h2>Product Feedback Report</h2>
        <button class="no-print" onclick="downloadPDF('productTab')">Download PDF</button>
    `;
    data.forEach(item => {
        let feedbackDetails = JSON.parse(item.feedback_details);
        productTab.innerHTML += `
            <div class="feedback-item">
                <h3>${item.product_name}</h3>
                <p><strong>Average Rating:</strong> ${item.average_rating || '0.00'}</p>
                <p><strong>Total Feedback Count:</strong> ${item.total_feedback_count}</p>
                <div class="feedback-details">
                    ${feedbackDetails.map(feedback => `
                        <div class="comment-card">
                            <p class="comment">${feedback.feedback_text}</p>
                            <p class="date">${feedback.user_name || 'Anonymous'}</p>
                            <p class="date">${feedback.created_at ? new Date(feedback.created_at).toLocaleString() : '0:00'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
}


function displayProductFeedback(data) {
    let productTab = document.getElementById('productTab');
    productTab.innerHTML = `
        <h2>Product Feedback Report</h2>
        <button class="no-print" onclick="downloadPDF('productTab')">Download PDF</button>
    `;
    data.forEach(item => {
        let feedbackDetails = JSON.parse(item.feedback_details);
        productTab.innerHTML += `
            <div class="feedback-item">
                <h3>${item.product_name}</h3>
                <p><strong>Average Rating:</strong> ${item.average_rating || '0.00'}</p>
                <p><strong>Total Feedback Count:</strong> ${item.total_feedback_count}</p>
                <div class="feedback-details">
                    ${feedbackDetails.map(feedback => `
                        <div class="comment-card">
                            <p class="comment">${feedback.feedback_text}</p>
                            <p class="date">${feedback.user_name || 'Anonymous'}</p>
                            <p class="date">${feedback.created_at ? new Date(feedback.created_at).toLocaleString() : '0:00'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
}



function loadQuestions() {
    fetch('../../db/questions/read.php')
        .then(response => response.json())
        .then(data => populateQuestionDropdown(data))
        .catch(error => console.error('Error fetching questions:', error));
}

function populateQuestionDropdown(questions) {
    let platformTab = document.getElementById('platformTab');
    platformTab.innerHTML = `
        <h2>Platform Feedback Report</h2>
        <select id="questionSelect" onchange="fetchPlatformFeedback()">
            <option value="">Select a question</option>
        </select>
        <button id="platformDownloadBtn" class="no-print" style="display:none;" onclick="downloadPDF('platformTab')">Download PDF</button>
        <div id="feedbackContainer"></div>
    `;
    let questionSelect = document.getElementById('questionSelect');
    questions.forEach(question => {
        let option = document.createElement('option');
        option.value = question.id;
        option.textContent = question.questionText;
        questionSelect.appendChild(option);
    });
}

function fetchPlatformFeedback() {
    let questionId = document.getElementById('questionSelect').value;
    let downloadBtn = document.getElementById('platformDownloadBtn');
    if (questionId) {
        downloadBtn.style.display = 'block';
        fetch(`../../db/websiteFeedback/report.php?questionId=${questionId}`)
            .then(response => response.json())
            .then(data => displayPlatformFeedback(data))
            .catch(error => console.error('Error fetching platform feedback:', error));
    } else {
        downloadBtn.style.display = 'none';
        document.getElementById('feedbackContainer').innerHTML = '';
    }
}

function displayPlatformFeedback(data) {
    let feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = '';
    data.forEach(item => {
        feedbackContainer.innerHTML += `
            <div class="feedback-item">
                <p class="name">Username: ${item.username}</p>
                <div class="box">
                <div class="comment-card">
                    <p class="comment">${item.answer}</p>
                    </div>
                    <p class="date">${item.created_at}</p>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    openTab('productTab');
});
