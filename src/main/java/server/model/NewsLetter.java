package server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "newsLetter")
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsLetter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_news_letter")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "reason")
    private String reason;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}