package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.Room;

import java.util.Date;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r, RoomBooking rb WHERE " +
            "r.id = rb.idRoom " +
            "AND ((:DateStart >= rb.dateStart AND :DateStart < rb.dateEnd) OR (:DateEnd > rb.dateStart AND :DateEnd <= rb.dateEnd) OR (:DateStart < rb.dateStart AND :DateEnd > rb.dateEnd)) " +
            "AND ((rb.status = 'inactive' AND rb.dateBook > :DateMin) OR rb.status = 'active')")
    List<Room> getListRoomNotFree(@Param("DateStart")Date DateStart, @Param("DateEnd")Date DateEnd, @Param("DateMin")Date DateMin);

    @Query("SELECT r FROM Room r, InvalidBookingDateRoom ibdr WHERE " +
            "r.id = ibdr.idRoom " +
            "AND ibdr.status = 'active'" +
            "AND ((:DateStart >= ibdr.dateStart AND :DateStart < ibdr.dateEnd) OR (:DateEnd > ibdr.dateStart AND :DateEnd <= ibdr.dateEnd) OR (:DateStart < ibdr.dateStart AND :DateEnd > ibdr.dateEnd))")
    List<Room> getListRoomDateBookingNotFree(@Param("DateStart")Date DateStart, @Param("DateEnd")Date DateEnd);
}
