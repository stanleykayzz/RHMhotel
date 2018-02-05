package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.Client;
import server.model.NewsLetter;
import server.repository.ClientRepository;
import server.repository.NewsLetterRepository;
import server.service.ClientService;
import server.utils.Mail.MailManager;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/newsletter")
public class NewsLetterController {

    @Autowired
    private NewsLetterRepository newsLetterRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<NewsLetter> listNewsLetter(@RequestParam("token") String token){

        if(clientService.adminAccess(token)){
            return newsLetterRepository.findAll();
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addNewsLetter(@RequestBody NewsLetter newsLetter, @RequestParam("subject") String subject, @RequestParam("token") String token){

        if(clientService.adminAccess(token)){
            newsLetterRepository.save(newsLetter);

            for(Client c : clientRepository.getListUserActif()){
                MailManager mailManager = new MailManager();
                mailManager.sendNewsLetter(c, newsLetter, subject);
            }
        }

    }
}
