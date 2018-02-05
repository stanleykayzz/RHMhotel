package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.RoomCategory;

@Repository
public interface RoomCategoryRepository extends JpaRepository<RoomCategory, Long> {
}
