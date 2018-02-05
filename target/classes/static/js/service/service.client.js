/**
 * Created by maxime.
 *
 * version 1.0.0
 */
;(function(undefined) {
    "use strict";

    if(typeof Core === "undefined")
        throw "Core is not declared";
    
    Core.service.client = Core.service.client || {};

    /**
     * Create the session if the client code is available , else redirect on confirmation view
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.login = function () {
        return {
            name   : "login",
            method : "GET",
            url    : "/client/login",
            func : function (client) {
                Core.controller.clientSignInAndUp.loginSuccess(client);
                Core.service.festiveRoom.get();
            },
            error : function(statusCode){
                Core.controller.clientSignInAndUp.loginFailed(statusCode);
            }
        };
    };

    /**
     * Redirect on the singin page if the signup is available
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.signup = function () {
        return {
            name : "signup",
            method : "POST",
            url : "/client",
            func : function (clt) {
                var pageObject = data.viewList.connexion;

                var viewSuccess  = function () {
                    utils.empty(data.getIncludeContainer());
                    data.getIncludeContainer().innerHTML = ""+
                        "<div style='display: inline-block; width: 100%; color: #3c763d; text-align: center; padding-bottom: 40px;'>"+
                        "</br>Inscription réussi, vous allez être redirigé vers la page de connexion."+
                        "</br>N'oubliez pas de valider votre email.</h2></div>";
                }();
                var redirection = function () {
                    var timeOut = function(){
                        var tmID = setTimeout(function(){
                            Core.utils.empty(data.getIncludeContainer());
                            utils.include(pageObject.viewPath, pageObject.name);
                        }, 3500);
                    }();
                }();
            },
            error : function(statusCode){
                document.getElementById("error_container").textContent = "L'email existe déjà.";
                document.getElementById("signup_email").style.border = "1px solid red";
                document.getElementById("emailBtn").value = "";
                document.getElementById("passwordBtn").value = "";
            }
        };
    };

    /**
     * Remove the client session
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.logout = function () {
        return {
            name : "logout",
            method : "GET",
            url : "/client/logout",
            func : function () {
                Core.class.client.removeSessionStorage();
                window.client = null;
                controller.includeContainer.switchView("accueil");
                controller.menu.addContextualMenuButtons();
            },
            error : function(statusCode){
            }
        };
    };

    /**
     * Update the client account
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.update = function () {
        return {
            name : "update",
            method : "POST",
            url : "/client/update",
            func : function (clt) {
                window.client = new Core.class.client(clt);
                client.createSessionStorage(client.token, client.tokenDate);
                controller.includeContainer.switchView("compte");
            },
            error : function(statusCode){
                var error_container = document.getElementById("error_container");
                error_container.textContent = "Mauvais mot de passe"
            }
        };
    };

    /**
     * Update the token client date
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.reloadToken = function () {
        return {
            name : "reloadToken",
            method : "GET",
            url : "/client/reloadToken",
            func : function (newTokenDate) {
                client.tokenDate = newTokenDate;
                client.createSessionStorage(client.tokenDate);
                controller.menu.addContextualMenuButtons();
            },
            error : function(statusCode){
                Core.class.client.removeSessionStorage();
                window.client = null;
                controller.includeContainer.switchView("connexion");
                controller.menu.addContextualMenuButtons();
            }
        };
    };

    /**
     * Store the client into a global variable
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.getClientByToken = function () {
        return {
            name : "getClientByToken",
            method : "GET",
            url : "/client/getByToken",
            func : function (clt) {
                window.client = new Core.class.client(clt);
            },
            error : function(statusCode){
                Core.class.client.removeSessionStorage();
                controller.menu.addContextualMenuButtons();
            }
        };
    };

    /**
     * Validate the email and create the client session
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.confirmation = function () {
        return {
            name : "confirmation",
            method : "GET",
            url : "/client/confirmation",
            func : function (clt) {
                window.sessionStorage.removeItem("tmp_email");
                window.client = new Core.class.client(clt);
                client.createSessionStorage(client.token, client.tokenDate);
                controller.includeContainer.switchView("accueil");
                controller.menu.addContextualMenuButtons();
            },
            error : function(statusCode){
                var error_container = document.getElementById("error_container");
                error_container.textContent = "Code incorrect.";

                var input_code = document.getElementById("codeBtn");
                input_code.value = "";
            }
        };
    };

    /**
     *
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.passwordRecovery = function (email) {
        var paramRequest = "email=" + email;
        var object = {
            name : "passwordRecovery",
            method : "GET",
            url : "/client/passwordRecovery",
            func : function () {
                var pageObject = data.viewList.connexion;

                var viewSuccess  = function () {
                    utils.empty(data.getIncludeContainer());
                    data.getIncludeContainer().innerHTML = ""+
                        "<div style='display: inline-block; width: 100%; color: #3c763d; text-align: center; padding-bottom: 40px;'>"+
                        "</br>Votre nouveau mot de passe vous a été envoyé par email.</div>";
                }();
                var redirection = function () {
                    var timeOut = function(){
                        var tmID = setTimeout(function(){
                            Core.utils.empty(data.getIncludeContainer());
                            utils.include(pageObject.viewPath, pageObject.name);
                        }, 3500);
                    }();
                }();
            },
            error : function(statusCode){

            }
        };

        utils.ajaxRequest(object, paramRequest, null, false, true);
    };

    /**
     * Generate the client list template into the admin panel
     * @returns {{name: string, method: string, url: string, func: func, error: error}}
     */
    Core.service.client.initAdminViewListClients = function () {
        return {
            name : "initAdminViewListClients",
            method : "GET",
            url : "/client/adminGetList",
            func : function (json) {
                var headers = {
                    id: {
                        content: "ID"
                    },
                    name: {
                        content: "Nom"
                    },
                    firstName: {
                        content: "Prénom"
                    },
                    email: {
                        content: "Email"
                    },
                    phone: {
                        content: "Téléphone"
                    }
                };

                utils.template.createLiTemplate(headers, json, document.getElementById("list_client_content"), "read");
            },
            error : function(statusCode){

            }
        };
    };
})();
