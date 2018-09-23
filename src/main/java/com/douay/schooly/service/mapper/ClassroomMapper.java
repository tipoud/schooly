package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.ClassroomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Classroom and its DTO ClassroomDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClassroomMapper extends EntityMapper<ClassroomDTO, Classroom> {


    @Mapping(target = "students", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    Classroom toEntity(ClassroomDTO classroomDTO);

    default Classroom fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classroom classroom = new Classroom();
        classroom.setId(id);
        return classroom;
    }
}
