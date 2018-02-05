package server.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.Client;
import server.repository.ClientRepository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class SecurityClientService {
    private final Logger LOG = LoggerFactory.getLogger(this.getClass());
    private static String ENCRYPTION_KEY = "45811456458114";

    @Autowired
    private ClientRepository clientRepository;

    public String hashPassword(String password){
        MessageDigest digest = null;
        String finalPassword = "bad password";
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(
                    password.getBytes(StandardCharsets.UTF_8));
            finalPassword = bytesToHex(encodedhash);
            LOG.trace("Generate new hash {}", finalPassword);
            return finalPassword;
        } catch (NoSuchAlgorithmException e) {
            LOG.error("Cannot hash {}, result: {}", password, finalPassword);
        }
        return finalPassword;
    }


    public String createCodeClient() {
        return String.valueOf(ThreadLocalRandom.current().nextInt(0, 9999));
    }

    public String generateNewPassword() {
        char[] chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }

        return sb.toString();
    }

    private static String bytesToHex(byte[] hash) {
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public String generateToken(){
        String token = UUID.randomUUID().toString();
        Client  client = clientRepository.findByToken(token);

        if(client != null){
            generateToken();
        } else {
            return token;
        }

        return "";
    }
}
