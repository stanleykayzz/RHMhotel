package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.repository.InvalidBookingDateRoomRepository;

/**
 * Created by maxime on 09/09/2017.
 */
@Service
public class InvalidBookingDateRoomService {

    @Autowired
    private InvalidBookingDateRoomRepository invalidBookingDateRoomRepository;
}
