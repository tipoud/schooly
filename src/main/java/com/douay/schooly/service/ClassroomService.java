package com.douay.schooly.service;

import com.douay.schooly.domain.Classroom;
import com.douay.schooly.repository.ClassroomRepository;
import com.douay.schooly.service.dto.ClassroomDTO;
import com.douay.schooly.service.mapper.ClassroomMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Classroom.
 */
@Service
@Transactional
public class ClassroomService {

    private final Logger log = LoggerFactory.getLogger(ClassroomService.class);

    private final ClassroomRepository classroomRepository;

    private final ClassroomMapper classroomMapper;

    public ClassroomService(ClassroomRepository classroomRepository, ClassroomMapper classroomMapper) {
        this.classroomRepository = classroomRepository;
        this.classroomMapper = classroomMapper;
    }

    /**
     * Save a classroom.
     *
     * @param classroomDTO the entity to save
     * @return the persisted entity
     */
    public ClassroomDTO save(ClassroomDTO classroomDTO) {
        log.debug("Request to save Classroom : {}", classroomDTO);
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        return classroomMapper.toDto(classroom);
    }

    /**
     * Get all the classrooms.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ClassroomDTO> findAll() {
        log.debug("Request to get all Classrooms");
        return classroomRepository.findAll().stream()
            .map(classroomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one classroom by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ClassroomDTO> findOne(Long id) {
        log.debug("Request to get Classroom : {}", id);
        return classroomRepository.findById(id)
            .map(classroomMapper::toDto);
    }

    /**
     * Delete the classroom by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Classroom : {}", id);
        classroomRepository.deleteById(id);
    }
}
