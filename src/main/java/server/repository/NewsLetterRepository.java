package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.stereotype.Repository;
        import server.model.NewsLetter;

@Repository
public interface NewsLetterRepository extends JpaRepository<NewsLetter, Long>{
    NewsLetter findById(Long id);
}