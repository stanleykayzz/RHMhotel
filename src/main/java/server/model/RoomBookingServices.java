package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

/**
 * Created by maxime on 06/09/2017.
 */

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roomBookingServices")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoomBookingServices {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_room_booking_services")
    private Long id;

    @Column(name = "id_room_booking")
    private Long idRoomBooking;

    @Column(name = "id_room_service")
    private Long idRoomService;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdRoomBooking() {
        return idRoomBooking;
    }

    public void setIdRoomBooking(Long idRoomBooking) {
        this.idRoomBooking = idRoomBooking;
    }

    public Long getIdRoomService() {
        return idRoomService;
    }

    public void setIdRoomService(Long idRoomService) {
        this.idRoomService = idRoomService;
    }
}
