package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.Exception.FestiveRoomFreeException;
import server.Exception.GetFestiveRoomBookingByIdException;
import server.model.Client;
import server.model.FestiveRoomBooking;
import server.repository.FestiveRoomBookingRepository;
import server.service.ClientService;
import server.service.FestiveRoomBookingService;
import server.service.FestiveRoomService;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by molla on 27/08/2017.
 */

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/festiveRoomBooking")
public class FestiveRoomBookingController {

    @Autowired
    private FestiveRoomService festiveRoomService;

    @Autowired
    private FestiveRoomBookingRepository festiveRoomBookingRepository;

    @Autowired
    private FestiveRoomBookingService festiveRoomBookingService;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public FestiveRoomBooking addFestiveRoomBooking(@RequestBody FestiveRoomBooking festiveRoomBooking, @RequestParam("token") String token) {
        if (clientService.findByToken(token) != null) {

            if(festiveRoomService.festiveRoomFree(festiveRoomBooking.getDateStart(), festiveRoomBooking.getDateEnd(), festiveRoomBooking.getIdFestiveRoom())){

                festiveRoomBooking.setDateBook(new Date());
                festiveRoomBooking.setStatus("inactive");

                return festiveRoomBookingRepository.save(festiveRoomBooking);
            } else {
                throw new FestiveRoomFreeException();
            }

        }

        return null;
    }

    @RequestMapping(path = "/validate", method = PUT)
    @ResponseStatus(ACCEPTED)
    public void validateFestiveRoomBooking(@RequestParam ("id") Long id, @RequestParam("token") String token) {
        Client client = clientService.findByToken(token);

        if (clientService.findByToken(token) != null) {
            FestiveRoomBooking festiveRoomBooking = festiveRoomBookingRepository.getOne(id);

            if(festiveRoomBooking != null && Objects.equals(festiveRoomBooking.getIdClient(), client.getId())){
                festiveRoomBooking.setStatus("active");
                festiveRoomBookingRepository.save(festiveRoomBooking);
            } else {
                throw new GetFestiveRoomBookingByIdException();
            }

        }
    }

    @RequestMapping(path = "/getPrice", method = GET)
    @ResponseStatus(OK)
    public float getFestiveRoomBookingPrice(@RequestParam("id") Long id, @RequestParam("token") String token) {

        if (clientService.findByToken(token) != null) {
            FestiveRoomBooking festiveRoomBooking = festiveRoomBookingRepository.getOne(id);

            if(festiveRoomBooking != null)
                return festiveRoomBookingService.calculateLocalPrice(id);
            else
                throw new GetFestiveRoomBookingByIdException();
        }

        return 0f;
    }

    @RequestMapping(path = "/getConvertedPrice", method = GET)
    @ResponseStatus(OK)
    public float getFestiveRoomBookingConvertedPrice(@RequestParam("id") Long id, @RequestParam("token") String token) {

        if (clientService.findByToken(token) != null) {
            FestiveRoomBooking festiveRoomBooking = festiveRoomBookingRepository.getOne(id);

            if(festiveRoomBooking != null)
                return festiveRoomBookingService.calculateConvertedPrice(id);
            else
                throw new GetFestiveRoomBookingByIdException();
        }

        return 0f;
    }

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBooking> getListFestiveRoomBookings(@RequestParam("token") String token) {

        if (clientService.adminAccess(token)) {
            return festiveRoomBookingRepository.findAll();
        }

        return null;
    }

    @RequestMapping(path= "/getListValidated",method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBooking> getListVlidatedFestiveRoomBookings(@RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            return festiveRoomBookingRepository.getListActivated();
        }

        return null;
    }

    @RequestMapping(path="cancel", method = PUT)
    @ResponseStatus(OK)
    public void cancelFestiveRoomBookings(@RequestParam("id") Long id, @RequestParam("token") String token) {
        Client client = clientService.findByToken(token);
        FestiveRoomBooking festiveRoomBooking = festiveRoomBookingRepository.findOne(id);

        if (clientService.findByToken(token) != null && festiveRoomBooking != null && (Objects.equals(client.getId(), festiveRoomBooking.getIdClient()) || clientService.adminAccess(token))) {
            festiveRoomBooking.setStatus("canceled");
            festiveRoomBookingRepository.save(festiveRoomBooking);
        }
    }

    @RequestMapping(path = "/getByIdClient", method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomBooking> getListFestiveRoomBookingByIdClient(@RequestParam("token") String token) {
        Client client = clientService.findByToken(token);

        if (client != null) {
            return festiveRoomBookingRepository.findByIdClient(client.getId());
        }

        return null;
    }
}
