package server.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import static org.springframework.http.HttpStatus.FORBIDDEN;

/**
 * Created by maxime on 19/09/2017.
 */
@ResponseStatus(FORBIDDEN)
public class AdminAccessNotAvailableException extends RuntimeException{
}
