package server.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Created by maxime on 20/09/2017.
 */
@ResponseStatus(BAD_REQUEST)
public class DateBookInvalidException extends RuntimeException {
}
