package com.startup.clicktick.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.startup.clicktick.domain.enumeration.TaskSheetTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Car. We are hashing the keyFrequencyHere
 */
@Schema(description = "The Car. We are hashing the keyFrequencyHere")
@Entity
@Table(name = "task_sheet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TaskSheet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "brand", nullable = false)
    private TaskSheetTypeEnum brand;

    @Column(name = "name")
    private String name;

    @Column(name = "comment")
    private String comment;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "date")
    private Instant date;

    @Column(name = "work_minutes")
    private Integer workMinutes;

    @Column(name = "work_pause")
    private Integer workPause;

    @OneToMany(mappedBy = "taskSheet")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "taskSheet" }, allowSetters = true)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "taskSheets" }, allowSetters = true)
    private Customer owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TaskSheet id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskSheetTypeEnum getBrand() {
        return this.brand;
    }

    public TaskSheet brand(TaskSheetTypeEnum brand) {
        this.setBrand(brand);
        return this;
    }

    public void setBrand(TaskSheetTypeEnum brand) {
        this.brand = brand;
    }

    public String getName() {
        return this.name;
    }

    public TaskSheet name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return this.comment;
    }

    public TaskSheet comment(String comment) {
        this.setComment(comment);
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getActive() {
        return this.active;
    }

    public TaskSheet active(Boolean active) {
        this.setActive(active);
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getCompleted() {
        return this.completed;
    }

    public TaskSheet completed(Boolean completed) {
        this.setCompleted(completed);
        return this;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Instant getDate() {
        return this.date;
    }

    public TaskSheet date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getWorkMinutes() {
        return this.workMinutes;
    }

    public TaskSheet workMinutes(Integer workMinutes) {
        this.setWorkMinutes(workMinutes);
        return this;
    }

    public void setWorkMinutes(Integer workMinutes) {
        this.workMinutes = workMinutes;
    }

    public Integer getWorkPause() {
        return this.workPause;
    }

    public TaskSheet workPause(Integer workPause) {
        this.setWorkPause(workPause);
        return this;
    }

    public void setWorkPause(Integer workPause) {
        this.workPause = workPause;
    }

    public Set<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<Task> tasks) {
        if (this.tasks != null) {
            this.tasks.forEach(i -> i.setTaskSheet(null));
        }
        if (tasks != null) {
            tasks.forEach(i -> i.setTaskSheet(this));
        }
        this.tasks = tasks;
    }

    public TaskSheet tasks(Set<Task> tasks) {
        this.setTasks(tasks);
        return this;
    }

    public TaskSheet addTask(Task task) {
        this.tasks.add(task);
        task.setTaskSheet(this);
        return this;
    }

    public TaskSheet removeTask(Task task) {
        this.tasks.remove(task);
        task.setTaskSheet(null);
        return this;
    }

    public Customer getOwner() {
        return this.owner;
    }

    public void setOwner(Customer customer) {
        this.owner = customer;
    }

    public TaskSheet owner(Customer customer) {
        this.setOwner(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskSheet)) {
            return false;
        }
        return id != null && id.equals(((TaskSheet) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskSheet{" +
            "id=" + getId() +
            ", brand='" + getBrand() + "'" +
            ", name='" + getName() + "'" +
            ", comment='" + getComment() + "'" +
            ", active='" + getActive() + "'" +
            ", completed='" + getCompleted() + "'" +
            ", date='" + getDate() + "'" +
            ", workMinutes=" + getWorkMinutes() +
            ", workPause=" + getWorkPause() +
            "}";
    }
}
