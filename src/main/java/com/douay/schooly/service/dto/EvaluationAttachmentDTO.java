package com.douay.schooly.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the EvaluationAttachment entity.
 */
public class EvaluationAttachmentDTO implements Serializable {

    private Long id;

    @NotNull
    private String wording;

    private String type;

    private LocalDate date;

    private String path;

    private Long evaluationId;

    private String evaluationWording;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
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

        EvaluationAttachmentDTO evaluationAttachmentDTO = (EvaluationAttachmentDTO) o;
        if (evaluationAttachmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluationAttachmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EvaluationAttachmentDTO{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", type='" + getType() + "'" +
            ", date='" + getDate() + "'" +
            ", path='" + getPath() + "'" +
            ", evaluation=" + getEvaluationId() +
            ", evaluation='" + getEvaluationWording() + "'" +
            "}";
    }
}
