package com.douay.schooly.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Mark.
 */
@Entity
@Table(name = "mark")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mark implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_value", nullable = false)
    private Double value;

    @NotNull
    @Column(name = "nth", nullable = false)
    private Integer nth;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Skill skill;

    @ManyToOne
    @JsonIgnoreProperties("marks")
    private Evaluation evaluation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValue() {
        return value;
    }

    public Mark value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Integer getNth() {
        return nth;
    }

    public Mark nth(Integer nth) {
        this.nth = nth;
        return this;
    }

    public void setNth(Integer nth) {
        this.nth = nth;
    }

    public Student getStudent() {
        return student;
    }

    public Mark student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Skill getSkill() {
        return skill;
    }

    public Mark skill(Skill skill) {
        this.skill = skill;
        return this;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Evaluation getEvaluation() {
        return evaluation;
    }

    public Mark evaluation(Evaluation evaluation) {
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
        Mark mark = (Mark) o;
        if (mark.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mark.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mark{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", nth=" + getNth() +
            "}";
    }
}
