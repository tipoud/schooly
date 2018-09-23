package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {SkillMapper.class, EvaluationMapper.class})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {

    @Mapping(source = "evaluation.id", target = "evaluationId")
    SubjectDTO toDto(Subject subject);

    @Mapping(target = "teachers", ignore = true)
    @Mapping(source = "evaluationId", target = "evaluation")
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
