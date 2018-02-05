package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.FestiveRoomBooking;

import java.util.List;

/**
 * Created by molla on 27/08/2017.
 */

@Repository
public interface FestiveRoomBookingRepository extends JpaRepository<FestiveRoomBooking, Long>{

    @Query("select frb from FestiveRoomBooking frb where status = 'active' and idClient = :idClient ")
    List<FestiveRoomBooking> findByIdClient(@Param("idClient") Long idClient);

    @Query("select frb from FestiveRoomBooking frb where status = 'active' and dateEnd > CURRENT_TIME ")
    List<FestiveRoomBooking> getListActivated();
}
