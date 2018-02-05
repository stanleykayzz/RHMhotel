package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.model.Client;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select c from Client c where email = :Email and password = :Password")
    Client login(@Param("Email") String email, @Param("Password") String password);

    @Query("select c from Client c where email = :Email and code = :Code")
    Client confirmation(@Param("Email") String email, @Param("Code") String code);

    @Query("select c from Client c where statusActif = 'active' and accreditation = 'user'")
    List<Client> getListUserActif();

    Client findByToken(@Param("Token") String token);

    Client findClientByEmailEquals(String email);

    Client findClientByTokenEquals(String tokenClient);

}
