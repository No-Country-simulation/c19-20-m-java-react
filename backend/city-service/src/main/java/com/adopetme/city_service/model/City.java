package com.adopetme.city_service.model;


import com.adopetme.city_service.dto.CityDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "city")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCity;

    private String name;
    @Column(name = "id_state")
    private Long stateId;
    @Column(name = "id_country")
    private Long countryId;

    public CityDTO toDTO() {
        CityDTO city = new CityDTO();
        city.setName(this.name);

        return city;
    }
}
