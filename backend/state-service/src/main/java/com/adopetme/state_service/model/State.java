package com.adopetme.state_service.model;


import com.adopetme.state_service.dto.StateDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "state")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_state")
    private Long idState;
    private String name;

    @Column(name = "id_country")
    private Long countryId;

    public StateDTO toDTO() {
        StateDTO state = new StateDTO();
        //state.setId_state(this.idState);
        state.setName(this.name);
        //state.setId_country(this.countryId);
        return state;
    }
}
