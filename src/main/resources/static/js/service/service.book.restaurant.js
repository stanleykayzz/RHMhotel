/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.book.restaurant = Core.service.book.restaurant || {};

    /**
     * The callback func display to the client if the book is available
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.book.restaurant.bookRestaurant = function (restaurantBook) {
        var paramRequest = "token=" + client.token;
        var object =  {
            name: "bookRestaurant",
            method: "POST",
            url: "/restaurantTableBooking",
            func: function () {
                document.getElementById("error_container").textContent = "";
                document.getElementById("valide_container").textContent = "Réservation effectuée";
            },
            error: function (statusCode) {
                document.getElementById("valide_container").textContent = "";
                document.getElementById("error_container").textContent = "";
                if(statusCode == 406){
                    utils.displayError("Nombre de places disponibles insuffisant");
                } else if(statusCode == 404){
                    utils.displayError("Vous avez déjà effectué une réservation");
                } else {
                    utils.displayError("La date limite de réservation pour cette plage horaire est dépassée pour aujourd'hui");
                }
            }
        };

        utils.ajaxRequest(object, paramRequest, restaurantBook, false, true);
    };

    Core.service.book.restaurant.update = function (restaurantBook) {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "update",
            method: "PUT",
            url: "/restaurantTableBooking",
            func: function () {

            },
            error: function (statusCode) {

            }
        };

        utils.ajaxRequest(object, paramRequest, restaurantBook);
    };

    Core.service.book.restaurant.getByIdClient = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getByIdClient",
            method: "GET",
            url: "/restaurantTableBooking/getByIdClient",
            func: function (list) {
                Core.controller.clientListBook.initListRestaurant(list);
            },
            error: function (statusCode) {

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.book.restaurant.cancel = function (id) {
        var paramRequest = "token=" + client.token + "&id=" + id;

        var object =  {
            name: "cancel",
            method: "PUT",
            url: "/restaurantTableBooking/cancel",
            func: function (id) {
                  Core.service.book.restaurant.getByIdClient();
            },
            error: function (statusCode) {
                utils.displayError("La réservation ne peut plus être annulée");
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    /**
     * Generate the restaurant list book by id client
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.book.restaurant.getListBookById = function () {
        var paramRequest = "token=" + client.token;

        var object = {
            name: "bookRestaurant",
            method: "GET",
            url: "/restaurantTableBooking",
            func: function (json) {
                var headers = {
                    date : {
                        content: "Date"
                    },
                    type: {
                       content: "Plage horaire"
                    },
                    number:{
                        content:  "Nombre de personnes"
                    }
                };

                utils.template.createLiTemplate(headers, json, document.getElementById("book_restaurant_content"), "read");
            },
            error: function (statusCode) {

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

})();