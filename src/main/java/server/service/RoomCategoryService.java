package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.RoomBooking;
import server.model.RoomCategory;
import server.repository.RoomCategoryRepository;

import java.util.*;

@Service
public class RoomCategoryService {

    @Autowired
    private RoomCategoryRepository roomCategoryRepository;


    public HashMap<Long, Integer> getHashMapCategoryFromListRoomBook(List<RoomBooking> listRoomBooking) {
        HashMap<Long, Integer> hmRoomCategory = new HashMap<Long, Integer>();

        for (RoomBooking rb : listRoomBooking) {
            RoomCategory roomCategory = roomCategoryRepository.getOne(rb.getIdRoomCategory());

            if (hmRoomCategory.get(roomCategory.getId()) == null) {
                hmRoomCategory.put(roomCategory.getId(), 1);
            } else if (hmRoomCategory.get(roomCategory.getId()) != null) {
                hmRoomCategory.put(roomCategory.getId(), hmRoomCategory.get(roomCategory.getId()) + 1);
            }
        }

        return hmRoomCategory;
    }
}
