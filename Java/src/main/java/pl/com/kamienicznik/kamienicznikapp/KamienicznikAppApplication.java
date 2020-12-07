package pl.com.kamienicznik.kamienicznikapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;
import pl.com.kamienicznik.kamienicznikapp.property.FileStorageProperties;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableScheduling
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class KamienicznikAppApplication {

    public static void main(String[] args) {

        SpringApplication.run(KamienicznikAppApplication.class, args);
     
    }

}
