package com.startup.clicktick.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.startup.clicktick.domain.enumeration.TaskStateEnum;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private TaskStateEnum state;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "external_id")
    private String externalId;

    @ManyToOne
    @JsonIgnoreProperties(value = { "tasks", "owner" }, allowSetters = true)
    private TaskSheet taskSheet;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Task id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskStateEnum getState() {
        return this.state;
    }

    public Task state(TaskStateEnum state) {
        this.setState(state);
        return this;
    }

    public void setState(TaskStateEnum state) {
        this.state = state;
    }

    public String getName() {
        return this.name;
    }

    public Task name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Task description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExternalId() {
        return this.externalId;
    }

    public Task externalId(String externalId) {
        this.setExternalId(externalId);
        return this;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public TaskSheet getTaskSheet() {
        return this.taskSheet;
    }

    public void setTaskSheet(TaskSheet taskSheet) {
        this.taskSheet = taskSheet;
    }

    public Task taskSheet(TaskSheet taskSheet) {
        this.setTaskSheet(taskSheet);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", externalId='" + getExternalId() + "'" +
            "}";
    }
}
