package com.hotel.hotelmanagement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Permet les requêtes sur tous les endpoints sous "/api/"
                        .allowedOrigins("http://127.0.0.1:5500") // Autorise cette origine spécifique
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise ces méthodes HTTP
                        .allowedHeaders("*") // Autorise tous les headers
                        .allowCredentials(true); // Permet l'envoi des cookies ou des credentials
            }
        };
    }
}
