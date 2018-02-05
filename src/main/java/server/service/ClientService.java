package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import server.Exception.AdminAccessNotAvailableException;
import server.Exception.ClientTokenUnvailableException;
import server.model.Client;
import server.repository.ClientRepository;
import server.utils.DateComparer;

import java.util.Date;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private SecurityClientService securityClientService;

    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    public Client findByToken(String Token) {
        Client client = clientRepository.findByToken(Token);

        if (client != null) {
            boolean available = tokenAvailable(client);
            if (available) {
                client.setTokenDate(new Date());
                clientRepository.save(client);

                return client;
            } else {
                throw new ClientTokenUnvailableException();
            }

        } else {
            throw new ClientTokenUnvailableException();
        }
    }

    public Client login(String email, String password) {
        Client client = clientRepository.login(email, password);

        if (client != null) {
            client.setToken(securityClientService.generateToken());
            client.setTokenDate(new Date());
            return client;
        } else {
            return null;
        }
    }

    public Client confirmation(String email, String code) {
        Client client = clientRepository.confirmation(email, code);

        if (client != null) {
            return client;
        } else {
            return null;
        }
    }

    public boolean tokenAvailable(Client client) {
        int hours = 0;
        int minutes = 15;
        return DateComparer.compareDateByTime(client.getTokenDate(), minutes, hours);
    }

    public void updateTokenDate(Client client) {
        client.setTokenDate(new Date());
    }

    public Client updateNewInformationsClient(@RequestBody Client newClient, Client client, String psw) {
        if(client != null) {
            if(client.getPassword().equals(psw)){
                client.setPhone(newClient.getPhone());
                client.setCountry(newClient.getCountry());
                client.setCity(newClient.getCity());
                client.setAddress(newClient.getAddress());
                client.setPostalCode(newClient.getPostalCode());
                client.setPassword(securityClientService.hashPassword(newClient.getPassword()));

                updateTokenDate(client);
                updateClient(client);

                return client;
            } else {
                throw new IllegalArgumentException("error");
            }
        } else {
            throw new IllegalArgumentException("error");
        }
    }

    public boolean adminAccess(String token){
        Client client = findByToken(token);

        if(client != null){
            if(client.getAccreditation().equals("admin"))
                return true;
            else
                throw  new AdminAccessNotAvailableException();
        }

        return false;
    }

}
