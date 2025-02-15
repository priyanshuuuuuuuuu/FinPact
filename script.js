document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("shg-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            shgName: document.getElementById("shg-name").value,
            leaderName: document.getElementById("leader-name").value,
            contactNumber: document.getElementById("contact-number").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            address: document.getElementById("address").value,
            pincode: document.getElementById("pincode").value,
            latitude: document.getElementById("latitude").textContent,
            longitude: document.getElementById("longitude").textContent,
            businessType: document.getElementById("business-type").value,
            membersCount: document.getElementById("members-count").value,
            bankAccount: document.getElementById("bank-account").value,
            ifsc: document.getElementById("ifsc").value
        };

        // Convert form data to query parameters
        const params = new URLSearchParams(formData);

        // Append query parameters to the Google Apps Script URL
        const url = `https://script.google.com/a/macros/iiitd.ac.in/s/AKfycbwbYnMjzVheGUE4fRJNCbnGUo1D1zXJcaC9gk9p3UolOOxuphWEYv3nCxzJgPeHhIJPoA/exec?${params.toString()}`;

        // Send GET request
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful!");
                form.reset();
            } else {
                alert("Registration failed: " + (data.error || "Unknown error"));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred: " + error.message);
        });
    });

    // Map initialization code (keep your existing map code here)
    let map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    let marker;

    function updateLocation(lat, lon) {
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;

        if (marker) {
            marker.setLatLng([lat, lon]);
        } else {
            marker = L.marker([lat, lon]).addTo(map);
        }
    }

    map.on("click", function (e) {
        updateLocation(e.latlng.lat, e.latlng.lng);
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            updateLocation(position.coords.latitude, position.coords.longitude);
            map.setView([position.coords.latitude, position.coords.longitude], 10);
        });
    }
});
fetch('navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar-placeholder').innerHTML = data);