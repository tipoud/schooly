package com.douay.schooly.repository;

import com.douay.schooly.domain.EvaluationAttachment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EvaluationAttachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluationAttachmentRepository extends JpaRepository<EvaluationAttachment, Long> {

}
