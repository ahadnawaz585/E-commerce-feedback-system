<?php
function renderContact()
{
    ?>
    <header>
        <h1>Contact Us</h1>
    </header>
    <div class="contact-container">

        <section class="main-content">
            <h2>Get in Touch with Us</h2>
            <p>If you have any questions, feedback, or need assistance, please feel free to reach out to us. We are here to help!</p>
            
            <div class="contact-form">
                <h3>Contact Form</h3>
                <form action="#" method="post">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit">Send Message</button>
                    </div>
                </form>
            </div>
            
            <div class="contact-info">
                <h3>Our Contact Information</h3>
                <ul>
                    <li>Phone: 123-456-7890</li>
                    <li>Email: support@ourwebsite.com</li>
                    <li>Address: 123 Main Street, Anytown, USA</li>
                </ul>
            </div>
        </section>

    </div>
    <?php
}
?>
