package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ClassroomMapper.class, SubjectMapper.class, EvaluationMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "evaluation.id", target = "evaluationId")
    TeacherDTO toDto(Teacher teacher);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "evaluationId", target = "evaluation")
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}
