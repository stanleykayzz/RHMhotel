package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.Exception.CancelRestaurantBookException;
import server.Exception.ClientAlreadyBookTableException;
import server.Exception.DateExpiredException;
import server.Exception.RestaurantTableNotFreeException;
import server.model.Client;
import server.model.RestaurantTableBooking;
import server.repository.RestaurantTableBookingRepository;
import server.service.ClientService;
import server.service.RestaurantTableBookingService;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by maxime on 09/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/restaurantTableBooking")
public class RestaurantTableBookingController {

    @Autowired
    private RestaurantTableBookingRepository restaurantTableBookingRepository;

    @Autowired
    private RestaurantTableBookingService restaurantTableBookingService;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addRestaurantTableBooking(@RequestBody RestaurantTableBooking restaurantTableBooking, @RequestParam("token") String token) {
        restaurantTableBooking.setBookingDate(new Date());
        int type = restaurantTableBookingService.validateRestaurantTableBooking(restaurantTableBooking);

        if (clientService.findByToken(token) != null) {

            if(type == -1)
                throw new DateExpiredException();

            if (type == 0) {
                if (!restaurantTableBookingService.clientAlreadyBook(12, 0, 14, 0, restaurantTableBooking.getIdClient())) {

                    if (restaurantTableBooking.getNumber() <= restaurantTableBookingService.getNumberPlaceFree(12, 0, 14, 0)){
                        restaurantTableBooking.setStatus("active");
                        restaurantTableBookingRepository.save(restaurantTableBooking);
                    } else {
                        throw new RestaurantTableNotFreeException();
                    }
                } else {
                    throw new ClientAlreadyBookTableException();
                }

            }

            if (type == 1) {
                if (!restaurantTableBookingService.clientAlreadyBook(19, 30, 22, 30, restaurantTableBooking.getIdClient())) {
                    if (restaurantTableBooking.getNumber() <= restaurantTableBookingService.getNumberPlaceFree(19, 30, 22, 30)){
                        restaurantTableBooking.setStatus("active");
                        restaurantTableBookingRepository.save(restaurantTableBooking);
                    } else {
                        throw new RestaurantTableNotFreeException();
                    }

                } else {
                    throw new ClientAlreadyBookTableException();
                }
            }

        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateRestaurantTableBooking(@RequestBody RestaurantTableBooking restaurantTableBooking, @RequestParam("token") String token) {
        if (clientService.findByToken(token) != null) {
            restaurantTableBookingRepository.save(restaurantTableBooking);
        }
    }
    @RequestMapping(path = "/cancel", method = PUT)
    @ResponseStatus(ACCEPTED)
    public Long cancelRestaurantTableBooking(@RequestParam("token") String token, @RequestParam("id") Long id) {
        Client client = clientService.findByToken(token);
        RestaurantTableBooking restaurantTableBooking = restaurantTableBookingRepository.findOne(id);

        if (clientService.findByToken(token) != null && restaurantTableBooking != null && Objects.equals(client.getId(), restaurantTableBooking.getIdClient())) {
            if(restaurantTableBookingService.cancelAvailable(restaurantTableBooking.getDate())){
                restaurantTableBooking.setStatus("canceled");
                restaurantTableBookingRepository.save(restaurantTableBooking);
                return restaurantTableBooking.getId();
            } else {
                throw new CancelRestaurantBookException();
            }
        }

        return null;
    }


    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<RestaurantTableBooking> listRestaurantTableBooking(@RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            return restaurantTableBookingRepository.findAll();
        }

        return null;
    }

    @RequestMapping(path = "/getByIdClient", method = GET)
    @ResponseStatus(OK)
    public List<RestaurantTableBooking> getListRestaurantTableByIdClient(@RequestParam("token") String token) {
        Client client = clientService.findByToken(token);

        if (client != null) {
            return restaurantTableBookingRepository.getListAvailableBookByIdClient(client.getId());
        }

        return null;
    }

    @RequestMapping(path = "/getListByCurrentDate", method = GET)
    @ResponseStatus(OK)
    public List<RestaurantTableBooking>  getListRestaurantBookingTableByDate(@RequestParam("token") String token){
        if (clientService.adminAccess(token)){
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);

            Date date = cal.getTime();

            return restaurantTableBookingRepository.getBookByDate(date);
        }

        return null;
    }
}
