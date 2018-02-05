package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.RoomBookingServices;

import java.util.List;

/**
 * Created by maxime on 09/09/2017.
 */
@Repository
public interface RoomBookingServicesRepository extends JpaRepository<RoomBookingServices, Long> {

    @Query("select rbs from RoomBookingServices rbs where idRoomBooking = :IdRoomBooking")
    List<RoomBookingServices> getListByIdRoomBooking(@Param("IdRoomBooking") Long IdRoomBooking);
}
