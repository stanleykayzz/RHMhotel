package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.RoomBooking;

import java.util.Date;
import java.util.List;

@Repository
public interface RoomBookingRepository extends JpaRepository<RoomBooking, Long> {

    @Query("select rb from RoomBooking rb where idRoom = :IdRoom")
    List<RoomBooking> getListRoomBookingById(@Param("IdRoom") Long IdRoom);

    @Query("select rb from RoomBooking rb where dateEnd > :MinDate or dateEnd = :MinDate")
    List<RoomBooking> getListRoomBookingByMinDate(@Param("MinDate") Date MinDate);

    @Query("select rb from RoomBooking rb where refRoomBook = :RefRoomBook and status <> 'canceled'")
    List<RoomBooking> getListRoomBookingByRefBookRoom(@Param("RefRoomBook") String RefRoomBook);

    @Query("select rb from RoomBooking rb where idClient = :IdClient and status = 'active'")
    List<RoomBooking> getListRoomBookingByIdClient(@Param("IdClient") Long IdClient);

    @Query("select rb from RoomBooking rb where status = 'active' and (dateEnd > current_timestamp or dateEnd = current_timestamp)")
    List<RoomBooking> getListActivated();

    @Query("select rb from RoomBooking rb where status = 'active' and dateEnd < current_timestamp")
    List<RoomBooking> getListActivatedHold();

}
