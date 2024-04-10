document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map without adding any markers
    initializeMap();

    // Event listener for tab selection
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            var tabId = this.dataset.tab;
            // Reset dropdown selection based on the clicked tab
            var dropdownId = `dropdownMenu${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`;
            resetDropdown(dropdownId);
            fetchAllSchoolsData(tabId);

            // Show the corresponding dropdown
            showDropdown(tabId.replace('tab', 'dropdownTab'));

            // Toggle active class on tabs
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Event listener for dropdown change
    document.getElementById('dropdownMenuTab1').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab1');
    });

    document.getElementById('dropdownMenuTab2').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab2');
    });

    document.getElementById('dropdownMenuTab3').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab3');
    });

    document.getElementById('dropdownMenuTab4').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab4');
    });
});

function showContent(tabId) {
    // Hide all content divs
    document.querySelectorAll('.text-container > div').forEach(div => {
        div.style.display = 'none';
    });

    // Show the content div corresponding to the selected tab
    document.getElementById(`${tabId}Content`).style.display = 'block';

    // Add active class to text-container
    document.querySelector('.text-container').classList.add('active');

    // Adjust map view based on the selected tab
    switch(tabId) {
        case 'tab1':
            map.setView([-37.88329574476572, 145.1408065741998], 11);
            break;
        case 'tab2':
            map.setView([-37.899633527570316, 144.66262902597825], 11);
            break;
        case 'tab3':
            map.setView([-38.07673551021945, 145.30144421386998], 11);
            break;
        case 'tab4':
            map.setView([-37.73767814795938, 144.80568069116845], 11);
            break;
        default:
            // Default view for Victoria, Australia
            map.setView([-37.8136, 144.9631], 10);
    }
}

function showDropdown(dropdownId) {
    // Hide all dropdowns
    document.querySelectorAll('.suburb-dropdown').forEach(dropdown => dropdown.style.display = 'none');
    // Show the specified dropdown
    document.getElementById(dropdownId).style.display = 'block';
}

function resetDropdown(dropdownId) {
    // Reset the dropdown selection
    document.getElementById(dropdownId).selectedIndex = 0;
}

function fetchAllSchoolsData(tabId) {
    // Clear previous markers from the map
    clearMarkers();

    let apiUrl;
    // Determine API endpoint based on the tab selected
    switch(tabId) {
        case 'tab1':
            apiUrl = 'https://1qktndqm8l.execute-api.ap-southeast-2.amazonaws.com/prod2';
            break;
        case 'tab2':
            apiUrl = 'https://kbfoclo7dc.execute-api.ap-southeast-2.amazonaws.com/prod3';
            break;
        case 'tab3':
            apiUrl = 'https://uwvl29qlxg.execute-api.ap-southeast-2.amazonaws.com/prod5';
            break;
        case 'tab4':
            apiUrl = 'https://c3nn2v55vb.execute-api.ap-southeast-2.amazonaws.com/prod5';
            break;
        default:
            apiUrl = '';
    }

    if (apiUrl === '') {
        console.error('Invalid API URL');
        return;
    }

    // Fetch schools data from the determined API endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const schools = JSON.parse(data.body).map(school => ({
                Education_Sector: school.Sector,
                School_Name: school.Name,
                School_Address: school.Address,
                Suburb: school.Town,
                School_Phone: school.Phone,
                LGA_Name: school.LGA,
                Longitude: school.Longitude,
                Latitude: school.Latitude
            }));

            // Add markers for all schools
            schools.forEach(school => addMarker(school));
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchSchoolsData(selectedSuburb, tabId) {
    if (!selectedSuburb || selectedSuburb === 'Show All') {
        // If no suburb is selected or 'Show All' is selected, fetch all schools data
        fetchAllSchoolsData(tabId);
        return;
    }

    // Clear previous markers from the map
    clearMarkers();

    let apiUrl;
    // Determine API endpoint based on the tab selected
    switch(tabId) {
        case 'tab1':
            apiUrl = 'https://1qktndqm8l.execute-api.ap-southeast-2.amazonaws.com/prod2';
            break;
        case 'tab2':
            apiUrl = 'https://kbfoclo7dc.execute-api.ap-southeast-2.amazonaws.com/prod3';
            break;
        case 'tab3':
            apiUrl = 'https://uwvl29qlxg.execute-api.ap-southeast-2.amazonaws.com/prod5';
            break;
        case 'tab4':
            apiUrl = 'https://c3nn2v55vb.execute-api.ap-southeast-2.amazonaws.com/prod5';
            break;
        default:
            apiUrl = '';
    }

    if (apiUrl === '') {
        console.error('Invalid API URL');
        return;
    }

    // Fetch schools data from the determined API endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const schools = JSON.parse(data.body).map(school => ({
                Education_Sector: school.Sector,
                School_Name: school.Name,
                School_Address: school.Address,
                Suburb: school.Town,
                School_Phone: school.Phone,
                LGA_Name: school.LGA,
                Longitude: school.Longitude,
                Latitude: school.Latitude
            }));

            // Filter schools based on selected suburb
            const filteredData = schools.filter(school => school.Suburb === selectedSuburb);

            // Add markers for the filtered data
            filteredData.forEach(school => addMarker(school));
        })
        .catch(error => console.error('Error fetching data:', error));
}


var map; // Declare map variable globally
var markers = []; // Array to store markers

function initializeMap() {
    // Initialize Leaflet map
    map = L.map('map').setView([-37.8136, 144.9631], 10); // Default view for Victoria, Australia

    // Add Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Â© OpenStreetMap contributors'
    }).addTo(map);
}

function addMarker(school) {
    var marker = L.marker([school.Latitude, school.Longitude]);
    var popupContent = `
        <b>Name:</b> ${school.School_Name}<br>
        <b>Education Sector:</b> ${school.Education_Sector}<br>
        <b>Address:</b> ${school.School_Address}<br>
        <b>Suburb:</b> ${school.Suburb}<br>
        <b>Phone:</b> ${school.School_Phone}<br>
        <b>LGA Name:</b> ${school.LGA_Name}
    `;
    marker.bindPopup(popupContent);
    marker.addTo(map); // Add marker to the map
    markers.push(marker); // Push marker to the array
}

function clearMarkers() {
    // Remove all markers from the map
    markers.forEach(marker => marker.removeFrom(map));
    // Clear markers array
    markers = [];
}
