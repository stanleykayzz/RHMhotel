package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.RestaurantTableBooking;

import java.util.Date;
import java.util.List;

/**
 * Created by maxime on 09/09/2017.
 */
@Repository
public interface RestaurantTableBookingRepository extends JpaRepository<RestaurantTableBooking, Long> {

    @Query("select rtb from  RestaurantTableBooking rtb where date >= :dateStart and date <= :dateEnd and status = 'active'")
    List<RestaurantTableBooking> getBook(@Param("dateStart")Date dateStart, @Param("dateEnd") Date dateEnd);

    @Query("select rtb from  RestaurantTableBooking rtb where date >= :dateStart and date <= :dateEnd and idClient = :IdClient and status = 'active'")
    List<RestaurantTableBooking> getBookByIdClient(@Param("dateStart")Date dateStart, @Param("dateEnd") Date dateEnd, @Param("IdClient") Long IdClient);

    @Query("select rtb from RestaurantTableBooking rtb where idClient = :IdClient and date >= current_date and status = 'active'")
    List<RestaurantTableBooking> getListAvailableBookByIdClient(@Param("IdClient") Long IdClient);

    @Query("select rtb from  RestaurantTableBooking rtb where date >= :Date and status = 'active'")
    List<RestaurantTableBooking> getBookByDate(@Param("Date")Date Date);
}
