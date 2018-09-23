package com.douay.schooly.repository;

import com.douay.schooly.domain.Mark;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {

}
