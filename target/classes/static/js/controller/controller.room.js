/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.room = Core.controller.room || {};

    /**
     * Init the room view and events
     */
    Core.controller.room.initView = function () {
        service.pictureRoomCategory.getList();

        var startDatepicker, endDatepicker, btnSearch;
        var container;
        var startDateID = "#reservation_start_date";
        var endDateID = "#reservation_end_date";
        var minStart = new Date();
        var minEnd = new Date();

        minStart.setDate(minStart.getDate() + 3);
        minEnd.setDate(minEnd.getDate() + 4);

        utils.reservation.datePicker(startDateID, minStart, null);
        utils.reservation.datePicker(endDateID, minEnd, null);
        
        var initVariables = function () {
            startDatepicker = document.getElementById("reservation_start_date");
            endDatepicker = document.getElementById("reservation_end_date");
            btnSearch = document.getElementById("btn_search");
            container = document.getElementById("include_room");
        }();
        var manageEvents = function () {

            $(startDateID).datepicker("option", "onSelect", function () {
                var minDate = $(startDateID).datepicker("getDate");
                var minDateEnd = $(startDateID).datepicker("getDate");
                minDateEnd.setDate(minDateEnd.getDate() + 1);

                $(endDateID).datepicker("option", "minDate", minDateEnd);
                utils.empty(container);
                document.getElementById("include_reservation_list").style.display = "none";
            });

            $(endDateID).datepicker("option", "onSelect", function () {
                utils.empty(container);
                document.getElementById("include_reservation_list").style.display = "none";
            });

            utils.addListener(btnSearch, "click", function () {
                utils.empty(container);
                var jsonValidator = {
                    datepicker_start: startDatepicker,
                    datepicker_end: endDatepicker
                };

                var formValid = utils.form.formValidator(jsonValidator, startDatepicker.style);

                var startString = startDatepicker.value.split("/");
                var endString = endDatepicker.value.split("/");

                var jsonRoom = {
                    dateStart: startString[1] + "/" + startString[2] + "/" + startString[0],
                    dateEnd: endString[1] + "/" + endString[2] + "/" + endString[0]
                };

                var formatDateStart = startString[2] + "-" + startString[1] + "-" + startString[0];
                var formatDateEnd = endString[2] + "-" + endString[1] + "-" + endString[0];

                var result = utils.getDays(new Date(formatDateStart), new Date(formatDateEnd));

                if (result.day > 0) {
                    Core.service.room.search(jsonRoom);
                }
            }, false);
        }();
    };

    /**
     * Search the room by date start and end
     * @param listRoom
     */
    Core.controller.room.roomSearch = function (listRoom) {
        var container, searchContainer, bookingContainer, listReservationContainer;
        var startDatepicker, endDatepicker, reason, list_reservation, btn_book;
        var startString, endString, formatDateStart, formatDateEnd;
        var list_simple, list_double, list_junior, list_executive;
        var error_container;
        var jsonQuantity;

        var getDays = function () {
            return utils.getDays(new Date(formatDateStart), new Date(formatDateEnd));
        };
        var viewList = function (id, content, quantity) {
            var div;
            if (document.getElementById(id) === null || document.getElementById(id) === undefined) {
                div = document.createElement("div");
                div.id = id;
                div.style.display = "block";
            } else {
                div = document.getElementById(id);
                utils.empty(div);
            }

            div.style.marginTop = "5px";

            var span_container = document.createElement("span");
            span_container.classList.add("md_text_span");
            span_container.style.marginLeft = "5px";
            span_container.textContent += content + " " + quantity;

            var button_delete = document.createElement("span");
            button_delete.classList.add("glyphicon");
            button_delete.classList.add("glyphicon-remove");
            button_delete.style.cursor = "pointer";
            button_delete.name = id.split("type_")[1];

            utils.addListener(button_delete, "click", function (e) {
                delete jsonQuantity[e.target.name];
                utils.empty(e.target.parentElement);
            }, false);


            div.appendChild(button_delete);
            div.appendChild(span_container);
            list_reservation.appendChild(div);

        };
        var viewRoom = function (id, number, json, path) {
            var divRoom, imageRoom, contentRoom, container_title,
                titleRoom, disponible_container, disponible,
                disponible_result, costbynight_container, costbynight,
                costbynight_result_franc,
                cost_container, cost, cost_result_franc,
                description_container, description_text_container, description_result,
                day_container, day, day_result, btn_add,
                quantity, quantity_container, quantity_result;

            var initVariables = function () {
                var price = service.payment.getLocalPrice(json.price);

                divRoom = document.createElement("div");
                divRoom.id = id;
                divRoom.classList.add("room_type_div");

                imageRoom = document.createElement("img");
                imageRoom.classList.add("room_type_image");
                imageRoom.src = path;

                contentRoom = document.createElement("div");
                contentRoom.classList.add("room_content");

                container_title = document.createElement("div");
                container_title.classList.add("reserv_container");

                titleRoom = document.createElement("span");
                titleRoom.classList.add("room_title");
                titleRoom.textContent = json.name;

                disponible_container = document.createElement("div");
                disponible_container.classList.add("reserv_container");
                disponible_container.style.textAlign = "left";
                disponible_container.style.paddingLeft = "10px";

                disponible = document.createElement("span");
                disponible.classList.add("title_span");
                disponible.classList.add("available");
                disponible.textContent = "Disponible : ";

                disponible_result = document.createElement("span");
                disponible_result.classList.add("title_span");
                disponible_result.classList.add("available");
                disponible_result.textContent = number;

                costbynight_container = document.createElement("div");
                costbynight_container.classList.add("reserv_container");
                costbynight_container.style.textAlign = "left";
                costbynight_container.style.paddingLeft = "10px";

                costbynight = document.createElement("span");
                costbynight.classList.add("title_span");
                costbynight.textContent = "Coût par nuit : ";

                costbynight_result_franc = document.createElement("span");
                costbynight_result_franc.classList.add("text_span");
                costbynight_result_franc.textContent = price + " " + data.symbol;

                cost_container = document.createElement("div");
                cost_container.classList.add("reserv_container");
                cost_container.style.textAlign = "left";
                cost_container.style.paddingLeft = "10px";

                cost = document.createElement("span");
                cost.classList.add("title_span");
                cost.textContent = "Coût du séjour : ";

                cost_result_franc = document.createElement("span");
                cost_result_franc.classList.add("text_span");
                cost_result_franc.textContent = "0 " + data.symbol;

                description_container = document.createElement("div");
                description_container.classList.add("reserv_container");

                description_text_container = document.createElement("div");
                description_text_container.classList.add("description_text_container");

                description_result = document.createElement("span");
                description_result.classList.add("description_span");
                description_result.textContent = json.description;

                day_container = document.createElement("div");
                day_container.classList.add("reserv_container");
                day_container.style.textAlign = "left";
                day_container.style.paddingLeft = "10px";

                day = document.createElement("span");
                day.classList.add("title_span");
                day.textContent = "Durée du séjour : ";

                day_result = document.createElement("span");
                day_result.classList.add("text_span");
                day_result.textContent = getDays().day + " jours";

                quantity_container = document.createElement("div");
                quantity_container.classList.add("reserv_container");
                quantity_container.style.textAlign = "left";
                quantity_container.style.paddingLeft = "10px";

                quantity = document.createElement("span");
                quantity.classList.add("title_span");
                quantity.textContent = "Quantité : ";

                quantity_result = document.createElement("input");
                quantity_result.classList.add("quantity_input");
                quantity_result.classList.add("text_span");
                quantity_result.type = "number";
                quantity_result.value = "0";
                quantity_result.min = "0";
                quantity_result.max = number;
                utils.addListener(quantity_result, "change", function (e) {
                    var c = price * getDays().day * e.target.value;
                    var cost = Math.round(c);
                    cost_result_franc.textContent = cost + " " + data.symbol;
                }, false);

                utils.addListener(quantity_result, "keydown", function (e) {
                    utils.pauseEvent(e);
                }, false);

                if(number > 0){
                    btn_add = document.createElement("a");
                    btn_add.id = "btn_type_" + json.id;
                    btn_add.classList.add("btn_reservation");
                    btn_add.name = json.id;
                    btn_add.textContent = "AJOUTER";

                    utils.addListener(btn_add, "click", function (e) {
                        var quantity = e.target.parentElement.getElementsByClassName("quantity_input")[0].value;

                        if(quantity > 0){
                            var name = e.target.getAttribute("name");

                            jsonQuantity[e.target.name] = {
                                idCategory: e.target.name,
                                quantity: quantity
                            };

                            viewList("list_" + e.target.id, json.name, "X" + quantity);
                        }

                    }, false);
                } else {
                    btn_add = document.createElement("a");
                    btn_add.id = "btn_type_" + json.id;
                    btn_add.classList.add("btn_reservation");
                    btn_add.style.backgroundColor = "black";
                    btn_add.name = json.id;
                    btn_add.textContent = "INDISPONIBLE"
                }


            }();
            var appendElements = function () {
                divRoom.appendChild(imageRoom);
                divRoom.appendChild(contentRoom);

                container_title.appendChild(titleRoom);

                contentRoom.appendChild(container_title);
                contentRoom.appendChild(description_text_container);
                contentRoom.appendChild(costbynight_container);
                contentRoom.appendChild(cost_container);
                contentRoom.appendChild(day_container);
                contentRoom.appendChild(quantity_container);
                contentRoom.appendChild(disponible_container);
                contentRoom.appendChild(btn_add);

                disponible_container.appendChild(disponible);
                disponible_container.appendChild(disponible_result);

                cost_container.appendChild(cost);
                cost_container.appendChild(cost_result_franc);

                costbynight_container.appendChild(costbynight);
                costbynight_container.appendChild(costbynight_result_franc);

                day_container.appendChild(day);
                day_container.appendChild(day_result);

                quantity_container.appendChild(quantity);
                quantity_container.appendChild(quantity_result);

                description_text_container.appendChild(description_result);

                container.appendChild(divRoom);
            }();

            return btn_add;
        };
        var initVariables = function () {
            container = document.getElementById("include_room");
            searchContainer = document.getElementById("search_container");
            bookingContainer = document.getElementById("include_reservation");
            reason = document.getElementById("reservation_reason");
            list_reservation = document.getElementById("list_reservation");
            listReservationContainer = document.getElementById("include_reservation_list");
            listReservationContainer.style.display = "flex";

            startDatepicker = document.getElementById("reservation_start_date");
            endDatepicker = document.getElementById("reservation_end_date");

            startString = startDatepicker.value.split("/");
            endString = endDatepicker.value.split("/");

            formatDateStart = startString[2] + "-" + startString[1] + "-" + startString[0];
            formatDateEnd = endString[2] + "-" + endString[1] + "-" + endString[0];

            list_simple = document.getElementById("simpleRoom_content");
            list_double = document.getElementById("doubleRoom_content");
            list_junior = document.getElementById("junior_content");
            list_executive = document.getElementById("executive_content");

            btn_book = document.getElementById("btn_book");
            error_container = document.getElementById("error_container");

            jsonQuantity = {};
        }();
        var initView = function () {
            var listType = new Object(null);

            for (var c in data.listRoomCategories) {
                listType[data.listRoomCategories[c].id] = 0;
                for (var r in listRoom) {
                    if (listRoom[r].roomCategory.id === data.listRoomCategories[c].id) {
                        listType[data.listRoomCategories[c].id] += 1;
                    }
                }
                var path = function () {
                    for (var p in data.listPictureRoomCategory) {
                        if (data.listRoomCategories[c].id === data.listPictureRoomCategory[p].idRoomCategory)
                            return data.listPictureRoomCategory[p].path;
                    }
                };
                var viewRoomBtn = viewRoom("room_" + c, listType[data.listRoomCategories[c].id], data.listRoomCategories[c], path());
            }

            utils.addListener(btn_book, "click", function (e) {
                error_container.textContent = "";

                if (Object.keys(jsonQuantity).length === 0 && jsonQuantity.constructor === Object) {
                    error_container.textContent = "Vous devez choisir au moins une chambre pour accéder au paiement";
                    return;
                }

                if (!window.client) {
                    controller.includeContainer.switchView("connexion");
                    return;
                }

                var body = [];
                searchContainer.style.display = "none";
                bookingContainer.style.display = "block";

                for (var r in jsonQuantity) {

                    var quantity = parseInt(jsonQuantity[r].quantity);
                    for (var i = 0; i < quantity; i++) {

                        body.push({
                            "dateStart": formatDateStart,
                            "dateEnd": formatDateEnd,
                            "idRoomCategory": jsonQuantity[r].idCategory,
                            "reason": reason.value
                            });
                    }
                }

                Core.service.book.room.bookRoom(JSON.stringify(body));
            }, false);
        }();
    };

    /**
     * Init the view book room
     * @param dateStart
     * @param dateEnd
     * @param list
     */
    Core.controller.room.roomBooking = function (listRoomBooking) {
        var labelDateStart, labelDateEnd, labelBook, image,
            container, btn_return;

        var getCategoryName = function(id){
            var list = data.listRoomCategories;
            for(var i = 0 ; i < list.length ; i++){
                if(list[i].id === id)
                    return list[i].name;

            }
        };
        var getCategoryQuantity = function (lrb) {
            var jsonQuantity = {};

            for(var i = 0 ; i < lrb.length ; i++){
                var idCategory = lrb[i].idRoomCategory;

                if(jsonQuantity[idCategory] !== null && jsonQuantity[idCategory] !== undefined){
                    jsonQuantity[idCategory].quantity += 1;
                } else {
                    jsonQuantity[idCategory] = new Object();
                    jsonQuantity[idCategory].id = idCategory;
                    jsonQuantity[idCategory].quantity = 1;
                    jsonQuantity[idCategory].name = getCategoryName(idCategory);
                }
            }

            return jsonQuantity;
        };
        var initVariables = function () {
            container = document.getElementById("include_reservation");
            labelDateStart = document.getElementById("label_start_date");
            labelDateEnd = document.getElementById("label_end_date");
            labelBook = document.getElementById("labelBook");
            image = document.getElementById("image_reservation");
            btn_return = document.getElementById("btn_return");
        }();
        var initView = function () {
            var monthNames = [
                "Janvier", "Février", "Mars",
                "Avril", "Mai", "Juin", "Juillet",
                "Août", "Septembre", "Octobre",
                "Novembre", "Decembre"
            ];
            var listCateg = getCategoryQuantity(listRoomBooking);
            var keys = Object.keys(listCateg);

            var dateStart = new Date(listRoomBooking[0].dateStart);
            var dateEnd = new Date(listRoomBooking[0].dateEnd);

            labelDateStart.textContent = dateStart.getDate() + " "  + monthNames[dateStart.getMonth()] + " " + dateStart.getFullYear();
            labelDateEnd.textContent = dateEnd.getDate() + " "  + monthNames[dateEnd.getMonth()] + " " + dateEnd.getFullYear();

            for (var l = 0 ; l < keys.length ; l++) {
                var span = document.createElement("span");
                span.classList.add("text_span");
                span.textContent = "X" + listCateg[keys[l]].quantity + " " + utils.capitalizeFirstLetter(listCateg[keys[l]].name);

                labelBook.appendChild(span);
            }


            utils.addListener(btn_return, "click", function (e) {
                Core.service.book.room.cancelBookRoom(data.rbr);
                data.rbr = null;
            }, false);
            
        }();

    };
    
    Core.controller.room.updatePrice = function(price){
        var localPrice = price * data.countryInfo.rate;
        document.querySelector("#label_price").textContent = Math.round(localPrice) + " " + data.symbol;
    };

    Core.controller.room.error = function(){
        var pageObject = data.viewList.chambre;
        var message = "Une erreur est survenue";
        var color = "red";

        utils.redirectTimerMessage(message, color, pageObject);
    };

    Core.controller.room.success = function(){
        var pageObject = data.viewList.clientListBook;
        var message = "Votre réservation a bien été effectuée.";
        var color = "green";

        utils.redirectTimerMessage(message, color, pageObject);
    };

})();
