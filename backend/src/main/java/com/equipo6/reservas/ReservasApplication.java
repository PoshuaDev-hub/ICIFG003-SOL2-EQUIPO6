package com.equipo6.reservas;

import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class ReservasApplication {

	private static final Logger log = LoggerFactory.getLogger(ReservasApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ReservasApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void alIniciar() {
		log.info("\n==================================================");
		log.info("EJECUCIÓN EXITOSA DEL BACKEND");
		log.info("Backend API:   http://localhost:8080/api/salas");
		log.info("Frontend App:  http://localhost:4200");
		log.info("==================================================\n");
	}

	@PreDestroy
	public void alDetener() {
		log.info("==================================================");
		log.info("BACKEND DETENIDO - SHUTDOWN GRACEFUL");
		log.info("==================================================");
	}
}
