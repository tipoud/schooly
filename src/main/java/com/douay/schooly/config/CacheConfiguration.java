package com.douay.schooly.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.douay.schooly.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.douay.schooly.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Area.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Area.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Mark.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Skill.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Skill.class.getName() + ".subjects", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Teacher.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Teacher.class.getName() + ".classrooms", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Teacher.class.getName() + ".subjects", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Classroom.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Classroom.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Classroom.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Subject.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Subject.class.getName() + ".skills", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Subject.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Evaluation.class.getName(), jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Evaluation.class.getName() + ".marks", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Evaluation.class.getName() + ".attachments", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Evaluation.class.getName() + ".teachers", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.Evaluation.class.getName() + ".subjects", jcacheConfiguration);
            cm.createCache(com.douay.schooly.domain.EvaluationAttachment.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
