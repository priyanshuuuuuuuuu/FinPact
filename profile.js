document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the logged-in user's contact number
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        // Redirect to the login page if no user is logged in
        alert("Please log in to view your profile.");
        window.location.href = "login.html";
        return;
    }

    // Retrieve existing registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    // Find the logged-in user's data
    const user = registrations.find((user) => user.contactNumber === loggedInUser);

    if (user) {
        // Helper function to safely set text content
        const setElementText = (id, text) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        };

        // Display user information
        setElementText("shg-name", user.shgName);
        setElementText("leader-name", user.leaderName);
        setElementText("contact-number", user.contactNumber);
        setElementText("email", user.email);
        setElementText("business-type", user.businessType);
        setElementText("members-count", user.membersCount);
        setElementText("lend-borrow-status", user.lendBorrow || "None");
        setElementText("lend-borrow-amount", user.amount !== -1 ? `₹${user.amount}` : "Not specified");

        // Print all relevant user information to the console
        console.log("User Profile Information:");
        console.log("SHG Name:", user.shgName);
        console.log("Leader’s Name:", user.leaderName);
        console.log("Contact Number:", user.contactNumber);
        console.log("Email:", user.email);
        console.log("Business Type:", user.businessType);
        console.log("Number of Members:", user.membersCount);
        console.log("Lend/Borrow Status:", user.lendBorrow || "None");
        console.log("Amount:", user.amount !== -1 ? `₹${user.amount}` : "Not specified");
        console.log("Latitude:", user.latitude);
        console.log("Longitude:", user.longitude);
        console.log("Registration ID:", user.registrationId);
    } else {
        alert("User data not found. Please register.");
        window.location.href = "signup.html";
    }

    // Move the form handling code here, after the DOM is loaded
    const lendBorrowForm = document.getElementById("lend-borrow-form");
    
    if (!lendBorrowForm) {
        console.error("Form element not found!");
        return;
    }

    console.log("Form element found:", lendBorrowForm);

    lendBorrowForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted!");

        // Collect form data
        const action = document.getElementById("lend-borrow").value;
        const amount = document.getElementById("amount").value;

        console.log("Selected action:", action);
        console.log("Entered amount:", amount);

        // Update user's lend/borrow information
        user.lendBorrow = action;
        user.amount = amount !== "" ? parseFloat(amount) : -1;

        // Save updated registrations array to localStorage
        localStorage.setItem("registrations", JSON.stringify(registrations));

        alert("Lend/Borrow information saved successfully!");

        console.log("Updated user data:", user);
    });

    // Prefill lend/borrow form if data exists
    if (user.lendBorrow) {
        document.getElementById("lend-borrow").value = user.lendBorrow;
    }
    if (user.amount !== -1) {
        document.getElementById("amount").value = user.amount;
    }
});