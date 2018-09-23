package com.douay.schooly.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Mark entity.
 */
public class MarkDTO implements Serializable {

    private Long id;

    @NotNull
    private Double value;

    @NotNull
    private Integer nth;

    private Long studentId;

    private String studentLastname;

    private Long skillId;

    private String skillWording;

    private Long evaluationId;

    private String evaluationWording;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Integer getNth() {
        return nth;
    }

    public void setNth(Integer nth) {
        this.nth = nth;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentLastname() {
        return studentLastname;
    }

    public void setStudentLastname(String studentLastname) {
        this.studentLastname = studentLastname;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getSkillWording() {
        return skillWording;
    }

    public void setSkillWording(String skillWording) {
        this.skillWording = skillWording;
    }

    public Long getEvaluationId() {
        return evaluationId;
    }

    public void setEvaluationId(Long evaluationId) {
        this.evaluationId = evaluationId;
    }

    public String getEvaluationWording() {
        return evaluationWording;
    }

    public void setEvaluationWording(String evaluationWording) {
        this.evaluationWording = evaluationWording;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MarkDTO markDTO = (MarkDTO) o;
        if (markDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), markDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MarkDTO{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", nth=" + getNth() +
            ", student=" + getStudentId() +
            ", student='" + getStudentLastname() + "'" +
            ", skill=" + getSkillId() +
            ", skill='" + getSkillWording() + "'" +
            ", evaluation=" + getEvaluationId() +
            ", evaluation='" + getEvaluationWording() + "'" +
            "}";
    }
}
