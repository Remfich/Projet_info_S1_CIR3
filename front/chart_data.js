const ctx = document.getElementById('myChart');

var tabVentes = [12, 19, 3, 5, 2, 3];
var tabNomProduits = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

new Chart(ctx, {
type: 'bar',
data: {
    labels: tabNomProduits,
    datasets: [{
    label: '# of Votes',
    data: tabVentes,
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});
