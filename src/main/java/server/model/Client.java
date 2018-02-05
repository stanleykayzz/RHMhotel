package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_client")
    private Long id;

    @Column(name = "lastname")
    @NotEmpty(message = "A client must have a name")
    private String lastName;

    @Column(name = "firstname")
    @NotEmpty(message = "A client must have a first name")
    private String firstName;

    @Column(name = "sexe")
    private String sexe;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "email", unique = true)
    @NotEmpty(message = "A person must have an Email")
    private String email;

    @Column(name = "phone")
    @NotEmpty(message = "A person must have an Phone")
    private String phone;

    @Column(name = "country")
    @NotEmpty(message = "A person must have a Country")
    private String country;

    @Column(name = "city")
    @NotEmpty(message = "A person must have a City")
    private String city;

    @Column(name = "address")
    @NotEmpty(message = "A person must have an Address")
    private String address;

    @Column(name = "postal_code")
    @NotEmpty(message = "A person must have an Postal_code")
    private String postalCode;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "token")
    private String token;

    @Column(name = "token_date")
    private Date tokenDate;

    @Column(name = "code")
    private String code;

    @Column(name = "accreditation")
    private String accreditation;

    @Column(name = "status_actif")
    private String statusActif;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getTokenDate() {
        return tokenDate;
    }

    public void setTokenDate(Date tokenDate) {
        this.tokenDate = tokenDate;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAccreditation() {
        return accreditation;
    }

    public void setAccreditation(String accreditation) {
        this.accreditation = accreditation;
    }

    public String getStatusActif() {
        return statusActif;
    }

    public void setStatusActif(String statusActif) {
        this.statusActif = statusActif;
    }
}
