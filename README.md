# Cosa è IvuToCSV?

IvuToCSV (v.alpha0.01) è uno script che si esegue sulla console da sviluppatore del browser. 
Permette di convertire la pagina "Gestione Operativa" di IVU in un file CSV, denominato "TurniCSV.csv". 
Questo file potrà poi essere importato su una qualsiasi applicazione calendario.
 

# Come si utilizza IvuToCSV?
Si accede agli strumenti sviluppatore del browser, si clicca su "console" e si incolla il codice. In basso a sinistra comparirà una piccola scritta **"Clicca qui per scaicare i turni**. Cliccando verrà scaricato il file TurniCSV.csv. 

# Limiti della versione alpha0.01
1. Vengono inseriti nel file 35 elementi, quindi tutta la pagina visualizzata
2.	Gli RFR, i giorni di lavoro singoli, i giorni di riposo (indipendentemente dal tipo) vengono associati correttamente **MA** le altre tipologie di giornate (malattia, recupero, festività) non vengono trattate in maniera esplicita il che significa che non verranno inserite nel calendario.
3.	Non vengono inseriti i nomi delle giornate
4.	Codice poco "elegante", presenti dati hardcoded.
6. Segnalate eventuali malfunzionamenti 


## Timeline

  > 12/08/21 : Prima compilazione funzionante del codice
  ___
  


