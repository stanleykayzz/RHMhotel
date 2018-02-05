/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function (undefined) {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.utils = Core.utils || {};
    var _eventHandlers = {};
    var _timeoutsID = [];

    /**
     * Allow all type of ajax request
     * @param objectService
     * @param paramRequest
     * @param paramBody
     * @param option
     */
    Core.utils.ajaxRequest = function (objectService, paramRequest, paramBody, option, doNotParse, formData) {
        var requestUrl = "", requestBody = "";

        var initVariables = function () {
            if (paramRequest !== null && paramRequest !== undefined)
                requestUrl = data.basicUrl + objectService.url + "?" + paramRequest;
            else
                requestUrl = data.basicUrl + objectService.url;

            if (paramBody !== null && paramBody !== undefined)
                requestBody = paramBody;
            else
                requestBody = "";
        }();

        var xhr = new XMLHttpRequest();
        xhr.open(objectService.method, requestUrl, false);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function (re) {
            if (data.httpCodeValide.indexOf(xhr.status) !== -1) {
                if (option === true && (this.responseText == undefined || this.responseText == "")) {
                    objectService.error(xhr.status);
                } else {
                    if (doNotParse == true) {
                        objectService.func(this.responseText);
                    } else {
                        var response = JSON.parse(this.responseText);
                        objectService.func(response);
                    }


                }
            } else {
                objectService.error(xhr.status);
            }
        };

        xhr.onerror = function (res) {
            objectService.error(xhr.status);
        };

        if (formData != null)
            xhr.send(requestBody, formData);
        else
            xhr.send(requestBody);
    };

    /**
     * Include an html page into the include_container
     * @param path
     * @param name
     */
    Core.utils.include = function (path, name) {
        var fullPath = data.pathHtml + path;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", fullPath, true);
        xhr.onload = function () {
            document.getElementById("include_content").innerHTML = this.responseText;
            controller.includeContainer.initViewEvents(name);
        };

        xhr.send();
    };

    /**
     * Remove all the child from an element
     * @param element
     */
    Core.utils.empty = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    Core.utils.getCategoryById = function (id) {
        for (var i = 0; i < data.listRoomCategories.length; i++) {
            if (data.listRoomCategories[i].id == id)
                return data.listRoomCategories[i];
        }
    };

    Core.utils.getRoomById = function (id) {
        for (var i = 0; i < data.listRoom.length; i++) {
            if (data.listRoom[i].id == id)
                return data.listRoom[i];
        }
    };

    Core.utils.beautifyDate = function (date) {
        var d = new Date(date);

        var day = function () {
            if (d.getDate() < 10) {
                return "0" + d.getDate();
            } else {
                return d.getDate();
            }
        };

        var month = function () {
            var m = d.getMonth() + 1;
            if (m < 10) {
                return "0" + m;
            } else {
                return m;
            }
        };

        return day() + "/" + month() + "/" + d.getFullYear();
    };

    /**
     * Remove all timeOuts
     */
    Core.utils.removeTimeouts = function () {
        var length = _timeoutsID.length;
        for (var i = 0; i < length; i++) {
            window.clearTimeout(_timeoutsID[i]);
        }

        _timeoutsID = [];
    };

    Core.utils.imageOpacityAnimation = function (background, idContainer) {
        var divHeader = document.getElementById(idContainer);

        var timeOut = function (i) {
            utils.removeTimeouts();

            var tmID = setTimeout(function () {
                if (i < 10) {
                    i += 1;
                    divHeader.style.opacity = (1 - (0.1 * i));
                    timeOut(i);
                } else {
                    divHeader.style.backgroundImage = "url(" + background + ")";
                    divHeader.style.opacity = 1;
                    utils.removeTimeouts();
                }
            }, 40);
        };

        timeOut(1);
    };

    /**
     * Display images menu
     * @param background
     * @param idContainer
     */
    Core.utils.manageImages = function (background, idContainer) {
        var divHeader = document.getElementById(idContainer);
        var jqueryID = "#" + idContainer;

        divHeader.style.backgroundImage = "url(" + background[background.length - 1] + ")";

        var timeOut = function (i) {
            utils.removeTimeouts();

            if (i == background.length - 1)
                i = 0;
            else
                i += 1;

            var tmID = setTimeout(function () {
                $(jqueryID).fadeOut(1000, function () {
                    divHeader.style.backgroundImage = "url(" + background[i] + ")";
                    $(jqueryID).fadeIn(1000);
                })

                timeOut(i);
            }, 7000);

            _timeoutsID[_timeoutsID.length] = tmID;
        };

        timeOut(0);
    };

    /**
     * Check if a date if valid
     * @param type
     * @param value
     * @returns {boolean}
     */
    Core.utils.checkDate = function (type, value) {
        var currentTime = new Date();

        switch (type) {
            case "year":
                if (value > 1900 && value <= currentTime.getFullYear())
                    return true;
                else
                    return false;

                break;

            case "month":
                if (value >= 1 && value <= 12)
                    return true;
                else
                    return false;

                break;

            case "day":
                if (value >= 1 && value <= 31)
                    return true;
                else
                    return false;

                break;
        }
        ;
    };

    /**
     * Format a date into string variable
     * @param time
     * @param type
     * @returns {string}
     */
    Core.utils.formatDate = function (time, type) {
        var year, month, day;
        var dateObject = new Date(time);

        var initVariables = function () {
            year = dateObject.getFullYear();

            if (dateObject.getMonth() < 9)
                month = "0" + (parseInt(dateObject.getMonth()) + 1);
            else
                month = (parseInt(dateObject.getMonth()) + 1);

            if (dateObject.getDate() < 10)
                day = "0" + dateObject.getDate();
            else
                day = dateObject.getDate();
        }();


        switch (type) {
            case "view_account":
                return day + "/" + month + "/" + year;
            case  "update_account":
                return year + "-" + month + "-" + day;
            case "reservation":
        }
        return year + "-" + month + "-" + day;
    };

    Core.utils.formatDateAdmin = function (time) {
        var year, month, day;
        var dateObject = new Date(time);

        var initVariables = function () {
            year = dateObject.getFullYear();

            if (dateObject.getMonth() < 9)
                month = "0" + (parseInt(dateObject.getMonth()) + 1);
            else
                month = (parseInt(dateObject.getMonth()) + 1);

            if (dateObject.getDate() < 10)
                day = "0" + dateObject.getDate();
            else
                day = dateObject.getDate();

        }();

        return day + "/" + month + " " + year;
    };

    Core.utils.formatDateTime = function (time) {
        var year, month, day, hour, minute;
        var dateObject = new Date(time);

        var initVariables = function () {
            year = dateObject.getFullYear();

            if (dateObject.getMonth() < 9)
                month = "0" + (parseInt(dateObject.getMonth()) + 1);
            else
                month = (parseInt(dateObject.getMonth()) + 1);

            if (dateObject.getDate() < 10)
                day = "0" + dateObject.getDate();
            else
                day = dateObject.getDate();

            if (dateObject.getHours() < 10)
                hour = "0" + dateObject.getHours();
            else
                hour = dateObject.getHours();

            if (dateObject.getMinutes() < 10)
                minute = "0" + dateObject.getMinutes();
            else
                minute = dateObject.getMinutes();
        }();

        return day + "/" + month + " " + hour + ":" + minute;
    };


    /**
     * Set the datePicker in french language
     */
    Core.utils.setDatepickerLanguage = function () {
        $.datepicker.regional['fr'] = {
            clearText: 'Effacer', clearStatus: '',
            closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
            prevText: '<Préc', prevStatus: 'Voir le mois précédent',
            nextText: 'Suiv>', nextStatus: 'Voir le mois suivant',
            currentText: 'Courant', currentStatus: 'Voir le mois courant',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
            weekHeader: 'Sm', weekStatus: '',
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
            dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
            dateFormat: 'dd/mm/yy', firstDay: 0,
            initStatus: 'Choisir la date', isRTL: false
        };
        $.datepicker.setDefaults($.datepicker.regional['fr']);
    };

    /**
     * Check if the email is valid
     * @param email
     * @returns {boolean}
     */
    Core.utils.emailValidator = function (email) {
        var rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rgx.test(email.value);
    };

    /**
     * Check the session
     * @param token_date
     * @returns {boolean}
     */
    Core.utils.verifSessionStorage = function (token_date) {
        var currentDate = new Date();
        var tokenDate = new Date(token_date);

        var diffHours = currentDate.getHours() - tokenDate.getHours();
        var diffMin = currentDate.getMinutes() - tokenDate.getMinutes();
        var diffMinExc = (tokenDate.getMinutes() + 60) - currentDate.getMinutes();

        if (tokenDate.getFullYear() !== currentDate.getFullYear()
            || tokenDate.getMonth() !== currentDate.getMonth()
            || tokenDate.getDate() !== currentDate.getDate())
            return false;

        if (diffHours === 0) {
            if (diffMin <= 15) {
                return true;
            } else {
                return false;
            }

        } else if (diffHours === 1 && diffMinExc <= 15) {
            return true;
        }
        return false;
    };

    Core.utils.displayError = function (message) {
        var error = document.getElementById("error_container");
        error.textContent = message;

        var tmID = setTimeout(function () {
            error.textContent = "";
        }, 4000);
    };

    /**
     * Return the days between two dates
     * @param date_start
     * @param date_end
     * @returns {{}}
     */
    Core.utils.getDays = function (date_start, date_end) {
        var diff = {};
        var tmp = date_end - date_start;

        tmp = Math.floor(tmp / 1000);
        diff.sec = tmp % 60;

        tmp = Math.floor((tmp - diff.sec) / 60);
        diff.min = tmp % 60;

        tmp = Math.floor((tmp - diff.min) / 60);
        diff.hour = tmp % 24;

        tmp = Math.floor((tmp - diff.hour) / 24);
        diff.day = tmp;

        return diff;
    };

    Core.utils.manageBook = function () {
        if (data.rbr != null) {
            Core.service.book.room.cancelBookRoom(data.rbr);
            data.rbr = null;
        }
    };


    Core.utils.initClientIp = function () {
        $.getJSON("https://ipinfo.io/json", function (d) {
            data.clientIp = d.ip;
            Core.service.payment.initCountryInfo(data.clientIp);
        });
    };

    Core.utils.getTimezone = function () {
        var date = new Date();
        var dateString = date.toString();
        var tmp = dateString.substring(dateString.indexOf("+"), (dateString.indexOf("+") + 5));

        return tmp;
    };

    Core.utils.getServiceById = function (id) {
        for (var i = 0; i < data.listFesiveRoomService.length; i++) {
            if (data.listFesiveRoomService[i].id == id)
                return data.listFesiveRoomService[i];
        }
    };
    /**
     * capitalizeFirstLetter
     * @param string
     * @returns {string}
     */
    Core.utils.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Core.utils.redirectTimerMessage = function (message, color, pageObject) {
        var view = function () {
            utils.empty(data.getIncludeContainer());
            data.getIncludeContainer().innerHTML = "" +
                "<div style='display: inline-block; width: 100%; color: green; font: 22px Roboto, sans-serif color: " + color + "; text-align: center; padding-bottom: 40px;'>" +
                "</br>" + message + "</div>";
        }();
        var redirection = function () {
            var timeOut = function () {
                var tmID = setTimeout(function () {
                    Core.utils.empty(data.getIncludeContainer());
                    utils.include(pageObject.viewPath, pageObject.name);
                }, 5000);
            }();
        }();
    };

    Core.utils.numberSort = function (array, key) {
        if(array.length > 0 && array != undefined){
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return x - y;
            });
        }
    };

    Core.utils.alphabeticSortDesc = function (array, key) {
        if (array.length > 0) {
            return array.sort(function (a, b) {
                if(typeof a[key] == "string")
                    var x = a[key].toLowerCase();
                else
                    var x = a[key];

                if(typeof b[key] == "string")
                    var y = b[key].toLowerCase();
                else
                    var y = b[key];

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        return [];
    };

    Core.utils.alphabeticSortAsc = function (array, key) {
        if (array.length > 0) {
            return array.sort(function (a, b) {
                if(typeof a[key] == "string")
                    var x = a[key].toLowerCase();
                else
                    var x = a[key];

                if(typeof b[key] == "string")
                    var y = b[key].toLowerCase();
                else
                    var y = b[key];

                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }

        return [];
    };


    Core.utils.sortByDate = function (arrayDate, key) {
        if (arrayDate.length > 0) {
            return arrayDate.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return new Date(x) - new Date(y);
            });
        }
    };

    /**
     * Add a listener into an array
     * @param node
     * @param event
     * @param handler
     * @param capture
     */
    Core.utils.addListener = function (node, event, handler, capture) {
        if (!(node in _eventHandlers)) {
            _eventHandlers[node] = {};
        }
        if (!(event in _eventHandlers[node])) {
            _eventHandlers[node][event] = [];
        }
        _eventHandlers[node][event].push([handler, capture]);
        node.addEventListener(event, handler, capture);
    };

    /**
     * Remove a listener from an array
     * @param node
     * @param event
     */
    Core.utils.removeListener = function (node, event) {
        if (node in _eventHandlers) {
            var handlers = _eventHandlers[node];
            if (event in handlers) {
                var eventHandlers = handlers[event];
                for (var i = eventHandlers.length; i--;) {
                    var handler = eventHandlers[i];
                    node.removeEventListener(event, handler[0], handler[1]);
                }
            }
        }
    };

    /**
     * Stop an event
     * @param e
     * @returns {boolean}
     */
    Core.utils.pauseEvent = function (e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;

        return false;
    };
})();
