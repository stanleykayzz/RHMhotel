package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.InvalidBookingDateRoom;
import server.repository.InvalidBookingDateRoomRepository;
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
@RequestMapping("/api/invalidBookingDateRoom")
public class InvalidBookingDateRoomController {

    @Autowired
    private InvalidBookingDateRoomRepository invalidBookingDateRoomRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<InvalidBookingDateRoom> getListInvalidBookingDateRoomByMinDate(@RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            return invalidBookingDateRoomRepository.getListInvalidBookingDateRoomByMinDate(new Date());
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addInvalidBookingDateFestiveRoom(@RequestBody InvalidBookingDateRoom invalidBookingDateRoom, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            if(invalidBookingDateRoomRepository.alreadyInvalidAtSameDate(invalidBookingDateRoom.getIdRoom(), invalidBookingDateRoom.getDateStart(), invalidBookingDateRoom.getDateEnd()).size() == 0){
                invalidBookingDateRoom.setStatus("active");
                invalidBookingDateRoomRepository.save(invalidBookingDateRoom);
            }
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateInvalidBookingDateFestiveRoom(@RequestBody InvalidBookingDateRoom invalidBookingDateRoom, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            invalidBookingDateRoomRepository.save(invalidBookingDateRoom);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteInvalidBookingDateFestiveRoom(@RequestParam("id") Long id, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            InvalidBookingDateRoom invalidBookingDateRoom = invalidBookingDateRoomRepository.getOne(id);
            if(invalidBookingDateRoom != null)
                invalidBookingDateRoomRepository.delete(invalidBookingDateRoom);
        }
    }
}
