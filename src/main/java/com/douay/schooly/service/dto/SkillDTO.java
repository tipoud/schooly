package com.douay.schooly.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Skill entity.
 */
public class SkillDTO implements Serializable {

    private Long id;

    @NotNull
    private String wording;

    private String level1;

    private String level2;

    private String level3;

    private String level4;

    @NotNull
    private Boolean active;

    private Long areaId;

    private String areaWording;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getLevel1() {
        return level1;
    }

    public void setLevel1(String level1) {
        this.level1 = level1;
    }

    public String getLevel2() {
        return level2;
    }

    public void setLevel2(String level2) {
        this.level2 = level2;
    }

    public String getLevel3() {
        return level3;
    }

    public void setLevel3(String level3) {
        this.level3 = level3;
    }

    public String getLevel4() {
        return level4;
    }

    public void setLevel4(String level4) {
        this.level4 = level4;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public String getAreaWording() {
        return areaWording;
    }

    public void setAreaWording(String areaWording) {
        this.areaWording = areaWording;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SkillDTO skillDTO = (SkillDTO) o;
        if (skillDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), skillDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SkillDTO{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", level1='" + getLevel1() + "'" +
            ", level2='" + getLevel2() + "'" +
            ", level3='" + getLevel3() + "'" +
            ", level4='" + getLevel4() + "'" +
            ", active='" + isActive() + "'" +
            ", area=" + getAreaId() +
            ", area='" + getAreaWording() + "'" +
            "}";
    }
}
