package com.douay.schooly.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Evaluation entity.
 */
public class EvaluationDTO implements Serializable {

    private Long id;

    @NotNull
    private String wording;

    private String comment;

    @NotNull
    private Integer status;

    @NotNull
    private LocalDate date;

    private Long teacherId;

    private String teacherLastname;

    private Long subjectId;

    private String subjectWording;

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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherLastname() {
        return teacherLastname;
    }

    public void setTeacherLastname(String teacherLastname) {
        this.teacherLastname = teacherLastname;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectWording() {
        return subjectWording;
    }

    public void setSubjectWording(String subjectWording) {
        this.subjectWording = subjectWording;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EvaluationDTO evaluationDTO = (EvaluationDTO) o;
        if (evaluationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EvaluationDTO{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", comment='" + getComment() + "'" +
            ", status=" + getStatus() +
            ", date='" + getDate() + "'" +
            ", teacher=" + getTeacherId() +
            ", teacher='" + getTeacherLastname() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectWording() + "'" +
            "}";
    }
}
