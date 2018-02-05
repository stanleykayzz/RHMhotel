package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.Room;
import server.repository.RoomRepository;
import server.service.ClientService;
import server.service.RoomService;

import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<Room> getListRooms() {
        return roomRepository.findAll();
    }

    @RequestMapping(path = "/getListRoomFree", method = GET)
    @ResponseStatus(OK)
    public List<Room> getListRoomFree(@RequestParam("dateStart") Date dateStart, @RequestParam("dateEnd") Date dateEnd) {
        return roomService.getListRoomFree(dateStart, dateEnd);
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addRoom(@RequestBody Room room, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            roomRepository.save(room);
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateRoom(@RequestBody Room room, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            roomRepository.save(room);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteRoom(@RequestParam("id") Long id, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            roomRepository.delete(id);
        }
    }

}
