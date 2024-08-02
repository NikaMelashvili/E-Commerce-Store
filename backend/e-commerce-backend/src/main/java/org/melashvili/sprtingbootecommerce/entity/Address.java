package org.melashvili.sprtingbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @Column(name = "city")
    @JsonProperty("city")
    private String city;

    @Column(name = "country")
    @JsonProperty("country")
    private String country;

    @Column(name = "state")
    @JsonProperty("state")
    private String state;

    @Column(name = "street")
    @JsonProperty("street")
    private String street;

    @Column(name = "zip_code")
    @JsonProperty("zipCode")
    private String zip;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}
