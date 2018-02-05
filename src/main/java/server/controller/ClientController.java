package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.Exception.*;
import server.model.Client;
import server.repository.ClientRepository;
import server.service.ClientService;
import server.service.SecurityClientService;
import server.utils.Mail.MailManager;

import java.util.Date;
import java.util.List;
import java.util.Random;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SecurityClientService securityClientService;

    @RequestMapping(path = "/login", method = GET)
    @ResponseStatus(OK)
    public Client login(@RequestParam("email") String email, @RequestParam("password") String password) {
        String pswd = securityClientService.hashPassword(password);
        Client client = clientService.login(email, pswd);

        if(client != null){
            clientRepository.save(client);
            return client;
        } else {
            throw new LoginException();
        }
    }


    @RequestMapping(path = "/logout", method = GET)
    @ResponseStatus(ACCEPTED)
    public boolean logout(@RequestParam("token") String token){
        Client client = clientService.findByToken(token);
        if(client != null) {
            client.setToken(null);
            client.setTokenDate(null);
            clientService.updateClient(client);

            return true;
        }

        return false;
    }


    @RequestMapping(path = "/getListClient", method = GET)
    @ResponseStatus(OK)
    public List<Client> getListIsAdmin(@RequestParam("token") String tokenClient) {
        if(clientService.adminAccess(tokenClient)){
            return clientRepository.getListUserActif();
        }

        return null;
    }


    @RequestMapping(path = "/reloadToken", method = GET)
    @ResponseStatus(OK)
    public Date reloadToken(@RequestParam("token") String token){
        Client client = clientService.findByToken(token);
        if(client != null){
            return client.getTokenDate();
        } else {
            throw new ReloadTokenException();
        }
    }

    @RequestMapping(path = "/getByToken", method = GET)
    @ResponseStatus(OK)
    public Client getClientByToken(@RequestParam("token") String token){
        Client client = clientService.findByToken(token);

        if(client != null){
            return clientService.findByToken(token);
        }

        return null;
    }


    @RequestMapping(path = "/confirmation", method = GET)
    @ResponseStatus(OK)
    public Client confirmation(@RequestParam("email") String email, @RequestParam("code") String code) {
        Client client = clientService.confirmation(email, code);

        if (client != null) {
            client.setCode("OK");
            client.setStatusActif("active");
            clientService.updateClient(client);

            return client;
        } else {
            throw new CodeConfirmationException();
        }
    }


    @RequestMapping(value = "/passwordRecovery", method = GET)
    @ResponseStatus(OK)
    public void recoveryPasswordClient(@RequestParam("email") String email){
        Client client = clientRepository.findClientByEmailEquals(email);

        if(client != null) {
            String newPassword = securityClientService.generateNewPassword();
            client.setPassword(securityClientService.hashPassword(newPassword));

            MailManager mailManager = new MailManager();
            mailManager.sendNewPassword(client, newPassword);

            clientRepository.save(client);
        } else {
            throw new FindClientByEmailException();
        }
    }


    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public Client addClient(@RequestBody Client client) {

        Client clientExist = clientRepository.findClientByEmailEquals(client.getEmail());
        if (clientExist == null) {
            int max = 9999;
            int min = 1000;

            Random r = new Random();
            String code = Integer.toString((r.nextInt((max - min) + 1) + min));

            client.setCode(securityClientService.createCodeClient());
            client.setPassword(securityClientService.hashPassword(client.getPassword()));
            client.setStatusActif("inactive");
            client.setAccreditation("user");
            client.setCode(code);

            MailManager mailManager = new MailManager();
            mailManager.sendCodeConfirmation(client, code);
            return clientRepository.save(client);
        } else {
            throw new ClientEmailAlreadyExistException();
        }
    }

    @RequestMapping(path = "/update", method = POST)
    @ResponseStatus(ACCEPTED)
    public Client updateClient(@RequestBody Client newClient, @RequestParam("token") String token, @RequestParam("password") String password) {
        Client client = clientService.findByToken(token);
        String psw = securityClientService.hashPassword(password);
        return clientService.updateNewInformationsClient(newClient, client, psw);
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public String deleteClient(@RequestParam("token") String token){
        Client client = clientRepository.findClientByTokenEquals(token);
        client.setStatusActif("removed");
        clientRepository.save(client);
        return "redirect:index.html";
    }

    @RequestMapping(path = "/sendMail", method = GET)
    @ResponseStatus(OK)
    public void test(@RequestParam("content") String content){
    }
}
