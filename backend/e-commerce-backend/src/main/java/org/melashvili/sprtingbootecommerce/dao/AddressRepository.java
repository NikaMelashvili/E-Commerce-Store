package org.melashvili.sprtingbootecommerce.dao;

import org.melashvili.sprtingbootecommerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
