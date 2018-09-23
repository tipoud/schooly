package com.douay.schooly.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EvaluationAttachment.
 */
@Entity
@Table(name = "evaluation_attachment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EvaluationAttachment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "path")
    private String path;

    @ManyToOne
    @JsonIgnoreProperties("attachments")
    private Evaluation evaluation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWording() {
        return wording;
    }

    public EvaluationAttachment wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getType() {
        return type;
    }

    public EvaluationAttachment type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public EvaluationAttachment date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPath() {
        return path;
    }

    public EvaluationAttachment path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Evaluation getEvaluation() {
        return evaluation;
    }

    public EvaluationAttachment evaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
        return this;
    }

    public void setEvaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EvaluationAttachment evaluationAttachment = (EvaluationAttachment) o;
        if (evaluationAttachment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluationAttachment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EvaluationAttachment{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", type='" + getType() + "'" +
            ", date='" + getDate() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
