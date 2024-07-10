// Function to fetch and update glacier melt rate
document.addEventListener('DOMContentLoaded', () => {
    const glacierMeltingRateElement = document.getElementById('glacier-melting-rate');

    // Function to fetch glacier melting data
    const fetchGlacierMeltingData = () => {
        // Simulated data for demonstration (replace with actual fetch call)
        const newMeltingRate = (Math.random() * 100).toFixed(2); // Random value for demonstration

        // Current melting rate (extract from text content)
        let currentMeltingRate = parseFloat(glacierMeltingRateElement.textContent.split(':')[1].trim());

        // Animate the transition from current to new melting rate
        animateValue(glacierMeltingRateElement, currentMeltingRate, newMeltingRate, 1000); // Animation duration: 1000ms

        // Update the text content with the new melting rate
        glacierMeltingRateElement.textContent = `Current Melting Rate: ${newMeltingRate} cubic meters/second`;
    };

    // Function to animate value transition
    const animateValue = (element, start, end, duration) => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = start + progress * (end - start);
            element.textContent = `Current Melting Rate: ${value.toFixed(2)} cubic meters/second`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    // Fetch data initially
    fetchGlacierMeltingData();

    // Fetch data every second (for demo purposes, replace with actual interval for API call)
    setInterval(fetchGlacierMeltingData, 5000); // Fetch data every 5 seconds
});

// Rest of your existing JavaScript code...

// Login modal functionality
const modal = document.getElementById('modal');
const loginBtn = document.getElementById('login-btn');
const closeBtn = document.getElementsByClassName('close')[0];

loginBtn.onclick = function() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetch('/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `Provide an eco-friendly travel guide and itinerary for ${query}` })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('tips-result').innerText = data.response;
        })
        .catch(error => {
            console.error('Error fetching travel tips:', error);
        });
    } else {
        document.getElementById('tips-result').innerText = 'Please enter a search query.';
    }
});
