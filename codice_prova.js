
    function removeLastChar(obj){

        return obj.substring(0, obj.length - 1);

    };

    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }

    /*_______________________________________________________*/
    let InfoMese= []; //Questo è l'array che verrà stampato alla fine
    var GiorniDelMese = []; //Inizializzo l'array con tutti i giorni della pagina (35)
    /*_______________________________________________________*/

    GiorniDelMese = document.getElementsByClassName("day"); //Inserisco nell'array le caselle


    for (let i = 0; i < GiorniDelMese.length; i++) {
        let InfoGiornoSingolo = {}; //Oggetto da salvare

        var nomeData = "StartDate"; //Campo Data
        var nomeDataFine = "EndDate"; // Campo Fine evento
        var nomeTipo = "Subject"; //Campo tipologia
        var nomeInizioTurno = "InizioTurno"; //campo Inizio Turno
        var nomeFineTurno = "FineTurno"; //Campo Fine Turno
        var nomeTuttoIlGiono = "TuttoIlGiorno"; //Campo Tutto il giorno
        var temp;
        //Recupero i dati che mi servono:

        //Data della giornata
        InfoGiornoSingolo[nomeData] = GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("day-info")[0].getElementsByClassName("date")[0].innerHTML

        //Tipologia giornata

        if(GiorniDelMese[i].getElementsByClassName("allocation-day")[0].classList.contains("disable")){

            //Accedo al giorno precedente:
            temp = InfoMese[i-1];
            //Imposto la data di inizio dormita:
            InfoGiornoSingolo[nomeDataFine] = temp.nomeData;
            //Imposto la data di fine dormita:
            temp[nomeDataFine] = InfoGiornoSingolo[nomeData];
            //Imposto l'ora di fine dormita:
            temp[nomeFineTurno]= tConvert(removeLastChar(GiorniDelMese[i-1].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName("allocation-info")[0].getElementsByClassName("time-location-info")[1].getElementsByTagName("span")[0].innerText));
            //Imposto l'ora di inizio dormita:
            InfoGiornoSingolo[nomeInizioTurno] = GiorniDelMese[i-1].nomeInizioTurno;



        }
        else if(GiorniDelMese[i].getElementsByClassName("allocation-day")[0].classList.contains("click-area")){
            //Giorno libero
            if (GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName("allocation-info")[0].classList.contains("type_offday")) {
                InfoGiornoSingolo[nomeTipo] = "Libero";
                InfoGiornoSingolo[nomeDataFine] = InfoGiornoSingolo[nomeData];
                InfoGiornoSingolo[nomeTuttoIlGiono] = "TRUE";
            } else if(GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName("allocation-info")[0].classList.contains("singleduty")){
                //Lavoro
                InfoGiornoSingolo[nomeTipo] = GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName('allocation-info')[0].getElementsByClassName("duty-nr")[0].innerHTML; ;
                InfoGiornoSingolo[nomeTuttoIlGiono] = "FALSE";
                //Determino gli orari di inizio e di fine turno
                InfoGiornoSingolo[nomeInizioTurno] = tConvert(GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName("allocation-info")[0].getElementsByClassName("time-location-info")[0].getElementsByTagName("span")[0].innerText);
                InfoGiornoSingolo[nomeFineTurno] = tConvert(GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("allocation-container")[0].getElementsByClassName("allocation-info")[0].getElementsByClassName("time-location-info")[1].getElementsByTagName("span")[0].innerText);
                //Imposto come data di fine dell'evento la stessa data di inzio:
                InfoGiornoSingolo[nomeDataFine] = GiorniDelMese[i].getElementsByClassName("allocation-day")[0].getElementsByClassName("day-info")[0].getElementsByClassName("date")[0].innerHTML;
            }

        }

        //Salvo gli elementi nell'array
        InfoMese.push(InfoGiornoSingolo)
    }



    /*
    * Rimappo l'array in modo da avere i nomi adatti per Google Calendar
    */

    const MeseGC = InfoMese.map(function(row) {
        return {
            'Subject' : row.Subject,
            'End Date' : row.EndDate,
            'Start Date': row.StartDate,
            "Start Time": row.InizioTurno,
            "End Time": row.FineTurno,
            "All Day Event": row.TuttoIlGiorno,
            "Location": "",
            "Description":"",
            }
    });



    /*____________________________________________________________________________*/
    /*______________CODICE FUNZIONANTE: CONVERSIONE OBJ IN .CSV e download________*/
    /*____________________________________________________________________________*/

    function conversioneCSV(InfoMese){
        function arrayToCSV(objArray) {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

            return array.reduce((str, next) => {
                str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
                return str;
            }, str);
        }

        return arrayToCSV(InfoMese);
    }
    var a = document.body.appendChild(document.createElement("a"));
    a.download = "TurniCSV.csv";
    a.href = 'data:text/csv;charset=utf-8,' + encodeURI(conversioneCSV(MeseGC));
    a.innerHTML = "Clicca qui per scaricare i turni";
    //end section

    //Stampa a video pe debug
        console.log(conversioneCSV(MeseGC));
