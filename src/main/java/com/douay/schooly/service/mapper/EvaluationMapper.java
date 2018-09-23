package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.EvaluationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Evaluation and its DTO EvaluationDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, SubjectMapper.class})
public interface EvaluationMapper extends EntityMapper<EvaluationDTO, Evaluation> {

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.lastname", target = "teacherLastname")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.wording", target = "subjectWording")
    EvaluationDTO toDto(Evaluation evaluation);

    @Mapping(target = "marks", ignore = true)
    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    @Mapping(target = "subjects", ignore = true)
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "subjectId", target = "subject")
    Evaluation toEntity(EvaluationDTO evaluationDTO);

    default Evaluation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Evaluation evaluation = new Evaluation();
        evaluation.setId(id);
        return evaluation;
    }
}
