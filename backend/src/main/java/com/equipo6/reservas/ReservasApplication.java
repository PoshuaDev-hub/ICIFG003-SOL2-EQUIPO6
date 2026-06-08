package com.equipo6.reservas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

// Clase principal de la aplicación Spring Boot
@SpringBootApplication
public class ReservasApplication {

	public static void main(String[] args) {
		// Inicia el contexto de Spring
		SpringApplication.run(ReservasApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void alIniciar() {
		System.out.println("\n==================================================");
		System.out.println("EJECUCIÓN EXITOSA DEL BACKEND");
		System.out.println("Backend API:   http://localhost:8080/api/salas");
		System.out.println("Frontend App:  http://localhost:4200");
		System.out.println("==================================================\n");
	}
}
