package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by maxime on 06/09/2017.
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "invalidBookingDateFestiveRoom")
@JsonIgnoreProperties(ignoreUnknown = true)
public class InvalidBookingDateFestiveRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_invalid_booking_date_festive_room")
    private Long id;

    @Column(name = "date_start")
    private Date dateStart;

    @Column(name = "date_end")
    private Date dateEnd;

    @Column(name = "status")
    private String status;

    @Column(name = "id_festive_room")
    private Long idFestiveRoom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getIdFestiveRoom() {
        return idFestiveRoom;
    }

    public void setIdFestiveRoom(Long idFestiveRoom) {
        this.idFestiveRoom = idFestiveRoom;
    }
}
