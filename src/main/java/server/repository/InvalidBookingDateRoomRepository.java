package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.InvalidBookingDateRoom;

import java.util.Date;
import java.util.List;

/**
 * Created by maxime on 09/09/2017.
 */
@Repository
public interface InvalidBookingDateRoomRepository extends JpaRepository<InvalidBookingDateRoom, Long> {

    @Query("select b from InvalidBookingDateRoom b where dateEnd > :MinDate or dateEnd = :MinDate and status='active'")
    List<InvalidBookingDateRoom> getListInvalidBookingDateRoomByMinDate(@Param("MinDate") Date MinDate);

    @Query("select b from InvalidBookingDateRoom b where idRoom = :IdRoom and (((dateStart = :DateStart or dateStart < :DateStart) and dateEnd > :DateStart) or ((dateStart < :DateEnd) and (dateEnd > :DateEnd or dateEnd = :DateEnd)))")
    List<InvalidBookingDateRoom> alreadyInvalidAtSameDate(@Param("IdRoom") Long IdRoom, @Param("DateStart") Date DateStart, @Param("DateEnd") Date DateEnd);
}
