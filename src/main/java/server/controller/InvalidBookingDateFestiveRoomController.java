package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.InvalidBookingDateFestiveRoom;
import server.repository.InvalidBookingDateFestiveRoomRepository;
import server.service.ClientService;

import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by maxime on 09/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/invalidBookingDateFestiveRoom")
public class InvalidBookingDateFestiveRoomController {

    @Autowired
    private InvalidBookingDateFestiveRoomRepository invalidBookingDateFestiveRoomRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<InvalidBookingDateFestiveRoom> getListInvalidBookingDateFestiveRoomByMinDate(@RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            return invalidBookingDateFestiveRoomRepository.getListInvalidBookingDateFestiveRoomByMinDate(new Date());
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addInvalidBookingDateFestiveRoom(@RequestBody InvalidBookingDateFestiveRoom invalidBookingDateFestiveRoom, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            if(invalidBookingDateFestiveRoomRepository.alreadyInvalidAtSameDate(invalidBookingDateFestiveRoom.getDateStart(), invalidBookingDateFestiveRoom.getDateEnd()).size() == 0){
                invalidBookingDateFestiveRoom.setStatus("active");
                invalidBookingDateFestiveRoomRepository.save(invalidBookingDateFestiveRoom);
            }
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateInvalidBookingDateFestiveRoom(@RequestBody InvalidBookingDateFestiveRoom invalidBookingDateFestiveRoom, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            invalidBookingDateFestiveRoomRepository.save(invalidBookingDateFestiveRoom);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteInvalidBookingDateFestiveRoom(@RequestParam("id") Long id, @RequestParam("token") String token){
        InvalidBookingDateFestiveRoom invalidBookingDateFestiveRoom = invalidBookingDateFestiveRoomRepository.getOne(id);

        if(clientService.adminAccess(token) && invalidBookingDateFestiveRoom != null){
            invalidBookingDateFestiveRoomRepository.delete(invalidBookingDateFestiveRoom);
        }
    }
}
