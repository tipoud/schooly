package com.douay.schooly.service.mapper;

import com.douay.schooly.domain.*;
import com.douay.schooly.service.dto.SkillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Skill and its DTO SkillDTO.
 */
@Mapper(componentModel = "spring", uses = {AreaMapper.class})
public interface SkillMapper extends EntityMapper<SkillDTO, Skill> {

    @Mapping(source = "area.id", target = "areaId")
    @Mapping(source = "area.wording", target = "areaWording")
    SkillDTO toDto(Skill skill);

    @Mapping(source = "areaId", target = "area")
    @Mapping(target = "subjects", ignore = true)
    Skill toEntity(SkillDTO skillDTO);

    default Skill fromId(Long id) {
        if (id == null) {
            return null;
        }
        Skill skill = new Skill();
        skill.setId(id);
        return skill;
    }
}
