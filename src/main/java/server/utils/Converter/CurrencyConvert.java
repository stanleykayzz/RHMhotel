package server.utils.Converter;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by maxime on 27/09/2017.
 */
public class CurrencyConvert {
    
    public static float getConvertedPrice(float price) {
        JSONObject jsonObject = new JSONObject(CurrencyConvert.countryCurrencyInfo("", "EUR", "bulk"));
        JSONObject r = jsonObject.getJSONObject("rates");
        double rates = r.getDouble("XAF");
        float result = price / (float) rates;

        return result;
    }

    public static String countryCurrencyInfo(String ipClient, String countryCode, String localisate) {
        HttpURLConnection yc = null;

        try {
            //Create connection
            URL oracle = new URL("https://v3.exchangerate-api.com/"+ localisate +"/25aa0eb5220ed3dbf84509e6/"+ countryCode +"/" + ipClient);
            yc = (HttpURLConnection) oracle.openConnection();

            yc.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            yc.setUseCaches(false);
            yc.setDoOutput(true);

            //Send request
            DataOutputStream wr = new DataOutputStream(
                    yc.getOutputStream());
            wr.close();

            //Get Response
            InputStream is = yc.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();

            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (yc != null) {
                yc.disconnect();
            }
        }
    }

}
