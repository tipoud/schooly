package com.douay.schooly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.douay.schooly.service.MarkService;
import com.douay.schooly.web.rest.errors.BadRequestAlertException;
import com.douay.schooly.web.rest.util.HeaderUtil;
import com.douay.schooly.service.dto.MarkDTO;
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
 * REST controller for managing Mark.
 */
@RestController
@RequestMapping("/api")
public class MarkResource {

    private final Logger log = LoggerFactory.getLogger(MarkResource.class);

    private static final String ENTITY_NAME = "mark";

    private final MarkService markService;

    public MarkResource(MarkService markService) {
        this.markService = markService;
    }

    /**
     * POST  /marks : Create a new mark.
     *
     * @param markDTO the markDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new markDTO, or with status 400 (Bad Request) if the mark has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/marks")
    @Timed
    public ResponseEntity<MarkDTO> createMark(@Valid @RequestBody MarkDTO markDTO) throws URISyntaxException {
        log.debug("REST request to save Mark : {}", markDTO);
        if (markDTO.getId() != null) {
            throw new BadRequestAlertException("A new mark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MarkDTO result = markService.save(markDTO);
        return ResponseEntity.created(new URI("/api/marks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marks : Updates an existing mark.
     *
     * @param markDTO the markDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated markDTO,
     * or with status 400 (Bad Request) if the markDTO is not valid,
     * or with status 500 (Internal Server Error) if the markDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/marks")
    @Timed
    public ResponseEntity<MarkDTO> updateMark(@Valid @RequestBody MarkDTO markDTO) throws URISyntaxException {
        log.debug("REST request to update Mark : {}", markDTO);
        if (markDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MarkDTO result = markService.save(markDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, markDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marks : get all the marks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of marks in body
     */
    @GetMapping("/marks")
    @Timed
    public List<MarkDTO> getAllMarks() {
        log.debug("REST request to get all Marks");
        return markService.findAll();
    }

    /**
     * GET  /marks/:id : get the "id" mark.
     *
     * @param id the id of the markDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the markDTO, or with status 404 (Not Found)
     */
    @GetMapping("/marks/{id}")
    @Timed
    public ResponseEntity<MarkDTO> getMark(@PathVariable Long id) {
        log.debug("REST request to get Mark : {}", id);
        Optional<MarkDTO> markDTO = markService.findOne(id);
        return ResponseUtil.wrapOrNotFound(markDTO);
    }

    /**
     * DELETE  /marks/:id : delete the "id" mark.
     *
     * @param id the id of the markDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/marks/{id}")
    @Timed
    public ResponseEntity<Void> deleteMark(@PathVariable Long id) {
        log.debug("REST request to delete Mark : {}", id);
        markService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
