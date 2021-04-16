







var lists = [];
var chart = null;
function tracker() { 
   
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(data => {
        lists = data.Countries
        var x = document.getElementById("summary");

        var option = document.createElement("option");
        option.text = "Global";
        option.value = lists.length; 
        x.add(option);
        lists[lists.length]= data.Global

        for (var i = 0; i < lists.length-1; i++) {
            var option = document.createElement("option");
            option.text = lists[i].Country;
            option.value = i; 
            x.add(option);
        }

        document.getElementById("gname").innerHTML = "GLOBAL"
        document.getElementById("gcase").innerHTML = "Total cases: " + data.Global.TotalConfirmed
        document.getElementById("gdeath").innerHTML = "Total death: " + data.Global.TotalDeaths
        document.getElementById("grecover").innerHTML = "Total recovered: " + data.Global.TotalRecovered
    
    
    })
    countryChart()
}

function animateSelect() {
    var animate = document.getElementById("animateSelect");
    var content = animate.innerHTML;
    animate.innerHTML = content;    
}



function countryChart(code) {
    
      
    //fetch('https://covid19-api.org/api/timeline/' + (code || ''), {
    
            var data = timeLine
            var cases = []
            var death = []
            var recovered = []
    
            for(i = data.length-1; i >= 0; i--) {
                cases.push({
                    x: new Date(data[i].last_update),
                    y: data[i].cases || data[i].total_cases
                })  
    
                death.push({
                    x: new Date(data[i].last_update),
                    y: data[i].deaths || data[i].total_deaths
                }) 
    
                recovered.push({
                    x: new Date(data[i].last_update),
                    y: data[i].recovered || data[i].total_recovered
                }) 
            }
    
            if (chart == null) {
                refreshChart(cases, death,recovered)
            } else {
                chart.data.datasets[0].data = cases;
                chart.data.datasets[1].data = death;
                chart.data.datasets[2].data = recovered;
                chart.update();
            }
        

    return 
    fetch('https://covid19-api.org/api/timeline/')
    .then(response => response.json())
    .then(data => {
        data = timeLine
        var cases = []
        var death = []
        var recovered = []

        for(i = data.length-1; i >= 0; i--) {
            cases.push({
                x: new Date(data[i].last_update),
                y: data[i].cases || data[i].total_cases
            })  

            death.push({
                x: new Date(data[i].last_update),
                y: data[i].deaths || data[i].total_deaths
            }) 

            recovered.push({
                x: new Date(data[i].last_update),
                y: data[i].recovered || data[i].total_recovered
            }) 
        }

        if (chart == null) {
            refreshChart(cases, death,recovered)
        } else {
            chart.data.datasets[0].data = cases;
            chart.data.datasets[1].data = death;
            chart.data.datasets[2].data = recovered;
            chart.update();
        }
    })
}

function onSelect() {
    var index = document.getElementById("summary").value

    document.getElementById("gname").innerHTML = lists[index].Country || "GLOBAL"
    document.getElementById("gcase").innerHTML = "Total cases: " + lists[index].TotalConfirmed
    document.getElementById("gdeath").innerHTML = "Total death: " +lists[index].TotalDeaths
    document.getElementById("grecover").innerHTML = "Total recovered: " +lists[index].TotalRecovered
    animateSelect();

    countryChart(lists[index].CountryCode)
}

function refreshChart(cases, death, recovered) {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(ctx, {   
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Cases',
                    backgroundColor: 'rgb(247, 211, 89)',
                    borderColor: 'rgb(247, 211, 89)',
                    data: cases,
                    fill : false
                },
                {
                    label: 'Deaths',
                    backgroundColor: 'rgb(242, 70, 70)',
                    borderColor: 'rgb(242, 70, 70)',
                    data: death,
                    fill : false
                },
                {
                    label: 'Recovered',
                    backgroundColor: 'rgb(118, 198, 123)',
                    borderColor: 'rgb(118, 198, 123)',
                    data: recovered,
                    fill : false
                },
            ]
        },

        options: {
            responsive : true,
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }]
            }
        }
    });  
}

document.addEventListener("DOMContentLoaded", tracker);
