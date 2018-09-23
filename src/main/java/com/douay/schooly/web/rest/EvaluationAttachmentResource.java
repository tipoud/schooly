package com.douay.schooly.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.douay.schooly.service.EvaluationAttachmentService;
import com.douay.schooly.web.rest.errors.BadRequestAlertException;
import com.douay.schooly.web.rest.util.HeaderUtil;
import com.douay.schooly.service.dto.EvaluationAttachmentDTO;
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
 * REST controller for managing EvaluationAttachment.
 */
@RestController
@RequestMapping("/api")
public class EvaluationAttachmentResource {

    private final Logger log = LoggerFactory.getLogger(EvaluationAttachmentResource.class);

    private static final String ENTITY_NAME = "evaluationAttachment";

    private final EvaluationAttachmentService evaluationAttachmentService;

    public EvaluationAttachmentResource(EvaluationAttachmentService evaluationAttachmentService) {
        this.evaluationAttachmentService = evaluationAttachmentService;
    }

    /**
     * POST  /evaluation-attachments : Create a new evaluationAttachment.
     *
     * @param evaluationAttachmentDTO the evaluationAttachmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluationAttachmentDTO, or with status 400 (Bad Request) if the evaluationAttachment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluation-attachments")
    @Timed
    public ResponseEntity<EvaluationAttachmentDTO> createEvaluationAttachment(@Valid @RequestBody EvaluationAttachmentDTO evaluationAttachmentDTO) throws URISyntaxException {
        log.debug("REST request to save EvaluationAttachment : {}", evaluationAttachmentDTO);
        if (evaluationAttachmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new evaluationAttachment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EvaluationAttachmentDTO result = evaluationAttachmentService.save(evaluationAttachmentDTO);
        return ResponseEntity.created(new URI("/api/evaluation-attachments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluation-attachments : Updates an existing evaluationAttachment.
     *
     * @param evaluationAttachmentDTO the evaluationAttachmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluationAttachmentDTO,
     * or with status 400 (Bad Request) if the evaluationAttachmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the evaluationAttachmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluation-attachments")
    @Timed
    public ResponseEntity<EvaluationAttachmentDTO> updateEvaluationAttachment(@Valid @RequestBody EvaluationAttachmentDTO evaluationAttachmentDTO) throws URISyntaxException {
        log.debug("REST request to update EvaluationAttachment : {}", evaluationAttachmentDTO);
        if (evaluationAttachmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EvaluationAttachmentDTO result = evaluationAttachmentService.save(evaluationAttachmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluationAttachmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluation-attachments : get all the evaluationAttachments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of evaluationAttachments in body
     */
    @GetMapping("/evaluation-attachments")
    @Timed
    public List<EvaluationAttachmentDTO> getAllEvaluationAttachments() {
        log.debug("REST request to get all EvaluationAttachments");
        return evaluationAttachmentService.findAll();
    }

    /**
     * GET  /evaluation-attachments/:id : get the "id" evaluationAttachment.
     *
     * @param id the id of the evaluationAttachmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluationAttachmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/evaluation-attachments/{id}")
    @Timed
    public ResponseEntity<EvaluationAttachmentDTO> getEvaluationAttachment(@PathVariable Long id) {
        log.debug("REST request to get EvaluationAttachment : {}", id);
        Optional<EvaluationAttachmentDTO> evaluationAttachmentDTO = evaluationAttachmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(evaluationAttachmentDTO);
    }

    /**
     * DELETE  /evaluation-attachments/:id : delete the "id" evaluationAttachment.
     *
     * @param id the id of the evaluationAttachmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluation-attachments/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluationAttachment(@PathVariable Long id) {
        log.debug("REST request to delete EvaluationAttachment : {}", id);
        evaluationAttachmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
