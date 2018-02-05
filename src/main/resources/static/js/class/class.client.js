/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function () {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";

    Core.class = Core.class || {};
    Core.class.client = Core.class.client || {};

    Core.class.client = function(clientJson){
        this.accreditation = clientJson.accreditation;
        this.address       = clientJson.address;
        this.birthday      = clientJson.birthday;
        this.sexe          = clientJson.sexe;
        this.city          = clientJson.city;
        this.id            = clientJson.id;
        this.country       = clientJson.country;
        this.email         = clientJson.email;
        this.firstName     = clientJson.firstName;
        this.lastName      = clientJson.lastName;
        this.password      = clientJson.password;
        this.phone         = clientJson.phone;
        this.postalCode    = clientJson.postalCode;
        this.statusActif  = clientJson.statusActif;
        this.token         = clientJson.token;
        this.tokenDate     = clientJson.tokenDate;
    };

    /**
     * The client can login with is email and password
     * @param email
     * @param password
     */
    Core.class.client.login = function (email, password) {
        var paramRequest = "email="+email+"&password="+password;
         utils.ajaxRequest(Core.service.client.login(), paramRequest, null);
    };

    /**
     * Validate the account of a new client
     * @param code
     */
    Core.class.client.confirmation = function (code) {
        var paramRequest = "email=" + window.sessionStorage.getItem("tmp_email") + "&code=" + code;
        utils.ajaxRequest(Core.service.client.confirmation(), paramRequest, null);
    };

    /**
     * Create a new client
     * @param client
     */
    Core.class.client.signup = function (client) {
        utils.ajaxRequest(Core.service.client.signup(), null, client);
    };

    /**
     * Remove the client session
     */
    Core.class.client.removeSessionStorage = function () {
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("token_date");
    };

    /**
     * Reload the client session
     */
    Core.class.client.reloadClient = function () {
        var token = window.sessionStorage.getItem("token");
        var paramRequest = "token=" + token;
        
        if(token !== null && token !== undefined){
            utils.ajaxRequest(Core.service.client.getClientByToken(), paramRequest, null, true);
        } else {
            Core.controller.menu.addContextualMenuButtons();
        }
    };

    /**
     * Display the client list in the admin panel
     */
    Core.class.client.initAdminViewListClients = function () {
        var paramRequest = "token=" + client.token;
        utils.ajaxRequest(Core.service.client.initAdminViewListClients(), paramRequest, null);
    };

    //Prototype function

    /**
     * Disconnect the client and remove the session
     */
    Core.class.client.prototype.logout = function () {
        var paramRequest = "token=" + client.token;
        utils.ajaxRequest(Core.service.client.logout(), paramRequest, null);
    };

    /**
     * Update the client account
     * @param client
     * @param password
     */
    Core.class.client.prototype.update = function (client, password) {
        var paramRequest = "token="+ window.client.token + "&password=" + password;
        utils.ajaxRequest(Core.service.client.update(), paramRequest, client);
    };

    /**
     * Create the client session
     * @param token
     * @param tokenDate
     */
    Core.class.client.prototype.createSessionStorage = function (token, tokenDate) {
        var tokenAvailable = utils.verifSessionStorage(tokenDate);

        if(tokenAvailable === true){
            window.sessionStorage.setItem("token", token);
            window.sessionStorage.setItem("token_date", tokenDate);
        }
    };

    /**
     * Update the token date
     * @param token
     */
    Core.class.client.prototype.reloadTokenDate = function (token) {
        var paramRequest = "token="+ window.client.token;
        utils.ajaxRequest(Core.service.client.reloadToken(), paramRequest, client, true);
    };
})();