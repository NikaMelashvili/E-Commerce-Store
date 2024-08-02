package org.melashvili.sprtingbootecommerce.dao;

import org.melashvili.sprtingbootecommerce.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItems, Integer> {
}
