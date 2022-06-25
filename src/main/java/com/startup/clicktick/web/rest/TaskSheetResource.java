package com.startup.clicktick.web.rest;

import com.startup.clicktick.domain.TaskSheet;
import com.startup.clicktick.repository.TaskSheetRepository;
import com.startup.clicktick.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.startup.clicktick.domain.TaskSheet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TaskSheetResource {

    private final Logger log = LoggerFactory.getLogger(TaskSheetResource.class);

    private static final String ENTITY_NAME = "taskSheet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskSheetRepository taskSheetRepository;

    public TaskSheetResource(TaskSheetRepository taskSheetRepository) {
        this.taskSheetRepository = taskSheetRepository;
    }

    /**
     * {@code POST  /task-sheets} : Create a new taskSheet.
     *
     * @param taskSheet the taskSheet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskSheet, or with status {@code 400 (Bad Request)} if the taskSheet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-sheets")
    public ResponseEntity<TaskSheet> createTaskSheet(@Valid @RequestBody TaskSheet taskSheet) throws URISyntaxException {
        log.debug("REST request to save TaskSheet : {}", taskSheet);
        if (taskSheet.getId() != null) {
            throw new BadRequestAlertException("A new taskSheet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskSheet result = taskSheetRepository.save(taskSheet);
        return ResponseEntity
            .created(new URI("/api/task-sheets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-sheets/:id} : Updates an existing taskSheet.
     *
     * @param id the id of the taskSheet to save.
     * @param taskSheet the taskSheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskSheet,
     * or with status {@code 400 (Bad Request)} if the taskSheet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskSheet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-sheets/{id}")
    public ResponseEntity<TaskSheet> updateTaskSheet(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TaskSheet taskSheet
    ) throws URISyntaxException {
        log.debug("REST request to update TaskSheet : {}, {}", id, taskSheet);
        if (taskSheet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskSheet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskSheetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TaskSheet result = taskSheetRepository.save(taskSheet);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskSheet.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-sheets/:id} : Partial updates given fields of an existing taskSheet, field will ignore if it is null
     *
     * @param id the id of the taskSheet to save.
     * @param taskSheet the taskSheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskSheet,
     * or with status {@code 400 (Bad Request)} if the taskSheet is not valid,
     * or with status {@code 404 (Not Found)} if the taskSheet is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskSheet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/task-sheets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TaskSheet> partialUpdateTaskSheet(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TaskSheet taskSheet
    ) throws URISyntaxException {
        log.debug("REST request to partial update TaskSheet partially : {}, {}", id, taskSheet);
        if (taskSheet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskSheet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskSheetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TaskSheet> result = taskSheetRepository
            .findById(taskSheet.getId())
            .map(existingTaskSheet -> {
                if (taskSheet.getBrand() != null) {
                    existingTaskSheet.setBrand(taskSheet.getBrand());
                }
                if (taskSheet.getName() != null) {
                    existingTaskSheet.setName(taskSheet.getName());
                }
                if (taskSheet.getComment() != null) {
                    existingTaskSheet.setComment(taskSheet.getComment());
                }
                if (taskSheet.getActive() != null) {
                    existingTaskSheet.setActive(taskSheet.getActive());
                }
                if (taskSheet.getCompleted() != null) {
                    existingTaskSheet.setCompleted(taskSheet.getCompleted());
                }
                if (taskSheet.getDate() != null) {
                    existingTaskSheet.setDate(taskSheet.getDate());
                }
                if (taskSheet.getWorkMinutes() != null) {
                    existingTaskSheet.setWorkMinutes(taskSheet.getWorkMinutes());
                }
                if (taskSheet.getWorkPause() != null) {
                    existingTaskSheet.setWorkPause(taskSheet.getWorkPause());
                }

                return existingTaskSheet;
            })
            .map(taskSheetRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskSheet.getId().toString())
        );
    }

    /**
     * {@code GET  /task-sheets} : get all the taskSheets.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskSheets in body.
     */
    @GetMapping("/task-sheets")
    public ResponseEntity<List<TaskSheet>> getAllTaskSheets(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of TaskSheets");
        Page<TaskSheet> page = taskSheetRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /task-sheets/:id} : get the "id" taskSheet.
     *
     * @param id the id of the taskSheet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskSheet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-sheets/{id}")
    public ResponseEntity<TaskSheet> getTaskSheet(@PathVariable Long id) {
        log.debug("REST request to get TaskSheet : {}", id);
        Optional<TaskSheet> taskSheet = taskSheetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskSheet);
    }

    /**
     * {@code DELETE  /task-sheets/:id} : delete the "id" taskSheet.
     *
     * @param id the id of the taskSheet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-sheets/{id}")
    public ResponseEntity<Void> deleteTaskSheet(@PathVariable Long id) {
        log.debug("REST request to delete TaskSheet : {}", id);
        taskSheetRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
