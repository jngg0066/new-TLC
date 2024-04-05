document.addEventListener('DOMContentLoaded', function () {
    fetch('https://4fpecrwuyj.execute-api.ap-southeast-2.amazonaws.com/prod1')
        .then(response => response.json())
        .then(data => {
            const parsedData = JSON.parse(data.body);
            const countries = parsedData.map(entry => entry.Country);
            const population2001 = parsedData.map(entry => entry["2001('000)"]);
            const population2011 = parsedData.map(entry => entry["2011('000)"]);
            const population2021 = parsedData.map(entry => entry["2021('000)"]);

            Highcharts.chart('container2', {
                chart: {
                    type: 'column'
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
                    categories: countries,
                    title: {
                        text: 'Country',
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
                        text: 'Population in Thousands',
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
                plotOptions: {
                    column: {
                        borderRadius: 5, // Rounded corners for columns
                        borderWidth: 0, // No border
                        colorByPoint: false, // Use different colors for each column
                        colors: ['#4572A7', '#AA4643', '#89A54E'] // Custom colors for columns
                    }
                },
                series: [
                    {
                        name: '2001',
                        data: population2001,
                        style: {
                            fontSize: '14px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    },
                    {
                        name: '2011',
                        data: population2011,
                        style: {
                            fontSize: '14px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    },
                    {
                        name: '2021',
                        data: population2021,
                        style: {
                            fontSize: '14px', // Larger font size
                            fontFamily: 'Roboto', // Font family
                            color: '#' // Text color
                        }
                    }
                ]
            });
        });
});
