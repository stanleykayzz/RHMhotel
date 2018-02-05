package server.utils.Mail;

import server.model.Client;
import server.model.NewsLetter;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Created by maxime on 22/09/2017.
 */
public class MailManager {

    private Session session;
    private String USERNAME = "residencedeshautsdemenaye@gmail.com";
    private String PASSWORD = "Azerty75";

    public MailManager() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                        return new javax.mail.PasswordAuthentication(USERNAME, PASSWORD);
                    }
                });
    }

    public void sendEmailToClient(String clientEmail){
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(clientEmail));
            message.setSubject("Confirmation de réservation RHM");
                        String email = "test \n test";
            message.setContent(email,"text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendContactEmail(String msg){
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(USERNAME));
            message.setSubject("Un client vous a contacté !");
            message.setContent(msg,"text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendEmailToClient(String mailSubject ,String clientEmail, String mailContent){
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(clientEmail));
            message.setSubject(mailSubject);
            String email = mailContent;
            message.setContent(email,"text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


    public void sendReminderMailToClient(String clientEmail) {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(clientEmail));
            message.setSubject("Cela fait longtemps que l'on ne vous a pas vu");
            String email = "Cela fait presque 60 jours que vous n'avez pas fait de réservation. \n Pensez à vous connecté sur notre site en cas de déplacement.";
            message.setContent(email,"text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendCodeConfirmation(Client client, String code) {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(client.getEmail()));
            message.setSubject("Code de confirmation");
            String email = "Bonjour " + client.getFirstName() + " " + client.getLastName() + ", \n voici votre code de confirmation de compte " + code;
            message.setContent(email, "text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendNewPassword(Client client, String password) {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(client.getEmail()));
            message.setSubject("Récupération de mot de passe");
            String email = "Bonjour " + client.getFirstName() + " " + client.getLastName() + ", \n voici votre nouveau mot de passe " + password;
            message.setContent(email, "text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendNewsLetter(Client client, NewsLetter newsLetter, String subject) {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(client.getEmail()));
            message.setSubject(subject);
            message.setContent(newsLetter.getContent(), "text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
