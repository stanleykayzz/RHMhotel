package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.FestiveRoomService;

import java.util.List;

/**
 * Created by maxime on 09/09/2017.
 */
@Repository
public interface FestiveRoomServiceRepository extends JpaRepository<FestiveRoomService, Long> {
    @Query("select frs from FestiveRoomService frs, FestiveRoomBookingServices frbs where frs.id = frbs.idFestiveRoomService and frbs.idFestiveRoomBooking = :IdFestiveRoomBooking")
    List<FestiveRoomService> getListFestiveRoomServiceByIdFestiveRoomBooking(@Param("IdFestiveRoomBooking") Long IdFestiveRoomBooking);
}

