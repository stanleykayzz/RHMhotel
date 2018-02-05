/**
 * Created by maxime on 11/07/2017.
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.contact = Core.controller.contact || {};

    /**
     * Init the contact view
     * @param json
     */
    Core.controller.contact.initView = function (json) {
        var btn = document.getElementById("btn_contact");

        utils.addListener(btn, "click", function(){
            var name, email, phone, message;
            
            name = document.getElementById("name_contact");
            email = document.getElementById("email_contact");
            phone = document.getElementById("phone_contact");
            message = document.getElementById("message_contact");

            if(name.value === "")
                return;

            if(email.value === "")
                return;

            if(phone.value === "")
                return;

            if(message.value === "")
                return;

            var body = {

            };
            //utils.ajaxRequest(Core.service.contact.send(), null, json);
        }, false);

    };
})();
