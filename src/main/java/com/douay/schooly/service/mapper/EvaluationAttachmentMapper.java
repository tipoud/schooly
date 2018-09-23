package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.EvaluationAttachmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EvaluationAttachment and its DTO EvaluationAttachmentDTO.
 */
@Mapper(componentModel = "spring", uses = {EvaluationMapper.class})
public interface EvaluationAttachmentMapper extends EntityMapper<EvaluationAttachmentDTO, EvaluationAttachment> {

    @Mapping(source = "evaluation.id", target = "evaluationId")
    @Mapping(source = "evaluation.wording", target = "evaluationWording")
    EvaluationAttachmentDTO toDto(EvaluationAttachment evaluationAttachment);

    @Mapping(source = "evaluationId", target = "evaluation")
    EvaluationAttachment toEntity(EvaluationAttachmentDTO evaluationAttachmentDTO);

    default EvaluationAttachment fromId(Long id) {
        if (id == null) {
            return null;
        }
        EvaluationAttachment evaluationAttachment = new EvaluationAttachment();
        evaluationAttachment.setId(id);
        return evaluationAttachment;
    }
}
