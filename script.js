let einkauf = [];
let produkte = [];

function produktHinzufuegen(name, wasser){

    einkauf.push({
        name:name,
        wasser:wasser
    });

    anzeigen();
}

function anzeigen(){

    let liste=document.getElementById("warenkorb");
    liste.innerHTML="";

    let gesamt=0;

    einkauf.forEach(produkt=>{
        
        let li=document.createElement("li");
        
        li.innerHTML= `${produkt.name} - ${produkt.wasser} Liter`;

        liste.appendChild(li);

        gesamt+=produkt.wasser;


    });

    document.getElementById("gesamt").innerHTML=gesamt+" Liter";

}

function resetBon(){

    einkauf=[];

    anzeigen();

}

fetch("produkte.json")
.then(response => response.json())
.then(daten => {
    produkte = daten;
    console.log(produkte);
});

function scannerStarten() {

    const scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (text) => {

            let produkt = produkte.find(p => p.id === text);

            if (produkt) {

                produktHinzufuegen(
                    produkt.name,
                    produkt.wasser
                );
            } else {

                alert("Produkt nicht gefunden!");
                
            }

            scanner.stop();

        },
        (error) => {
            // Fehler ignorieren
        }
    );
}