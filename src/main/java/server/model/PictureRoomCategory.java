package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

/**
 * Created by maxime on 20/09/2017.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pictureRoomCategory")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PictureRoomCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_picture_room_category")
    private Long id;

    @Column(name = "id_room_category")
    private Long idRoomCategory;

    @Column(name = "path")
    private String path;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdRoomCategory() {
        return idRoomCategory;
    }

    public void setIdRoomCategory(Long idRoomCategory) {
        this.idRoomCategory = idRoomCategory;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
