<?php
function renderQuestionForm()
{
    ?>
  <div class="container">
        <h1>Add Question</h1>
        <form id="addQuestionForm">
            <input type="text" id="questionText" placeholder="Enter Question Text">
            <button type="submit">Add Question</button>
        </form>
        
        <h1>Questions</h1>
        <table id="questionsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Question Text</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="questionsBody">
                <!-- Questions will be displayed here -->
            </tbody>
        </table>
    </div>
    <?php
}
?>
