package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.FestiveRoom;

import java.util.Date;
import java.util.List;

@Repository
public interface FestiveRoomRepository extends JpaRepository<FestiveRoom, Long>{

    @Query("SELECT fr FROM FestiveRoom fr, FestiveRoomBooking frb WHERE " +
            "fr.id = frb.idFestiveRoom " +
            "AND ((:DateStart >= frb.dateStart AND :DateStart < frb.dateEnd) OR (:DateEnd > frb.dateStart AND :DateEnd <= frb.dateEnd) OR (:DateStart < frb.dateStart AND :DateEnd > frb.dateEnd)) " +
            "AND ((frb.status = 'inactive' AND frb.dateBook > :DateMin) OR frb.status = 'active')")
    List<FestiveRoom> getListFestiveRoomNotFree(@Param("DateStart")Date DateStart, @Param("DateEnd")Date DateEnd, @Param("DateMin")Date DateMin);

    @Query("SELECT fr FROM FestiveRoom fr, InvalidBookingDateFestiveRoom ibdfr WHERE " +
            "fr.id = ibdfr.idFestiveRoom " +
            "AND ibdfr.status = 'active'" +
            "AND ((:DateStart >= ibdfr.dateStart AND :DateStart < ibdfr.dateEnd) OR (:DateEnd > ibdfr.dateStart AND :DateEnd <= ibdfr.dateEnd) OR (:DateStart < ibdfr.dateStart AND :DateEnd > ibdfr.dateEnd))")
    List<FestiveRoom> getListFestiveRoomDateBookingInvalid(@Param("DateStart")Date DateStart, @Param("DateEnd")Date DateEnd);

}