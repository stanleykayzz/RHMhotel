/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.utils.form = Core.utils.form || {};
    /**
     * Check all the values send to validate or not all forms from the application
     * @param jsonObject
     * @param key_style
     * @param style
     * @param error_style
     * @returns {boolean}
     */
    Core.utils.form.formValidator = function (jsonObject, key_style, style, error_style) {
        var validation = true;
        var sexe = null;
        var password;

        for(var key in jsonObject){
            var val = true;

            switch (key){
                case "firstname":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "lastname":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === "") {
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "email":
                    if(utils.emailValidator(jsonObject[key]) === false){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "password":
                    if(jsonObject[key].value.length < 6){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    } else {
                        password = jsonObject[key].value;
                    }
                    break;

                case "password_2":
                    if(jsonObject[key].value  !== password){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "day":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === "" || Core.utils.checkDate("day", jsonObject[key].value) === false){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "month":
                    if(jsonObject[key].getElementsByTagName("option")[jsonObject[key].selectedIndex].getAttribute("name")     === null
                        || jsonObject[key].getElementsByTagName("option")[jsonObject[key].selectedIndex].getAttribute("name") === undefined
                        || jsonObject[key].getElementsByTagName("option")[jsonObject[key].selectedIndex].getAttribute("name") === ""
                        || Core.utils.checkDate("month", jsonObject[key].getElementsByTagName("option")[jsonObject[key].selectedIndex].getAttribute("name")) === false){

                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "year":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === "" || Core.utils.checkDate("year", jsonObject[key].value) === false){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "phone":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "country":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "city":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "address":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "postalcode":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined || jsonObject[key].value === ""){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;

                case "datepicker_start":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;
                
                case "datepicker_end":
                    if(jsonObject[key].value === null || jsonObject[key].value === undefined){
                        validation = false;
                        val = false;
                        jsonObject[key].style[key_style] = error_style;
                    }
                    break;
            }

            if(val === true){
                if(jsonObject[key].tagName != "SELECT") {
                    jsonObject[key].style[key_style] = style;
                }
            }
        }

        return validation;
    };
})();