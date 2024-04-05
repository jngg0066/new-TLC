document.addEventListener('DOMContentLoaded', function () {
    fetch('https://9dxoesls5a.execute-api.ap-southeast-2.amazonaws.com/prod')
        .then(response => response.json())
        .then(data => {
            const parsedData = JSON.parse(data.body);
            const years = parsedData.map(entry => entry.Year);
            const arrivals = parsedData.map(entry => entry['Migrant arrivals']);
            const departures = parsedData.map(entry => entry['Migrant Departures']);
            const netMigration = parsedData.map(entry => entry['Net Overseas Migration']);

            Highcharts.chart('container1', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '',
                    style: {
                        fontSize: '22px', // Larger font size
                        fontFamily: 'Roboto', // Font family
                        color: '#' // Text color
                    }
                },
                xAxis: {
                    categories: years,
                    title: {
                        text: 'Year',
                        style: {
                            fontSize: '14px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '12px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Number of Migrants in Thousands',
                        style: {
                            fontSize: '14px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '12px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    }

                },
                series: [{
                    name: 'Migrant Arrivals',
                    data: arrivals,
                    style: {
                        fontSize: '12px', // Larger font size
                        fontFamily: 'Roboto', // Font family
                        color: '#' // Text color
                    }
                }, {
                    name: 'Migrant Departures',
                    data: departures,
                    style: {
                        fontSize: '12px', // Larger font size
                        fontFamily: 'Roboto', // Font family
                        color: '#' // Text color
                    }
                }, {
                    name: 'Net Overseas Migration',
                    data: netMigration,
                    style: {
                        fontSize: '12px', // Larger font size
                        fontFamily: 'Roboto', // Font family
                        color: '#' // Text color
                    }
                }],
                caption: {
                    text: '*Net overseas migration is calculated by the number of migrant arrivals minus the number of migrant departures.'
                }
            });
        });
});
