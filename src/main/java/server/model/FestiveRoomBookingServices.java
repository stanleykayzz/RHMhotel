package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

/**
 * Created by maxime on 05/09/2017.
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "festiveRoomBookingServices")
@JsonIgnoreProperties(ignoreUnknown = true)
public class FestiveRoomBookingServices {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_festive_room_booking_services")
    private Long id;

    @Column(name = "id_festive_room_booking")
    private Long idFestiveRoomBooking;

    @Column(name = "id_festive_room_service")
    private Long idFestiveRoomService;

    @Column(name = "quantity")
    private int quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdFestiveRoomBooking() {
        return idFestiveRoomBooking;
    }

    public void setIdFestiveRoomBooking(Long idFestiveRoomBooking) {
        this.idFestiveRoomBooking = idFestiveRoomBooking;
    }

    public Long getIdFestiveRoomService() {
        return idFestiveRoomService;
    }

    public void setIdFestiveRoomService(Long idFestiveRoomService) {
        this.idFestiveRoomService = idFestiveRoomService;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
