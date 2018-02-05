package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.FestiveRoomService;
import server.repository.FestiveRoomServiceRepository;
import server.service.ClientService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by maxime on 09/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/festiveRoomService")
public class FestiveRoomServiceController {

    @Autowired
    private FestiveRoomServiceRepository festiveRoomServiceRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomService> getListFestiveRoomServices(@RequestParam("token") String token){
        if(clientService.findByToken(token) != null){
            return festiveRoomServiceRepository.findAll();
        }

        return null;
    }

    @RequestMapping(path = "/getByIdBook", method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoomService> getListFestiveRoomServicesByIdBook(@RequestParam("token") String token, @RequestParam("id") Long id){
        if(clientService.findByToken(token) != null){
            return festiveRoomServiceRepository.getListFestiveRoomServiceByIdFestiveRoomBooking(id);
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addFestiveRoomService(@RequestBody FestiveRoomService festiveRoomService, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            festiveRoomServiceRepository.save(festiveRoomService);
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateFestiveRoomService(@RequestBody FestiveRoomService festiveRoomService, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            festiveRoomServiceRepository.save(festiveRoomService);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteFestiveRoomServiceById(@RequestParam("id") Long id, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            festiveRoomServiceRepository.delete(id);
        }
    }
}
