package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.MarkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mark and its DTO MarkDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, SkillMapper.class, EvaluationMapper.class})
public interface MarkMapper extends EntityMapper<MarkDTO, Mark> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.lastname", target = "studentLastname")
    @Mapping(source = "skill.id", target = "skillId")
    @Mapping(source = "skill.wording", target = "skillWording")
    @Mapping(source = "evaluation.id", target = "evaluationId")
    @Mapping(source = "evaluation.wording", target = "evaluationWording")
    MarkDTO toDto(Mark mark);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "skillId", target = "skill")
    @Mapping(source = "evaluationId", target = "evaluation")
    Mark toEntity(MarkDTO markDTO);

    default Mark fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mark mark = new Mark();
        mark.setId(id);
        return mark;
    }
}
