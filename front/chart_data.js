statsProduits();
async function statsProduits(){//Pour récupérer tous les clients de la BDD
    console.log("balala");
    var rep = await fetch('http://127.0.0.1:3000/api/data/statsVentes', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    })
    if(rep.ok){
        var stats = await rep.json();
        stats = stats.data;
        var noms = []; // Tableau pour stocker les noms de propriété
        var valeurs = []; // Tableau pour stocker les valeurs

        for (var index in stats) {
            if (stats.hasOwnProperty(index)) {
                noms.push(index);
                valeurs.push(stats[index]);
            }
        }
        //Graphe
        const ctx = document.getElementById('myChart');

        var tabVentes = valeurs;
        var tabNomProduits = noms;

        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tabNomProduits,
            datasets: [{
            label: 'Nombre de ventes par produit',
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
    }
}