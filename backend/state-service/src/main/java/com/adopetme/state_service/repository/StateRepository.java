package com.adopetme.state_service.repository;

import com.adopetme.state_service.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRepository extends JpaRepository<State,Long> {
    @Override
    Optional<State> findById(Long aLong);
    Optional<State> findByName(String name);
    Optional<State> findByCountryIdAndName(Long countryId,String name);
    Optional<State> findByCountryIdAndIdState(Long countryId,Long idState);
    List<State> findByCountryId(Long id);
}
