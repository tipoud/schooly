package com.douay.schooly.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Classroom entity.
 */
public class ClassroomDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer level;

    @NotNull
    private String wording;

    @NotNull
    private Integer year;

    @NotNull
    private Boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
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

        ClassroomDTO classroomDTO = (ClassroomDTO) o;
        if (classroomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classroomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassroomDTO{" +
            "id=" + getId() +
            ", level=" + getLevel() +
            ", wording='" + getWording() + "'" +
            ", year=" + getYear() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
