package com.douay.schooly.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @Column(name = "jhi_comment")
    private String comment;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "evaluation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Mark> marks = new HashSet<>();

    @OneToMany(mappedBy = "evaluation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EvaluationAttachment> attachments = new HashSet<>();

    @OneToMany(mappedBy = "evaluation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "evaluation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Subject> subjects = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Teacher teacher;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Subject subject;

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

    public Evaluation wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getComment() {
        return comment;
    }

    public Evaluation comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStatus() {
        return status;
    }

    public Evaluation status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public Evaluation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Mark> getMarks() {
        return marks;
    }

    public Evaluation marks(Set<Mark> marks) {
        this.marks = marks;
        return this;
    }

    public Evaluation addMark(Mark mark) {
        this.marks.add(mark);
        mark.setEvaluation(this);
        return this;
    }

    public Evaluation removeMark(Mark mark) {
        this.marks.remove(mark);
        mark.setEvaluation(null);
        return this;
    }

    public void setMarks(Set<Mark> marks) {
        this.marks = marks;
    }

    public Set<EvaluationAttachment> getAttachments() {
        return attachments;
    }

    public Evaluation attachments(Set<EvaluationAttachment> evaluationAttachments) {
        this.attachments = evaluationAttachments;
        return this;
    }

    public Evaluation addAttachment(EvaluationAttachment evaluationAttachment) {
        this.attachments.add(evaluationAttachment);
        evaluationAttachment.setEvaluation(this);
        return this;
    }

    public Evaluation removeAttachment(EvaluationAttachment evaluationAttachment) {
        this.attachments.remove(evaluationAttachment);
        evaluationAttachment.setEvaluation(null);
        return this;
    }

    public void setAttachments(Set<EvaluationAttachment> evaluationAttachments) {
        this.attachments = evaluationAttachments;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Evaluation teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Evaluation addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setEvaluation(this);
        return this;
    }

    public Evaluation removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setEvaluation(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Evaluation subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Evaluation addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.setEvaluation(this);
        return this;
    }

    public Evaluation removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.setEvaluation(null);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Evaluation teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Subject getSubject() {
        return subject;
    }

    public Evaluation subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
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
        Evaluation evaluation = (Evaluation) o;
        if (evaluation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", comment='" + getComment() + "'" +
            ", status=" + getStatus() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
