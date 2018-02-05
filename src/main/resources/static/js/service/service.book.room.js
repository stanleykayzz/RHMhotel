/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.book.room = Core.service.book.room || {};

    /**
     * Generate the paypal button with the book price
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.book.room.bookRoom = function (listRoomBooking) {
        var paramRequest = "token=" + client.token;

        var object = {
            name   : "bookRoom",
            method : "POST",
            url    : "/roomBooking",
            func : function (listRoomBooking) {
                data.rbr = listRoomBooking[0].refRoomBook;
                Core.controller.room.roomBooking(listRoomBooking);
                Core.service.server.getKey();
                Core.service.book.room.getPrice(data.rbr);
                Core.service.book.room.getLocalCost(data.rbr);
            },
            error : function(statusCode){
                Core.controller.room.error();
            }
        };

        utils.ajaxRequest(object, paramRequest, listRoomBooking);
    };

    Core.service.book.room.validate = function (refBookRoom) {

        var paramRequest = "refBookRoom=" + data.rbr  + "&token=" + client.token;

        var object = {
            name   : "validate",
            method : "PUT",
            url    : "/roomBooking/validate",
            func : function () {                
                data.rbr = null;
                Core.controller.room.success();
            },
            error : function(statusCode){
                Core.controller.room.error();
            }
        };
        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    Core.service.book.room.getPrice = function (refBookRoom) {
       
        var paramRequest = "refBookRoom=" + refBookRoom + "&ipClient=" + data.clientIp;

        var object = {
            name   : "getPrice",
            method : "GET",
            url    : "/roomBooking/getPrice",
            func : function (price) {
                Core.payment.paypal.generateButton(price, service.book.room.validate);
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.book.room.getLocalCost = function(refBookRoom){
        var requestParam = "refBookRoom=" + refBookRoom;
        var object = {
            name   : "getLocalCost",
            method : "GET",
            url    : "/roomBooking/getLocalPrice",
            func : function (price) {
                Core.controller.room.updatePrice(price);
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, requestParam);
    };

    Core.service.book.room.getlistRoomById = function(){
        var requestParam = "token=" + client.token;
        var object = {
            name   : "getlistRoomById",
            method : "GET",
            url    : "/roomBooking/getListByIdClient",
            func : function (list) {
                Core.controller.clientListBook.initListRoom(list);
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, requestParam);
    };

    /**
     * Return the current list book for admin (status: 0) and client (status: 1)
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.book.room.getCurrentList = function () {
        var object = {
            name   : "getListById",
            method : "GET",
            url    : "/roomBooking",
            func : function (json) {
                var headers;
                if(client.status === 0){
                    headers = {
                        number: {
                            content: "Numéro de chambre"
                        },
                        lastName:{
                            content: "Nom"
                        },
                        firstName:{
                            content: "Prénom"
                        },
                        date_start : {
                            content: "Arrivée"
                        },
                        date_end: {
                            content: "Départ"
                        },
                        type:{
                            content:  "Type"
                        },
                        price: {
                            content: "Prix"
                        }
                    };
                } else if(client.status === 1){
                    headers = {
                        number: {
                            content: "Numéro de chambre"
                        },
                        date_start : {
                            content: "Arrivée"
                        },
                        date_end: {
                            content: "Départ"
                        },
                        type:{
                            content:  "Type"
                        },
                        price: {
                            content: "Prix"
                        }
                    };
                }
                utils.template.createLiTemplate(headers, json, document.getElementById("book_room_active_content"), "read");
            },
            error : function(statusCode){
            }
        };
    };

    /**
     * Cancel the temporaly book
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.book.room.cancelBookRoom = function (refBookRoom) {
        var paramRequest = "refBookRoom=" + refBookRoom;

        var object = {
            name   : "cancelBookRoom",
            method : "PUT",
            url    : "/roomBooking/cancelBook",
            func : function () {
                Core.controller.includeContainer.switchView("chambre");
            },
            error : function(statusCode){
            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };
    
})();