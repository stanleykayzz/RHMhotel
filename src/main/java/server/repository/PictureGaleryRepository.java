package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.PictureGalery;

/**
 * Created by maxime on 20/09/2017.
 */
@Repository
public interface PictureGaleryRepository extends JpaRepository<PictureGalery, Long> {
}
