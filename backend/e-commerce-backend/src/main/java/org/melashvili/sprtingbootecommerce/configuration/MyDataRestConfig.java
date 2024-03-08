package org.melashvili.sprtingbootecommerce.configuration;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.melashvili.sprtingbootecommerce.entity.Product;
import org.melashvili.sprtingbootecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] unsupportedMethods = {HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PUT};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedMethods)));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedMethods)));
        exposeid(config);
    }

    private void exposeid(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();

        List<Class> entityList = new ArrayList<>();

        for(EntityType tempType : entityTypes){
            entityList.add(tempType.getJavaType());
        }
        Class[] domainTypes = entityList.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
