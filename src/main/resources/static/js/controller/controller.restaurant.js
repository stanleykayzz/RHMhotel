/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.restaurant = Core.controller.restaurant || {};

    /**
     * Init the restaurant view and events
     */
    Core.controller.restaurant.initView = function () {
        var typeElement, numberElement, btn_booking;

        typeElement = document.getElementById("select_time");
        numberElement = document.getElementById("text_number");
        btn_booking = document.getElementById("btn_search_table");

        numberElement.value = 1;

        utils.addListener(btn_booking, "click", function () {
            var date = new Date();
            var res;
            var month = date.getMonth() + 1;
            var offset = Core.utils.getTimezone();

            switch (typeElement.options[typeElement.selectedIndex].value) {
                case "m_0":
                    res = date.getFullYear() + "-" + month + "-" + date.getDate() + "T12:00:00" + offset;
                    break;
                case "m_1":
                    res = date.getFullYear() + "-" + month + "-" + date.getDate() + "T13:00:00" + offset;
                    break;
                case "m_3":
                    res = date.getFullYear() + "-" + month + "-" + date.getDate() + "T19:30:00" + offset;
                    break;
                case "m_4":
                    res = date.getFullYear() + "-" + month + "-" + date.getDate() + "T20:30:00" + offset;
                    break;
                case "m_5":
                    res = date.getFullYear() + "-" + month + "-" + date.getDate() + "T21:30:00" + offset;
                    break;
            }

            var json = {
                date: res,
                number: numberElement.value,
                idClient: window.client.id
            };

            if(numberElement.value > 0){
                Core.service.book.restaurant.bookRestaurant(JSON.stringify(json));
            } else {
                document.getElementById("error_container").textContent = "Veuillez saisir le nombre de places"
            }

        }, false);
    };

})();
