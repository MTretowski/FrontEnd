app.service('dateValidator', function () {

    this.isDateFromTheFuture = function (date, fieldName) {
        let now = new Date();
        let nowUTC = new Date();
        nowUTC.setUTCHours(now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        nowUTC.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        let dateUTC = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());


        if (dateUTC.getTime() > nowUTC.getTime()) {
            return (fieldName + ': Data pochodzi z przyszłości.\n');
        }
        else {
            return '';
        }
    }

});