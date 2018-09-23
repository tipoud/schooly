package com.douay.schooly.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Area entity.
 */
public class AreaDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer number;

    @NotNull
    private String wording;

    @NotNull
    private Boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AreaDTO areaDTO = (AreaDTO) o;
        if (areaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), areaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AreaDTO{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", wording='" + getWording() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
