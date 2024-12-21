<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phoneNumber = $_POST['phoneNumber'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $zip = $_POST['zip'];

    // Process the form data (e.g., send an email or save to a database)
    mail("your-email@example.com", "New Form Submission", "First Name: $firstName\nLast Name: $lastName\nPhone: $phoneNumber\nEmail: $email\nAddress: $address\nZip: $zip");

    echo "Thank you for your submission!";
}
?>
