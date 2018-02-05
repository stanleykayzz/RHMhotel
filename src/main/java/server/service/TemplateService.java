package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.Client;
import server.model.RoomBooking;
import server.model.RoomCategory;
import server.repository.ClientRepository;
import server.repository.RoomCategoryRepository;
import server.utils.Mail.MailManager;
import server.utils.Template.TemplateGenerator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

@Service
public class TemplateService {
    @Autowired
    private RoomBookingService roomBookingService;

    @Autowired
    private RoomCategoryRepository roomCategoryRepository;

    @Autowired
    private ClientRepository clientRepository;

    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void GenerateTemplate(Client client, String refRom) {

        List<RoomBooking> myLis = roomBookingService.getListRoomBookingByRefBookRoom(refRom);
        List<RoomCategory> listCateg = new ArrayList<>();
        for (RoomBooking r : myLis) {
            listCateg.add(roomCategoryRepository.findOne(r.getIdRoomCategory()));
        }

        TemplateGenerator templateGenerator = new TemplateGenerator();
        String invoice;

        if (Objects.equals(myLis.get(0).getReason(), "Professionnel")) {
            invoice = templateGenerator.getProfessionnalInvoiceForMail(refRom, getCurrentDate(), getClientFullname(client),
                    client.getAddress(), client.getCity(), client.getCountry(), listCateg);
        } else {
            invoice = templateGenerator.getInvoiceHobbyForMail(refRom, getCurrentDate(), getClientFullname(client),
                    client.getAddress(), client.getCity(), client.getCountry(), listCateg);
        }

        MailManager mailManager = new MailManager();
        mailManager.sendEmailToClient("Votre facture RHM ", client.getEmail(), invoice);
    }

    public void sendFacturation(Client client, String refRom) {
        String mail = "residencedeshautsdemenaye@gmail.com";
        List<RoomBooking> myLis = roomBookingService.getListRoomBookingByRefBookRoom(refRom);
        List<RoomCategory> listCateg = new ArrayList<>();
        for (RoomBooking r : myLis) {
            listCateg.add(roomCategoryRepository.findOne(r.getIdRoomCategory()));
        }

        TemplateGenerator templateGenerator = new TemplateGenerator();
        String invoice;

        invoice = templateGenerator.getFacturation(refRom, getCurrentDate(), getClientFullname(client),
                client.getAddress(), client.getCity(), client.getCountry(), listCateg);

        MailManager mailManager = new MailManager();
        mailManager.sendEmailToClient("Votre facture RHM ", mail, invoice);
    }

    private String getClientFullname(Client client) {
        return client.getFirstName() + " " + client.getLastName();
    }

    private String getCurrentDate() {
        String patterndate = "dd/MM/yyyy";
        String date = new SimpleDateFormat(patterndate).format(new Date());

        return date;
    }

}
