/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if (typeof Core === "undefined")
        throw "Core is not declared";

    Core.controller.clientAccount = Core.controller.clientAccount || {};

    /**
     * Init the account controller
     */
    Core.controller.clientAccount.initView = function () {
        controller.clientAccount.account();
        controller.clientAccount.updateAccount();
    };

    /**
     * Display the view account for a client
     */
    Core.controller.clientAccount.account = function () {
        var name, firstName, birthday, email, phone,
            country, city, address, postalCode, sexe;

        var initVariables = function () {
            name = document.getElementById("user_lastname");
            firstName = document.getElementById("user_firstname");
            birthday = document.getElementById("user_birthday");
            email = document.getElementById("user_email");
            phone = document.getElementById("user_tel");
            country = document.getElementById("user_country");
            city = document.getElementById("user_city");
            address = document.getElementById("user_address");
            postalCode = document.getElementById("user_postal_code");
            sexe = document.getElementById("user_sexe");
        }();
        var setContent = function () {
            name.textContent = utils.capitalizeFirstLetter(window.client.lastName);
            firstName.textContent = utils.capitalizeFirstLetter(client.firstName);
            birthday.textContent = utils.formatDate(client.birthday, "view_account");
            email.textContent = client.email;
            phone.textContent = client.phone;
            country.textContent = utils.capitalizeFirstLetter(client.country);
            city.textContent = utils.capitalizeFirstLetter(client.city);
            address.textContent = client.address;
            postalCode.textContent = client.postalCode;

            if (window.client.sexe == 0)
                sexe.textContent = "Homme";
            else if (client.sexe == 1)
                sexe.textContent = "Femme";
        }();
        var viewEvents = function () {
            var container_account, container_update, btn_update;

            btn_update = document.getElementById("btn_update");

            container_update = document.getElementById("show_update");
            container_account = document.getElementById("show_account");

            utils.addListener(btn_update, "click", function () {
                container_account.style.display = "none";
                container_update.style.display = "inline-block";
            }, false);
        }();
    };

    /**
     * Display the update view account for a client
     */
    Core.controller.clientAccount.updateAccount = function () {
        var phone_update, country_update, city_update, address_update, postalCode_update,
            new_password_update, verif_paswword_update, current_password_update, jsonPassword;

        var error_container = document.getElementById("error_container");
        var btn_update;
        var style = null;

        var initVariables = function () {
            new_password_update = document.getElementById("user_update_password_new");
            verif_paswword_update = document.getElementById("user_update_password_verif");
            current_password_update = document.getElementById("user_update_password_current");
            phone_update = document.getElementById("user_update_tel");
            country_update = document.getElementById("user_update_country");
            city_update = document.getElementById("user_update_city");
            address_update = document.getElementById("user_update_address");
            postalCode_update = document.getElementById("user_update_postal_code");
            btn_update = document.getElementById("btn_update_account");
        }();
        var setContent = function () {
            phone_update.value = client.phone;
            country_update.value = utils.capitalizeFirstLetter(client.country);
            city_update.value = utils.capitalizeFirstLetter(client.city);
            address_update.value = client.address;
            postalCode_update.value = client.postalCode;
        }();
        var viewEvents = function () {
            var container_account, container_update;

            var btn_back = document.getElementById("btn_update_account_back");

            container_account = document.getElementById("show_account");
            container_update = document.getElementById("show_update");

            utils.addListener(btn_back, "click", function () {
                container_update.style.display = "none";
                container_account.style.display = "inline-block";
            }, false);
        }();
        var requestEvents = function () {
            utils.addListener(btn_update, "click", function () {
                error_container.textContent = "";

                if(style === null)
                    style = phone_update.style.borderBottom;

                var json = {
                    phone: phone_update,
                    country: country_update,
                    city: city_update,
                    address: address_update,
                    postalcode: postalCode_update
                };

                if (current_password_update.value === null
                    || current_password_update.value === undefined
                    || current_password_update.value === "") {

                    error_container.textContent = "Veuillez saisir votre mot de passe pour modifier les informations.";
                    return;
                }
                if (new_password_update.value !== null
                    && new_password_update.value !== undefined
                    && new_password_update.value !== "") {

                    json.password = new_password_update;
                    json.password_2 = verif_paswword_update;
                    jsonPassword = new_password_update;
                } else {
                    jsonPassword = current_password_update;
                }

                var formValid = utils.form.formValidator(json, "border-bottom", style, "1px solid red");
           
                if (formValid === true) {
                    var date = utils.formatDate(client.birthday, "update_account");
                    var clientJson = '{' +
                        '"phone":      "' + phone_update.value + '",' +
                        '"country":    "' + country_update.value + '",' +
                        '"city":       "' + city_update.value + '",' +
                        '"address":    "' + address_update.value + '",' +
                        '"postalCode": "' + postalCode_update.value + '",' +
                        '"password":   "' + jsonPassword.value + '"' +
                        '}';

                    client.update(clientJson, current_password_update.value);
                }
            }, false);
        }();
    };
})();