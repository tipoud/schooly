package com.douay.schooly.service;

import com.douay.schooly.domain.Skill;
import com.douay.schooly.repository.SkillRepository;
import com.douay.schooly.service.dto.SkillDTO;
import com.douay.schooly.service.mapper.SkillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Skill.
 */
@Service
@Transactional
public class SkillService {

    private final Logger log = LoggerFactory.getLogger(SkillService.class);

    private final SkillRepository skillRepository;

    private final SkillMapper skillMapper;

    public SkillService(SkillRepository skillRepository, SkillMapper skillMapper) {
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
    }

    /**
     * Save a skill.
     *
     * @param skillDTO the entity to save
     * @return the persisted entity
     */
    public SkillDTO save(SkillDTO skillDTO) {
        log.debug("Request to save Skill : {}", skillDTO);
        Skill skill = skillMapper.toEntity(skillDTO);
        skill = skillRepository.save(skill);
        return skillMapper.toDto(skill);
    }

    /**
     * Get all the skills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SkillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Skills");
        return skillRepository.findAll(pageable)
            .map(skillMapper::toDto);
    }


    /**
     * Get one skill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SkillDTO> findOne(Long id) {
        log.debug("Request to get Skill : {}", id);
        return skillRepository.findById(id)
            .map(skillMapper::toDto);
    }

    /**
     * Delete the skill by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Skill : {}", id);
        skillRepository.deleteById(id);
    }
}
