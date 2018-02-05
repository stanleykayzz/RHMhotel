package server.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

/**
 * Created by maxime on 20/09/2017.
 */
@ResponseStatus(UNAUTHORIZED)
public class FindClientByEmailException extends RuntimeException {
}
