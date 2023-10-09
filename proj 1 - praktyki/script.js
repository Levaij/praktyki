function dieta() {
    var odjazd = document.getElementById("start").value;
    var przyjazd = document.getElementById("end").value;
    var godzinyOdjazd = parseInt(document.getElementById("Godziny-odjazd").value);
    var minutyOdjazd = parseInt(document.getElementById("Minuty-odjazd").value);
    var godzinyPrzyjazd = parseInt(document.getElementById("Godziny-przyjazd").value);
    var minutyPrzyjazd = parseInt(document.getElementById("Minuty-przyjazd").value);
    var sniadania = document.getElementById("sniadanie").value;
    var obiady = document.getElementById("obiad").value;
    var kolacje = document.getElementById("kolacja").value;
    var od900 = document.getElementById("od900").value;
    var do900 = document.getElementById("do900").value;


    if (!odjazd || !przyjazd) {
        alert("Wprowadź poprawne daty.");
        return;
    }

    var wyplatado900 = 0.89 * do900;
    var wyplataod900 = 1.15 * od900;
    var wyplatapaliwo = (parseFloat(wyplatado900) + parseFloat(wyplataod900)).toFixed(2);

    var date1 = new Date(odjazd);
    var date2 = new Date(przyjazd);

    date1.setHours(godzinyOdjazd, minutyOdjazd);
    date2.setHours(godzinyPrzyjazd, minutyPrzyjazd);

    var differenceInMilliseconds = date2 - date1;

    var differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    var wyplata = 0;

    if (differenceInHours > 8 && differenceInHours < 12){
        var wyplata = 22.50;
    } else if (differenceInHours > 24) {
        var pelneDoby = Math.floor(differenceInHours / 24);
        wyplata = ((pelneDoby * 45) - ((sniadania) * 11.50 ) - ((kolacje) * 11.50 ) - ((obiady) * 22.50 ));
    } 
    
    if (wyplata < 0) {
        var wyplata = 0;
    }

    if (od900 < 0 || do900 < 0){
        var wyplatapaliwo = 0;
    }
    document.getElementById("wynik").innerHTML = "Przyznana dieta wynosi: " + wyplata + "pln. <br> Zwrot kosztów przejazdu wynosi: " + wyplatapaliwo + "pln." ;
}