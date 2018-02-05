package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.NewsLetter;
import server.repository.NewsLetterRepository;

import java.util.List;

@Service
public class NewsLetterService {

    @Autowired
    private NewsLetterRepository newsletterRepository;


}
