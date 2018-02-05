package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.model.RoomCategory;
import server.repository.RoomCategoryRepository;
import server.service.ClientService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/roomCategory")
public class RoomCategoryController {

    @Autowired
    private RoomCategoryRepository roomCategoryRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<RoomCategory> getListRoomCategories() {
        return roomCategoryRepository.findAll();
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public Long addRoomCategory(@RequestBody RoomCategory roomCategory, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            return roomCategoryRepository.save(roomCategory).getId();
        }

        return 0l;
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public Long updateRoomCategory(@RequestBody RoomCategory roomCategory, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            return roomCategoryRepository.save(roomCategory).getId();
        }

        return 0l;
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteRoomCategory(@RequestParam(value = "id") Long id, @RequestParam("token") String token) {
        if (clientService.adminAccess(token)) {
            roomCategoryRepository.delete(id);
        }
    }
}
