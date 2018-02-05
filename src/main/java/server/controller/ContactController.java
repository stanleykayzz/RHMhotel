package server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.utils.Mail.MailManager;

import static org.springframework.web.bind.annotation.RequestMethod.POST;


/**
 * Created by maxime on 05/10/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @RequestMapping(method = POST)
    public void sendContactEmail(@RequestParam("message") String message) {
        MailManager mailManager = new MailManager();
        mailManager.sendContactEmail(message);
    }
}
