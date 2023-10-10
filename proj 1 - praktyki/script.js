document.addEventListener("DOMContentLoaded", function () {
    var pojazdElement = document.getElementById("pojazd");
    pojazdElement.addEventListener("change", pojazdf);

    var obliczButton = document.getElementById("oblicz-button");
    obliczButton.addEventListener("click", dieta);
});

function pojazdf() {
    var pojazdElement = document.getElementById("pojazd");
    var selectedPojazd = parseInt(pojazdElement.value);

    var kilometrowkaSection = document.getElementById("kilometrowka");

    if (selectedPojazd === 0) {
        kilometrowkaSection.innerHTML = "<h5>Nie wybrano pojazdu!</h5>";
    } else if (selectedPojazd === 1) {
        kilometrowkaSection.innerHTML =
            '<label for="do900">Samochodem osobowym o pojemności silnika do 900 cm3</label>' +
            '<input id="do900" min="0" type="number" name="do900" value="0"> km';
    } else if (selectedPojazd === 2) {
        kilometrowkaSection.innerHTML =
            '<label for="od900">Samochodem osobowym o pojemności silnika pow. 900 cm3</label>' +
            '<input id="od900" min="0" type="number" name="od900" value="0"> km';
    }
}

function dieta() {
    var startElement = document.getElementById("start");
    var endElement = document.getElementById("end");
    var godzinyOdjazd = parseInt(document.getElementById("Godziny-odjazd").value);
    var minutyOdjazd = parseInt(document.getElementById("Minuty-odjazd").value);
    var godzinyPrzyjazd = parseInt(document.getElementById("Godziny-przyjazd").value);
    var minutyPrzyjazd = parseInt(document.getElementById("Minuty-przyjazd").value);
    var sniadania = parseInt(document.getElementById("sniadanie").value);
    var obiady = parseInt(document.getElementById("obiad").value);
    var kolacje = parseInt(document.getElementById("kolacja").value);
    
    var od900Element = document.getElementById("od900");
    var do900Element = document.getElementById("do900");
    
    var od900 = od900Element ? parseFloat(od900Element.value) : 0;
    var do900 = do900Element ? parseFloat(do900Element.value) : 0;
    
    if (!startElement || !endElement) {
        alert("Wprowadź poprawne daty.");
        return;
    }

    var wyplatado900 = 0.89 * do900;
    var wyplataod900 = 1.15 * od900;
    var wyplatapaliwo = (wyplatado900 + wyplataod900).toFixed(2);

    var date1 = new Date(startElement.value);
    var date2 = new Date(endElement.value);

    date1.setHours(godzinyOdjazd, minutyOdjazd);
    date2.setHours(godzinyPrzyjazd, minutyPrzyjazd);

    var differenceInMilliseconds = date2 - date1;
    var differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    var wyplata = 0;

    if (differenceInHours >= 8 && differenceInHours < 12) {
        wyplata = 22.50;
    } else if (differenceInHours >= 12) {
        var pelneDoby = Math.floor(differenceInHours / 24);
        wyplata = pelneDoby * 45 - sniadania * 11.50 - obiady * 22.50 - kolacje * 11.50;
    }

    if (wyplata < 0) {
        wyplata = 0;
    }

    if (sniadania < 0 || obiady < 0 || kolacje < 0){
        document.getElementById("blad").innerHTML = "Podaj poprawną liczbe posiłków!";
        wyplata = 0;
    } else {
        document.getElementById("blad").innerHTML = "";
    }

    if (od900 < 0 || do900 < 0) {
        document.getElementById("bladkm").innerHTML = "Podaj poprawną liczbe kilometrów!";
        wyplatapaliwo = 0;
    } else {
        document.getElementById("bladkm").innerHTML = "";
    }

    var suma = 0;
    var suma = parseFloat(wyplata) + parseFloat(wyplatapaliwo);

    document.getElementById("wynik").innerHTML =
        "Przyznana dieta wynosi: " + wyplata.toFixed(2) + " PLN. <br> Zwrot kosztów przejazdu wynosi: " + wyplatapaliwo + " PLN. <br> Suma przyznanych pieniędzy wynosi: " + suma.toFixed(2) + " PLN.";
}
