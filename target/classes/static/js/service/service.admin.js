/**
 * Created by maxime on 01/10/2017.
 */
;(function () {
    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.service.admin = Core.service.admin || {};

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.admin.getListClient = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListClient",
            method: "GET",
            url: "/client/getListClient",
            func: function (list) {
                data.adminPanel.listClient = list;
                Core.controller.admin.displayListClient(list);
                Core.controller.admin.initToolsClient();
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListRoomBook = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListRoomBook",
            method: "GET",
            url: "/roomBooking/getListActivated",
            func: function (list) {
                data.adminPanel.listRoomBook = list;
                Core.controller.admin.displayListBookRoom(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListRoomBookHold = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListRoomBook",
            method: "GET",
            url: "/roomBooking/getListActivatedHold",
            func: function (list) {
                data.adminPanel.listRoomBookHold = list;
                Core.controller.admin.displayListBookRoomHold(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListRestaurantBook = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListRestaurantBook",
            method: "GET",
            url: "/restaurantTableBooking/getListByCurrentDate",
            func: function (list) {
                data.adminPanel.listRestaurantBook = list;
                Core.controller.admin.displayListBookRestaurant(list);
                Core.controller.admin.initToolsRestaurant();
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListFestiveRoomBook = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListFestiveRoomBook",
            method: "GET",
            url: "/festiveRoomBooking/getListValidated",
            func: function (list) {
                data.adminPanel.listFestiveRoomBook = list;
                Core.service.admin.getListServiceFestiveRoom();
                Core.service.admin.getListFestiveRoomBookServices(data.adminPanel.listFestiveRoomBook);
                Core.controller.admin.displayListBookFestiveRoom(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListFestiveRoomBookServices = function (list) {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListFestiveRoomBookServices",
            method: "POST",
            url: "/festiveRoomBookingServices/getByListFestiveRoomBook",
            func: function (list) {
                data.adminPanel.listFestiveRoomBookServices = list;
                Core.controller.admin.displayListBookFestiveRoomServices(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest, JSON.stringify(list));
    };

    Core.service.admin.getListRoom = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListRoom",
            method: "GET",
            url: "/room",
            func: function (list) {
                data.adminPanel.listRoom = list;
                Core.service.invalidDateRoom.getListinvalidDateRoom();
                Core.service.category.getListCategories();
                Core.controller.admin.displayListRoom(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListRestaurantTable = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListRestaurantTable",
            method: "GET",
            url: "/restaurantTable",
            func: function (list) {
                data.adminPanel.listRestaurant = list;
                Core.controller.admin.displayListRestaurantTable(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListFestiveRoom = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListFestiveRoom",
            method: "GET",
            url: "/festiveRoom",
            func: function (list) {
                data.adminPanel.listFestiveRoom = list;
                Core.service.festiveRoom.services.getListAdmin();
                Core.service.invalidDateFestiveRoom.getListInvalidDateFestiveRoom();
                Core.controller.admin.displayListFestiveRoom(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListBuildings = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListBuildings",
            method: "GET",
            url: "/building",
            func: function (list) {
                data.adminPanel.listBuilding = list;
                Core.controller.admin.displayListBuildings(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListArticles = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListArticles",
            method: "GET",
            url: "/article/all",
            func: function (list) {
                data.adminPanel.listArticle = list;
                Core.controller.admin.displayListArticles(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListGalery = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListGalery",
            method: "GET",
            url: "/pictureGalery",
            func: function (list) {
                data.adminPanel.listGalery = list;
                Core.controller.admin.displayListGalery(list);
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest, null);
    };

    Core.service.admin.sendNewsLetter = function (newsLetter, subject) {
        var paramRequest = "subject=" + subject + "&token=" + client.token;

        var object =  {
            name: "sendNewsLetter",
            method: "POST",
            url: "/newsletter",
            func: function () {
                Core.controller.admin.displaySendNewsLetter();
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest, newsLetter, false, true);
    };

    Core.service.admin.getListServiceFestiveRoom = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListServiceFestiveRoom",
            method: "GET",
            url: "/festiveRoomService",
            func: function (list) {
                data.adminPanel.listFestiveRoomServices = list;
            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListServiceFestiveRoomBookById = function (idFestiveRoomBook) {
        var paramRequest = "id=" + idFestiveRoomBook + "&token=" + client.token;

        var object =  {
            name: "getListServiceFestiveRoomBook",
            method: "GET",
            url: "/festiveRoomBookingServices/getById",
            func: function (list) {

            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListServiceFestiveRoomBookById = function (idFestiveRoomBook) {
        var paramRequest = "id=" + idFestiveRoomBook + "&token=" + client.token;

        var object =  {
            name: "getListServiceFestiveRoomBook",
            method: "GET",
            url: "/festiveRoomBookingServices/getById",
            func: function (list) {

            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListInvalideDateFestiveRoom = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListInvalideDateFestiveRoom",
            method: "GET",
            url: "/invalidBookingDateFestiveRoom",
            func: function (list) {

            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };

    Core.service.admin.getListInvalideDateRoom = function () {
        var paramRequest = "token=" + client.token;

        var object =  {
            name: "getListInvalideDateRoom",
            method: "GET",
            url: "/invalidBookingDateRoom",
            func: function (list) {

            },
            error: function (statusCode) {
            }
        };

        utils.ajaxRequest(object, paramRequest);
    };
})();