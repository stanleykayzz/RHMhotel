package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.RoomService;
import server.repository.RoomServiceRepository;
import server.service.ClientService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by maxime on 09/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/roomService")
public class RoomServiceController {

    @Autowired
    private RoomServiceRepository roomServiceRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<RoomService> getListRoomService(){
        return roomServiceRepository.findAll();
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addRoomService(@RequestBody RoomService roomService, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            roomServiceRepository.save(roomService);
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateRoomService(@RequestBody RoomService roomService, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            roomServiceRepository.save(roomService);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteRoomService(@RequestParam("id") Long id, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            roomServiceRepository.delete(id);
        }
    }
}
