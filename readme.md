
# Feedback System

## Overview
The Feedback System is a web application designed to help businesses collect customer feedback and generate reports. This project is developed using HTML, CSS, JavaScript, and PHP, and is deployed on a WAMP server using Apache, PDO, and MySQL.

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
```
feedbacksystem.com/
├── db/
├── includes/
├── index.php
├── public/
├── src/
```

- `db/`: Contains the database scripts and configuration files.
- `includes/`: Contains PHP scripts for database connection and other reusable components.
- `index.php`: The main entry point of the application.
- `public/`: Contains publicly accessible files such as CSS, JavaScript, and images.
- `src/`: Contains the source code of the application.

## Technologies Used
- HTML
- CSS
- JavaScript
- PHP
- Apache
- PDO
- MySQL
- WAMP

## Setup Instructions
1. **Install WAMP Server:**
   Download and install the WAMP server from [WAMP Official Site](http://www.wampserver.com/en/).

2. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/feedbacksystem.com.git
   ```

3. **Setup Database:**
   - Open `phpMyAdmin` via the WAMP server.
   - Create a new database named `feedbacksystem`.
   - Import the SQL file located in the `db/` directory to set up the necessary tables.

4. **Configure Database Connection:**
   - Update the database connection settings in `includes/db.php` with your MySQL credentials.

5. **Start WAMP Server:**
   - Place the project folder (`feedbacksystem.com`) in the `www` directory of your WAMP server.
   - Start the WAMP server and navigate to `http://localhost/feedbacksystem.com` in your browser.

## Usage
1. **Home Page:**
   - The home page provides an overview of the feedback system and allows users to submit their feedback.

2. **Admin Dashboard:**
   - Admins can log in to view and manage feedback submissions.
   - Generate reports based on the feedback received.

## Demo

1. **Example Video:**
   - Watch the demo video below to see how the Feedback System works:

     https://github.com/ahadnawaz585/E-commerce-feedback-system/blob/main/public/Video/demo.mp4
  

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
