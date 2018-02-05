package server.Exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE;

/**
 * Created by maxime on 30/09/2017.
 */
@ResponseStatus(NOT_ACCEPTABLE)
public class CancelRestaurantBookException extends RuntimeException {
}
