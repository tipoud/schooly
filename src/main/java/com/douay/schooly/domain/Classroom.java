package com.douay.schooly.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Classroom.
 */
@Entity
@Table(name = "classroom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classroom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_level", nullable = false)
    private Integer level;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Integer year;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToMany(mappedBy = "classroom")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    @ManyToMany(mappedBy = "classrooms")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLevel() {
        return level;
    }

    public Classroom level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getWording() {
        return wording;
    }

    public Classroom wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public Integer getYear() {
        return year;
    }

    public Classroom year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Boolean isActive() {
        return active;
    }

    public Classroom active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Classroom students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Classroom addStudent(Student student) {
        this.students.add(student);
        student.setClassroom(this);
        return this;
    }

    public Classroom removeStudent(Student student) {
        this.students.remove(student);
        student.setClassroom(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Classroom teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Classroom addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getClassrooms().add(this);
        return this;
    }

    public Classroom removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getClassrooms().remove(this);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
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
        Classroom classroom = (Classroom) o;
        if (classroom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classroom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Classroom{" +
            "id=" + getId() +
            ", level=" + getLevel() +
            ", wording='" + getWording() + "'" +
            ", year=" + getYear() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
