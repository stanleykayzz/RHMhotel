package server.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Created by maxime on 28/09/2017.
 */
@ResponseStatus(BAD_REQUEST)
public class DateExpiredException extends RuntimeException{
}


