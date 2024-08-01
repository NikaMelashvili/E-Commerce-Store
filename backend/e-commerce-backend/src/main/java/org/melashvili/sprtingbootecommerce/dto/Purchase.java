package org.melashvili.sprtingbootecommerce.dto;

import lombok.Getter;
import lombok.Setter;
import org.melashvili.sprtingbootecommerce.entity.Address;
import org.melashvili.sprtingbootecommerce.entity.Customer;
import org.melashvili.sprtingbootecommerce.entity.Order;
import org.melashvili.sprtingbootecommerce.entity.OrderItem;

import java.util.Set;

@Getter
@Setter
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
