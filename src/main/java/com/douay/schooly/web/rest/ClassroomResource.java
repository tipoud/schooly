package com.douay.schooly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.douay.schooly.service.ClassroomService;
import com.douay.schooly.web.rest.errors.BadRequestAlertException;
import com.douay.schooly.web.rest.util.HeaderUtil;
import com.douay.schooly.service.dto.ClassroomDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Classroom.
 */
@RestController
@RequestMapping("/api")
public class ClassroomResource {

    private final Logger log = LoggerFactory.getLogger(ClassroomResource.class);

    private static final String ENTITY_NAME = "classroom";

    private final ClassroomService classroomService;

    public ClassroomResource(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    /**
     * POST  /classrooms : Create a new classroom.
     *
     * @param classroomDTO the classroomDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classroomDTO, or with status 400 (Bad Request) if the classroom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/classrooms")
    @Timed
    public ResponseEntity<ClassroomDTO> createClassroom(@Valid @RequestBody ClassroomDTO classroomDTO) throws URISyntaxException {
        log.debug("REST request to save Classroom : {}", classroomDTO);
        if (classroomDTO.getId() != null) {
            throw new BadRequestAlertException("A new classroom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClassroomDTO result = classroomService.save(classroomDTO);
        return ResponseEntity.created(new URI("/api/classrooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /classrooms : Updates an existing classroom.
     *
     * @param classroomDTO the classroomDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classroomDTO,
     * or with status 400 (Bad Request) if the classroomDTO is not valid,
     * or with status 500 (Internal Server Error) if the classroomDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/classrooms")
    @Timed
    public ResponseEntity<ClassroomDTO> updateClassroom(@Valid @RequestBody ClassroomDTO classroomDTO) throws URISyntaxException {
        log.debug("REST request to update Classroom : {}", classroomDTO);
        if (classroomDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClassroomDTO result = classroomService.save(classroomDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classroomDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /classrooms : get all the classrooms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of classrooms in body
     */
    @GetMapping("/classrooms")
    @Timed
    public List<ClassroomDTO> getAllClassrooms() {
        log.debug("REST request to get all Classrooms");
        return classroomService.findAll();
    }

    /**
     * GET  /classrooms/:id : get the "id" classroom.
     *
     * @param id the id of the classroomDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classroomDTO, or with status 404 (Not Found)
     */
    @GetMapping("/classrooms/{id}")
    @Timed
    public ResponseEntity<ClassroomDTO> getClassroom(@PathVariable Long id) {
        log.debug("REST request to get Classroom : {}", id);
        Optional<ClassroomDTO> classroomDTO = classroomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(classroomDTO);
    }

    /**
     * DELETE  /classrooms/:id : delete the "id" classroom.
     *
     * @param id the id of the classroomDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/classrooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long id) {
        log.debug("REST request to delete Classroom : {}", id);
        classroomService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
