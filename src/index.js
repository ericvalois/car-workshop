import "./styles.css";

const chartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    tooltips: {
        enabled: false,
    },
    elements: {
        point: {
            radius: 0
        },
    },
    scales: {
        xAxes: [{
            gridLines: false,
            scaleLabel: false,
            ticks: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: false,
            scaleLabel: false,
            ticks: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 10
            }
        }]
    }
};
//
var ctx = document.getElementById('chart1').getContext('2d');
var chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [1, 2, 1, 3, 5, 4, 7],
        datasets: [
            {
                backgroundColor: "rgba(101, 116, 205, 0.1)",
                borderColor: "rgba(101, 116, 205, 0.8)",
                borderWidth: 2,
                data: [1, 2, 1, 3, 5, 4, 7],
            },
        ],
    },
    options: chartOptions
});
//
var ctx = document.getElementById('chart2').getContext('2d');
var chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [2, 3, 2, 9, 7, 7, 4],
        datasets: [
            {
                backgroundColor: "rgba(246, 109, 155, 0.1)",
                borderColor: "rgba(246, 109, 155, 0.8)",
                borderWidth: 2,
                data: [2, 3, 2, 9, 7, 7, 4],
            },
        ],
    },
    options: chartOptions
});
//
var ctx = document.getElementById('chart3').getContext('2d');
var chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [2, 5, 1, 3, 2, 6, 7],
        datasets: [
            {
                backgroundColor: "rgba(246, 153, 63, 0.1)",
                borderColor: "rgba(246, 153, 63, 0.8)",
                borderWidth: 2,
                data: [2, 5, 1, 3, 2, 6, 7],
            },
        ],
    },
    options: chartOptions
});



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


const tabNumber = getUrlVars()["tab"];
const baseEndpoint = `https://spreadsheets.google.com/feeds/cells/16sQYh3VlWS1QPMXmT6uunevztDdCtsmhFP0WpWdicgQ/${tabNumber}/public/full/`;
const proxy = `https://cors-anywhere.herokuapp.com/`;


async function fetchData(target) {
	let targetEndpoint = proxy + baseEndpoint + target + '?alt=json';
	const res = await fetch(targetEndpoint);
	const data = await res.json();
	return data;
}

async function fetchTitle() {
	let targetEndpoint = `https://spreadsheets.google.com/feeds/cells/16sQYh3VlWS1QPMXmT6uunevztDdCtsmhFP0WpWdicgQ/${tabNumber}/public/full?alt=json`;
	const res = await fetch(targetEndpoint);
	const data = await res.json();
	
	return data;
}

async function getTitle() {
	const data = await fetchTitle();
	const placeholder = document.querySelector(`#title`);

	return [data.feed.title.$t, placeholder];
}

async function getContent(target) {

  	const data = await fetchData(target);
  	const placeholder = document.querySelector(`#${target}`);

  	return [data.entry.content.$t, placeholder];
}

function successCallback([value, placeholder]) {
	placeholder.innerHTML = value;
}
  
function failureCallback(error) {
	console.error("Error: " + error);
}

// Get page title
let promiseTitle = getTitle();
promiseTitle.then(successCallback, failureCallback);

// Total neuf
let promiseR41C1 = getContent('R41C1');
promiseR41C1.then(successCallback, failureCallback);

// Total brut
let promiseR41C3 = getContent('R41C3');
promiseR41C3.then(successCallback, failureCallback);

// Moyenne Front
let promiseR47C1 = getContent('R47C1');
promiseR47C1.then(successCallback, failureCallback);

// Moyenne F&I
let promiseR47C3 = getContent('R47C3');
promiseR47C3.then(successCallback, failureCallback);

// Henry
let promiseR53C3 = getContent('R53C3');
promiseR53C3.then(successCallback, failureCallback);

// Karine
let promiseR53C5 = getContent('R53C5');
promiseR53C5.then(successCallback, failureCallback);

// Moyenne Total
let promiseR47C7 = getContent('R47C7');
promiseR47C7.then(successCallback, failureCallback);