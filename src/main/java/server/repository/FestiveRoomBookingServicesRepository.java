package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.FestiveRoomBookingServices;

import java.util.List;

/**
 * Created by maxime on 09/09/2017.
 */
@Repository
public interface FestiveRoomBookingServicesRepository extends JpaRepository<FestiveRoomBookingServices, Long> {

    @Query("select f from FestiveRoomBookingServices f where idFestiveRoomBooking = :IdFestiveRoomBooking")
    List<FestiveRoomBookingServices> getFestiveRoomBookingServicesByIdFestiveRoomBooking(@Param("IdFestiveRoomBooking") Long IdFestiveRoomBooking);
}
