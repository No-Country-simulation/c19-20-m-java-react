package com.adopetme.publication_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PublicationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PublicationServiceApplication.class, args);
	}

}
