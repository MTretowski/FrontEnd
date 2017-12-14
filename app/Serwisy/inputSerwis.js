app.service('inputSerwis', function(){

    this.usunSpacje = function(napis){
        while (napis.includes(' ')) {
            napis = napis.replace(' ', '');
        }
        return napis;
    }

});