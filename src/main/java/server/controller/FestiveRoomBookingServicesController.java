package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.Client;
import server.model.FestiveRoomBooking;
import server.model.FestiveRoomBookingServices;
import server.repository.FestiveRoomBookingServicesRepository;
import server.repository.FestiveRoomServiceRepository;
import server.service.ClientService;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by maxime on 09/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/festiveRoomBookingServices")
public class FestiveRoomBookingServicesController {

    @Autowired
    private FestiveRoomServiceRepository festiveRoomServiceRepository;
    @Autowired
    private FestiveRoomBookingServicesRepository festiveRoomBookingServicesRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBookingServices> listFestiveRoomBookingServices(@RequestParam("token") String token) {
        if (clientService.findByToken(token) != null) {
            return festiveRoomBookingServicesRepository.findAll();
        }

        return null;
    }

    @RequestMapping(path = "/getById", method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBookingServices> getFestiveRoomBookingServicesByIdFestiveRoomBooking(@RequestParam("id") Long id, @RequestParam("token") String token) {
        if (clientService.findByToken(token) != null) {
            return festiveRoomBookingServicesRepository.getFestiveRoomBookingServicesByIdFestiveRoomBooking(id);
        }

        return null;
    }

    @RequestMapping(path = "/getByListFestiveRoomBook", method = POST)
    @ResponseStatus(OK)
    public List<FestiveRoomBookingServices> getByListFestiveRoomBookServices(@RequestBody List<FestiveRoomBooking> festiveRoomBookingList, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            List<FestiveRoomBookingServices> res = new ArrayList<>();

            for(FestiveRoomBooking f : festiveRoomBookingList){
                res.addAll(festiveRoomBookingServicesRepository.getFestiveRoomBookingServicesByIdFestiveRoomBooking(f.getId()));
            }
            return res;
        }

        return null;
    }

    @RequestMapping(path = "/getByListFestiveRoomBookByIdBook", method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBookingServices> getByListFestiveRoomBookByIdBook(@RequestParam("token") String token, @RequestParam("id") Long id){
        Client client = clientService.findByToken(token);

        if(client != null){
            List<FestiveRoomBookingServices> festiveRoomBookingList = festiveRoomBookingServicesRepository.getFestiveRoomBookingServicesByIdFestiveRoomBooking(id);

            return festiveRoomBookingList;
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public List<FestiveRoomBookingServices> addFestiveRoomBookingServices(@RequestBody List<FestiveRoomBookingServices> listFestiveRoomBookingServices, @RequestParam("token") String token) {
        if (clientService.findByToken(token) != null) {
            for(FestiveRoomBookingServices f : listFestiveRoomBookingServices){
                festiveRoomBookingServicesRepository.save(f);
            }
        }

        return listFestiveRoomBookingServices;
    }

}
