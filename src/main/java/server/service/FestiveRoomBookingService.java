package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.FestiveRoomBooking;
import server.model.FestiveRoomService;
import server.model.FestiveRoomBookingServices;
import server.repository.FestiveRoomBookingRepository;
import server.repository.FestiveRoomBookingServicesRepository;
import server.repository.FestiveRoomRepository;
import server.repository.FestiveRoomServiceRepository;
import server.utils.Converter.CurrencyConvert;
import server.utils.DateComparer;

import java.util.List;

/**
 * Created by molla on 27/08/2017.
 */

@Service
public class FestiveRoomBookingService {

    @Autowired
    private FestiveRoomRepository festiveRoomRepository;

    @Autowired
    private FestiveRoomBookingRepository festiveRoomBookingRepository;

    @Autowired
    private FestiveRoomServiceRepository festiveRoomServiceRepository;

    @Autowired
    private FestiveRoomBookingServicesRepository festiveRoomBookingServicesRepository;

    public float calculateLocalPrice(Long id){
        FestiveRoomBooking festiveRoomBooking = festiveRoomBookingRepository.getOne(id);
        List<FestiveRoomBookingServices> festiveRoomBookingServicesList = festiveRoomBookingServicesRepository.getFestiveRoomBookingServicesByIdFestiveRoomBooking(id);

        int days = DateComparer.getDaysBetweenDates(festiveRoomBooking.getDateEnd(), festiveRoomBooking.getDateStart());
        float  price = (festiveRoomRepository.getOne(festiveRoomBooking.getIdFestiveRoom()).getPrice() * days);

        for (FestiveRoomBookingServices frbs : festiveRoomBookingServicesList) {
            FestiveRoomService frb = festiveRoomServiceRepository.getOne(frbs.getIdFestiveRoomService());
            price += (frb.getPrice() * frbs.getQuantity() * days);
        }
        return price;
    }

    public float calculateConvertedPrice(Long id){
        float price = 0f;
        price = calculateLocalPrice(id);
        price = CurrencyConvert.getConvertedPrice(price);
        return price;
    }

}
