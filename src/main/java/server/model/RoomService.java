package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by maxime on 06/09/2017.
 */

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roomService")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoomService {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_room_service")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private float price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
