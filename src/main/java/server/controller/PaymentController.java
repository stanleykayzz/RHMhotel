package server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.utils.Converter.CurrencyConvert;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by maxime on 28/09/2017.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @RequestMapping(method = GET)
    public String getCurrencyInfo(@RequestParam("ipClient") String ipClient){
        return CurrencyConvert.countryCurrencyInfo(ipClient, "XAF", "local");
    }
}
