package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import server.model.FestiveRoom;
import server.repository.FestiveRoomRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Service
public class FestiveRoomService {

    @Autowired
    private FestiveRoomRepository festiveRoomRepository;

    public boolean festiveRoomFree(Date dateStart, Date dateEnd, Long idFestiveRoom){
        Date dateMin = new Date();
        dateMin.setTime((dateMin.getTime() - (15 * 60000)));

        List<FestiveRoom> listFestiveRoomNotFree = new ArrayList<>();
        listFestiveRoomNotFree.addAll(festiveRoomRepository.getListFestiveRoomNotFree(dateStart, dateEnd, dateMin));
        listFestiveRoomNotFree.addAll(festiveRoomRepository.getListFestiveRoomDateBookingInvalid(dateStart, dateEnd));

        return !listFestiveRoomNotFree.contains(festiveRoomRepository.findOne(idFestiveRoom));

    }
}
