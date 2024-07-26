package com.adopetme.pet_service.Config;

import org.springframework.data.jpa.domain.Specification;
import com.adopetme.pet_service.Model.PetModel;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PetSpecification implements Specification<PetModel> {
    private final String key;
    private final String operation;
    private final Object value;

    @Override
    public Predicate toPredicate(Root<PetModel> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if ("=".equalsIgnoreCase(operation)) {
            return criteriaBuilder.equal(root.get(key), value);
        } else if ("like".equalsIgnoreCase(operation)) {
            return criteriaBuilder.like(root.get(key), "%" + value + "%");
        }
        return null;
    }

}
