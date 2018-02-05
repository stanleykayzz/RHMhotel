package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.model.FestiveRoom;
import server.repository.FestiveRoomRepository;
import server.service.ClientService;
import server.utils.File.FileManager;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/festiveRoom")
public class FestiveRoomController {

    private String PRE_PATH = "/src/main/resources/static/img/FestiveRoom/";
    private String PRE_PATH_FRONT = "img/FestiveRoom/";

    @Autowired
    private FestiveRoomRepository festiveRoomRepository;

    @Autowired
    private ClientService clientService;

    @RequestMapping(method = GET)
    @ResponseStatus(OK)
    public List<FestiveRoom> getListFestiveRooms(@RequestParam("token") String token){
        if(clientService.findByToken(token) != null){
            return festiveRoomRepository.findAll();
        }

        return null;
    }

    @RequestMapping(method = POST)
    @ResponseStatus(CREATED)
    public void addFestiveRoom(@RequestBody FestiveRoom festiveRoom, @RequestParam("token") String token, @RequestParam("file") MultipartFile file){
        if(clientService.adminAccess(token)){
            String pathServer = PRE_PATH + file.getOriginalFilename();

            FileManager fm = new FileManager();
            fm.saveImage(file, pathServer);

            festiveRoom.setPicturePath(PRE_PATH_FRONT + file.getOriginalFilename());
            festiveRoomRepository.save(festiveRoom);
        }
    }

    @RequestMapping(method = PUT)
    @ResponseStatus(ACCEPTED)
    public void updateFestiveRoom(@RequestBody FestiveRoom festiveRoom, @RequestParam("token") String token){
        if(clientService.adminAccess(token)){
            festiveRoomRepository.save(festiveRoom);
        }
    }

    @RequestMapping(method = DELETE)
    @ResponseStatus(OK)
    public void deleteFestiveRoomById(@RequestParam("id") Long id,  @RequestParam("token") String token){

        if(clientService.adminAccess(token)){
            festiveRoomRepository.delete(id);
        }
    }
}