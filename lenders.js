document.addEventListener("DOMContentLoaded", function () {
    // Retrieve existing registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    // Filter users who have chosen to lend
    const lenders = registrations.filter((user) => user.lendBorrow === "lend");

    // Get the lenders list container
    const lendersList = document.getElementById("lenders-list");

    if (lenders.length > 0) {
        // Display each lender's information
        lenders.forEach((lender) => {
            const lenderCard = document.createElement("div");
            lenderCard.classList.add("lender-card");
            lenderCard.innerHTML = `
                <h3>${lender.shgName}</h3>
                <p><strong>Leader’s Name:</strong> ${lender.leaderName}</p>
                <p><strong>Contact Number:</strong> ${lender.contactNumber}</p>
                <p><strong>Email:</strong> ${lender.email}</p>
                <p><strong>Business Type:</strong> ${lender.businessType}</p>
                <p><strong>Amount:</strong> ₹${lender.amount}</p>
                <button class="apply-button">Apply</button>
            `;
            lendersList.appendChild(lenderCard);
        });

        // Add event listeners to all Apply buttons
        const applyButtons = document.querySelectorAll(".apply-button");
        applyButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const selectedLender = lenders[index];
                alert(`Applied to ${selectedLender.shgName}`);
                // You can replace the alert with actual logic to handle the application
            });
        });
    } else {
        // Display a message if no lenders are found
        lendersList.innerHTML = "<p>No lenders found.</p>";
    }
});
