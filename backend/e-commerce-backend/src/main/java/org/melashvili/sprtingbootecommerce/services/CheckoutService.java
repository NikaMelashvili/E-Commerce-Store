package org.melashvili.sprtingbootecommerce.services;

import org.melashvili.sprtingbootecommerce.dto.Purchase;
import org.melashvili.sprtingbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
