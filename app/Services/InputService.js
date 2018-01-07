app.service('inputService', function () {

    this.deleteSpaces = function (text) {
        while (text.includes(' ')) {
            text = text.replace(' ', '');
        }
        return text;
    }

});