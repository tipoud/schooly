package com.douay.schooly.repository;

import com.douay.schooly.domain.Classroom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Classroom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

}
