package org.melashvili.sprtingbootecommerce.controller;

import org.melashvili.sprtingbootecommerce.dto.Purchase;
import org.melashvili.sprtingbootecommerce.dto.PurchaseResponse;
import org.melashvili.sprtingbootecommerce.services.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public void setCheckoutService(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponse> placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse response = checkoutService.placeOrder(purchase);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
