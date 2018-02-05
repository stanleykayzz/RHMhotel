package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.Client;
import server.service.ClientService;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by maxime on 28/09/2017.
 */

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/server")
public class ServerController {
    private String KEY = "AYqQThXpf9pC7O8opPeNE3JznLlAyg7YAbFUlmZI6GeuEAvOcSUw_U6hcL6qxl9Zvx7iRiGxrXfHAaH2";

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    public String getKey(@RequestParam("token") String token){
        Client client = clientService.findByToken(token);

        if(client != null){
            return KEY;
        }

        return "";
    }
}
