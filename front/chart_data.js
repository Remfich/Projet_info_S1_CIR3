const ctx = document.getElementById('myChart').getContext('2d')

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
    },
    responsive: true, // Permet au graphique de s'adapter à la taille de la fenêtre
    maintainAspectRatio: false // Empêche le graphique de maintenir un aspect ratio fixe
}

});
