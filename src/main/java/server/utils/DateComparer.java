package server.utils;

import server.Exception.DateBookInvalidException;

import java.util.Calendar;
import java.util.Date;

public class DateComparer {

    public DateComparer() {

    }

    /**
     * Check if the date Start is holder than the date End.
     * If the date Start is holder, the function return true
     * else it return false.
     *
     * @param dateStart
     * @param dateEnd
     * @return
     */
    public static boolean dateRoomBookValidator(Date dateStart, Date dateEnd) {
        Calendar calMin = Calendar.getInstance();
        calMin.setTime(new Date());
        calMin.add(Calendar.DATE, 1);
        calMin.set(Calendar.HOUR_OF_DAY, 0);
        calMin.set(Calendar.MINUTE, 0);
        calMin.set(Calendar.SECOND, 0);

        Calendar calDateEndMin = Calendar.getInstance();
        calDateEndMin.setTime(dateStart);
        calMin.add(Calendar.DATE, 1);
        calMin.set(Calendar.HOUR_OF_DAY, 0);
        calMin.set(Calendar.MINUTE, 0);
        calMin.set(Calendar.SECOND, 0);

        Date dateMin = calMin.getTime();
        Date dateEndMin = calDateEndMin.getTime();

        if(dateStart.getTime() < dateMin.getTime() || dateEndMin.getTime() > dateEnd.getTime()){
            throw new DateBookInvalidException();
        }

        return true;

    }

    /**
     * The function calculate the difference between the current time
     * and the date send in parameters.
     * If the min time send in parameters isn't over,
     * the function return true else it return false.
     *
     * @param date
     * @param minutes
     * @param hours
     * @return
     */
    public static boolean compareDateByTime(Date date, int minutes, int hours) {
        Date currentDate = new Date();

        long diff = Math.abs(currentDate.getTime() - date.getTime());
        long diffMinutes = diff / 60000 % 60;
        long diffHours = diff / 3600000;

        return diffHours <= hours && diffMinutes < minutes;
    }

    public static int getDaysBetweenDates(Date dateStart, Date dateEnd){
        return (int)( (dateStart.getTime() - dateEnd.getTime()) / (86400000));
    }
}
