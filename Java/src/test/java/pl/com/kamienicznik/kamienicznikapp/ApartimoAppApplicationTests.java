package pl.com.kamienicznik.kamienicznikapp;

import org.junit.jupiter.api.Test;

import java.util.Calendar;
import java.util.Date;

class ApartimoAppApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void showP24Properties(){
        Date dat = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dat);
        calendar.add(Calendar.MONTH, 36);
        System.out.println(calendar.getTime());

    }

}
