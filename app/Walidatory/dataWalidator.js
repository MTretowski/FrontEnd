app.service('dataWalidator', function(){

    this.czyDataZPrzyszlosci = function(data, nazwaPola){
        let teraz = new Date();
        let terazUTC = new Date();
        terazUTC.setUTCHours(teraz.getUTCHours(), teraz.getUTCMinutes(), teraz.getUTCSeconds());
        terazUTC.setUTCFullYear(teraz.getUTCFullYear(), teraz.getUTCMonth(), teraz.getUTCDate());

        let dataUTC = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), data.getUTCHours(), data.getUTCMinutes(), data.getUTCSeconds());


        if (dataUTC.getTime() > terazUTC.getTime()) {
            return (nazwaPola + ': Data pochodzi z przyszłości.\n');
        }
        else{
            return '';
        }
    }

});