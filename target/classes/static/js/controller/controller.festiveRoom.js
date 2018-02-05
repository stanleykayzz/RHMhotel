/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.festiveRoom = Core.controller.festiveRoom || {};

    /**
     * Init the festive room view and events
     * @param items
     */
    Core.controller.festiveRoom.initView = function (items) {
        var include_container, search_container;
        var startDateID, endDateID;
        var startDatepicker, endDatepicker,
            startString, endString,
            formatDateStart, formatDateEnd,
            include_items, btn_book,
            list_booked_items, jsonItems,
            error_container, valide_container;
        var label_start_date, label_end_date,
            label_price, list_items;

        var minStart = new Date();
        minStart.setMonth(minStart.getMonth() + 3);

        var minEnd = new Date(minStart);
        minEnd.setDate(minEnd.getDate() + 1);
        var getDays = function () {
            return utils.getDays(new Date(formatDateStart), new Date(formatDateEnd));
        };
        var initVariables = function () {
            search_container = document.getElementById("search_container");
            include_container = document.getElementById("include_book");
            error_container = document.getElementById("error_container");
            valide_container = document.getElementById("valide_container");

            startDatepicker = document.getElementById("reservation_start_date");
            endDatepicker = document.getElementById("reservation_end_date");

            include_items = document.getElementById("include_items");
            btn_book = document.getElementById("btn_book");

            startDateID = "#reservation_start_date";
            endDateID = "#reservation_end_date";

            list_booked_items = document.getElementById("list_booked_items");
            jsonItems = {};
            
            utils.reservation.datePicker(startDateID, minStart, null);
            utils.reservation.datePicker(endDateID, minEnd, null);

            $(endDateID).datepicker("option", "minDate", minEnd);

            label_start_date = document.getElementById("label_start_date");
            label_end_date = document.getElementById("label_end_date");
            label_price = document.getElementById("label_price");
            list_items = document.getElementById("list_items");

        }();
        var initEvents = function () {
            var p = Math.round((data.costFestiveRoom * data.countryInfo.rate));
            document.getElementById("reservation_price").textContent = p + " " + data.symbol;

            $(startDateID).datepicker("option", "onSelect", function () {
                var minDate = $(startDateID).datepicker("getDate");
                minDate.setDate(minDate.getDate() + 1);
                $(endDateID).datepicker("option", "minDate", minDate);
                label_start_date.textContent = utils.formatDate();
            });
            
            utils.addListener(btn_book, "click", function (e) {
                utils.empty(list_items);

                startString = startDatepicker.value.split("/");
                endString = endDatepicker.value.split("/");

                formatDateStart = startString[2] + "-" + startString[1] + "-" + startString[0];
                formatDateEnd = endString[2] + "-" + endString[1] + "-" + endString[0];

                var jsonValidator = {
                    datepickerStart: startDatepicker,
                    datepickerEnd: endDatepicker
                };

                var formValid = utils.form.formValidator(jsonValidator, startDatepicker.style);

                var festiveRoomBookJson = {
                    dateStart: new Date(formatDateStart).getTime(),
                    dateEnd: new Date(formatDateEnd).getTime(),
                    status: "",
                    idFestiveRoom: "1",
                    idClient: client.id
                };

                var startString = startDatepicker.value.split("/");
                var endString = endDatepicker.value.split("/");

                var formatDateStart = startString[2] + "-" + startString[1] + "-" + startString[0];
                var formatDateEnd = endString[2] + "-" + endString[1] + "-" + endString[0];

                var result = utils.getDays(new Date(formatDateStart), new Date(formatDateEnd));

                if (result.day >= 0 && formValid === true) {
                    error_container.textContent = "";
                    Core.service.book.festiveRoom.bookFestiveRoom(JSON.stringify(festiveRoomBookJson));

                    label_start_date.textContent = startDatepicker.value;
                    label_end_date.textContent = endDatepicker.value;

                } else {
                    error_container.textContent = "Veuillez choisir les dates de début et de fin de l'évènement.";
                }
            }, false);

        }();
    };

    Core.controller.festiveRoom.initServiceList = function(listServices){
        var list_booked_items = document.getElementById("list_booked_items");

        var createItem = function (id, object) {
            var div_reservation = document.createElement("div");
            var div_list;
            div_reservation.classList.add("div_reservation");

            if (object !== null) {
                var content_left = document.createElement("div");
                content_left.classList.add("content_left");

                var title_span = document.createElement("span");
                title_span.classList.add("title_span_black");
                title_span.style.textAlign = "left";
                title_span.textContent = utils.capitalizeFirstLetter(object.name) + " " + (Math.round(object.price * data.countryInfo.rate)) + " " + data.symbol;

                var input = document.createElement("input");
                input.classList.add("beauty_input");
                input.classList.add("item");
                input.id = id;
                input.type = "number";
                input.value = 0;
                input.min = 0;
                input.max = object.quantity;
                input.style.width = "150px";

                content_left.appendChild(title_span);
                content_left.appendChild(input);
                div_reservation.appendChild(content_left);
            }

            include_items.appendChild(div_reservation);
        };

        var initView = function () {
            for(var i = 0 ; i < listServices.length ; i++){
                createItem("item_" + listServices[i].id, listServices[i]);
            }
        }();
    };
    
    Core.controller.festiveRoom.bookServices = function(id){
        var listItems = document.getElementsByClassName("item");

        var arrayItem = [];
        for (var i = 0; i < listItems.length; i++) {
            var idService = listItems[i].id.split("_")[1];

            if(listItems[i].value > 0){
                arrayItem.push({
                    idFestiveRoomBooking : id,
                    idFestiveRoomService : idService,
                    quantity : listItems[i].value
                });
            }
        }

        Core.service.serviceBookedFestiveRoom.add(JSON.stringify(arrayItem));
    };

    Core.controller.festiveRoom.initResume = function(festiveRoomBook){
        var search_container = document.getElementById("search_container");
        var include_container = document.getElementById("include_book");
        var error_container = document.getElementById("error_container");

        error_container.textContent = "";
        search_container.style.display = "none";
        include_container.style.display = "inline-block";

    };

    Core.controller.festiveRoom.initlistItemsbooked = function(listItems){
        var container = document.getElementById("list_items");
        var createTemplate = function (item) {
            for(var i = 0 ; i < data.listFesiveRoomService.length ; i++){
                if(data.listFesiveRoomService[i].id == item.idFestiveRoomService){
                    var div = document.createElement("div");
                    div.style.display = "block";

                    var label = document.createElement("label");
                    var many = "";

                    if(item.quantity > 1)
                        many = "s";

                    label.className = "text_span";
                    label.textContent = item.quantity + " " + utils.capitalizeFirstLetter(data.listFesiveRoomService[i].name) + many + " : " + (Math.round((data.listFesiveRoomService[i].price * data.countryInfo.rate * item.quantity))) + " " + data.symbol;

                    div.appendChild(label);
                    container.appendChild(div);
                }
            }
        };

        
        for(var i = 0 ; i < listItems.length ; i++){
            createTemplate(listItems[i]);
        }

    };

    Core.controller.festiveRoom.initCostResume = function (cost) {
        var price = Math.round(cost * data.countryInfo.rate);
        var res = price + " " + data.symbol;

        document.getElementById("label_price").textContent = res;
    };

    Core.controller.festiveRoom.initCancelButton = function (id) {
        var search_container = document.getElementById("search_container");
        var include_container = document.getElementById("include_book");
        var  btn_return = document.getElementById("btn_return");
        utils.addListener(btn_return, "click", function (e) {
            Core.controller.includeContainer.switchView(data.viewList.festiveRoom.name);
            Core.service.book.festiveRoom.cancel(id);
        }, false);
    };

    Core.controller.festiveRoom.success = function () {
        var message = "Votre réservation a bien été effectuée";
        var color = "green";
        var pageObject = data.viewList.clientListBook;

        utils.redirectTimerMessage(message, color, pageObject);
    };

    Core.controller.festiveRoom.error = function () {
        var message = "Votre résevation n'a pas été effectuée";
        var color = "red";
        var pageObject = data.viewList.festiveRoom;

        utils.redirectTimerMessage(message, color, pageObject);
    };

})();