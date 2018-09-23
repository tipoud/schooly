package com.douay.schooly.service;

import com.douay.schooly.domain.EvaluationAttachment;
import com.douay.schooly.repository.EvaluationAttachmentRepository;
import com.douay.schooly.service.dto.EvaluationAttachmentDTO;
import com.douay.schooly.service.mapper.EvaluationAttachmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing EvaluationAttachment.
 */
@Service
@Transactional
public class EvaluationAttachmentService {

    private final Logger log = LoggerFactory.getLogger(EvaluationAttachmentService.class);

    private final EvaluationAttachmentRepository evaluationAttachmentRepository;

    private final EvaluationAttachmentMapper evaluationAttachmentMapper;

    public EvaluationAttachmentService(EvaluationAttachmentRepository evaluationAttachmentRepository, EvaluationAttachmentMapper evaluationAttachmentMapper) {
        this.evaluationAttachmentRepository = evaluationAttachmentRepository;
        this.evaluationAttachmentMapper = evaluationAttachmentMapper;
    }

    /**
     * Save a evaluationAttachment.
     *
     * @param evaluationAttachmentDTO the entity to save
     * @return the persisted entity
     */
    public EvaluationAttachmentDTO save(EvaluationAttachmentDTO evaluationAttachmentDTO) {
        log.debug("Request to save EvaluationAttachment : {}", evaluationAttachmentDTO);
        EvaluationAttachment evaluationAttachment = evaluationAttachmentMapper.toEntity(evaluationAttachmentDTO);
        evaluationAttachment = evaluationAttachmentRepository.save(evaluationAttachment);
        return evaluationAttachmentMapper.toDto(evaluationAttachment);
    }

    /**
     * Get all the evaluationAttachments.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<EvaluationAttachmentDTO> findAll() {
        log.debug("Request to get all EvaluationAttachments");
        return evaluationAttachmentRepository.findAll().stream()
            .map(evaluationAttachmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one evaluationAttachment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<EvaluationAttachmentDTO> findOne(Long id) {
        log.debug("Request to get EvaluationAttachment : {}", id);
        return evaluationAttachmentRepository.findById(id)
            .map(evaluationAttachmentMapper::toDto);
    }

    /**
     * Delete the evaluationAttachment by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EvaluationAttachment : {}", id);
        evaluationAttachmentRepository.deleteById(id);
    }
}
