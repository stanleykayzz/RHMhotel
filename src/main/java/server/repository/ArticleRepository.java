package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{

    Article findById(Long id);
}