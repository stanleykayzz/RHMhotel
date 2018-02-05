package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.PictureRoomCategory;

/**
 * Created by maxime on 20/09/2017.
 */
@Repository
public interface PictureRoomCategoryRepository extends JpaRepository<PictureRoomCategory, Long> {

    @Query("select p from PictureRoomCategory p where idRoomCategory = :IdCategory")
    PictureRoomCategory getPictureByIdCategory(@Param("IdCategory") Long IdCategory);
}
