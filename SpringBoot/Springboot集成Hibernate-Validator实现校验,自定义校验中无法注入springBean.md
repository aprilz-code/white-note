使用validator时，发现加了@compent，但是service无法注入
![image-1678691456931](https://file.losey.top/blog/image-1678691456931.png)![img.png](docs/imgs/valid_1.png)

解决办法如下：
```java
package com.aprilz.tiny.config;

import org.hibernate.validator.HibernateValidator;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.SpringConstraintValidatorFactory;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 * @author Aprilz
 * @date 2023/3/13-14:37
 * @description 自定义校验config
 */
@Configuration
public class ValidatorConfig {

    /**
     * 快速返回校验器
     *
     * @return
     */
    @Bean
    @ConditionalOnMissingBean(value = Validator.class)
    public Validator validator(AutowireCapableBeanFactory beanFactory) {
        //hibernate-validator 6.x没问题，7.x有问题
        ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)
                .configure()
                .constraintValidatorFactory(new SpringConstraintValidatorFactory(beanFactory))// 使用spring代理，
             //   .failFast(true) //不需要快速失败,需要则打开
                .buildValidatorFactory();
        return validatorFactory.getValidator();
    }

}

```


excel中同上，Validators类中使用自定义validators
```java
package cn.aprilz.excel.core;

import cn.hutool.extra.spring.SpringUtil;

import javax.validation.*;
import java.util.Set;

/**
 * 校验工具
 *
 * @author L.cm
 */
public final class Validators {

    private Validators() {
    }

    private static final Validator VALIDATOR;

    static {
        
//        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
//        VALIDATOR = factory.getValidator();
        //使用自定义validator
        VALIDATOR= SpringUtil.getBean("validator");
    }

    /**
     * Validates all constraints on {@code object}.
     *
     * @param object object to validate
     * @param <T>    the type of the object to validate
     * @return constraint violations or an empty set if none
     * @throws IllegalArgumentException if object is {@code null} or if {@code null} is
     *                                  passed to the varargs groups
     * @throws ValidationException      if a non recoverable error happens during the
     *                                  validation process
     */
    public static <T> Set<ConstraintViolation<T>> validate(T object) {
        return VALIDATOR.validate(object);
    }

}

```

再次尝试，发现已经可以注入bean了
![image-1678691471467](https://file.losey.top/blog/image-1678691471467.png)![img.png](docs/imgs/valid_2.png)

原因分析 ConstraintValidatorFactory 默认实现类ConstraintValidatorFactoryImpl ，使用INSTANCE创建对象，不受spring管理
，所以这里改用SpringConstraintValidatorFactory即可