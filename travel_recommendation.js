// Function to fetch data from API based on search query
async function searchApi(query) {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();

        // Process search
        query = query.toLowerCase();
        const results = [];

        // Check if the query matches one of the specific words or countries
        if (query === 'beach' || query === 'beaches') {
            results.push(...data.beaches);
        } else if (query === 'temple' || query === 'temples') {
            results.push(...data.temples);
        } else if (query === 'australia' || query === 'japan' || query === 'brazil') {
            const country = data.countries.find(country => country.name.toLowerCase() === query);
            if (country) {
                country.cities.forEach(city => {
                    results.push(city);
                });
            }
        } else {
            console.log('Invalid search term. Please enter one of the following: beach, temple, Australia, Japan, Brazil');
        }

        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to handle search input
function handleSearchButtonClick() {
    const query = document.getElementById('searchBar').value.trim(); // Trim whitespace from input
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous results
    searchApi(query)
        .then(results => {
            console.log(results);
            // Update the UI with search results
            results.forEach(result => {
                const resultBox = document.createElement('div');
                resultBox.classList.add('result-box');
                resultBox.innerHTML = `
                    <img src="${result.imageUrl}" alt="${result.name}">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                `;
                searchResultsContainer.appendChild(resultBox);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to handle clearing search results and input field
function clearSearchResults() {
    const searchResultsContainer = document.getElementById('searchResults');
    const searchBar = document.getElementById('searchBar');
    
    searchResultsContainer.innerHTML = ''; // Clear the container
    searchBar.value = ''; // Clear the input field
}

// Attach event listeners to the search and clear buttons
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearchButtonClick);

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', clearSearchResults);
});
