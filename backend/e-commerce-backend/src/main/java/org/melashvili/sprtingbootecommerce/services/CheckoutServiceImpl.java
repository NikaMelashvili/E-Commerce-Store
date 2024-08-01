package org.melashvili.sprtingbootecommerce.services;

import jakarta.transaction.Transactional;
import org.melashvili.sprtingbootecommerce.dao.CustomerRepository;
import org.melashvili.sprtingbootecommerce.dto.Purchase;
import org.melashvili.sprtingbootecommerce.dto.PurchaseResponse;
import org.melashvili.sprtingbootecommerce.entity.Customer;
import org.melashvili.sprtingbootecommerce.entity.Order;
import org.melashvili.sprtingbootecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String trackingNumber = generateTrackingNumber();
        order.setTrackingNumber(trackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(trackingNumber);
    }


    private String generateTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
