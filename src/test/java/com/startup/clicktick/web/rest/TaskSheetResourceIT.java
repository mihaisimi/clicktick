package com.startup.clicktick.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.startup.clicktick.IntegrationTest;
import com.startup.clicktick.domain.TaskSheet;
import com.startup.clicktick.domain.enumeration.TaskSheetTypeEnum;
import com.startup.clicktick.repository.TaskSheetRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TaskSheetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskSheetResourceIT {

    private static final TaskSheetTypeEnum DEFAULT_BRAND = TaskSheetTypeEnum.REGULAR;
    private static final TaskSheetTypeEnum UPDATED_BRAND = TaskSheetTypeEnum.POMODORO;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Boolean DEFAULT_COMPLETED = false;
    private static final Boolean UPDATED_COMPLETED = true;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_WORK_MINUTES = 1;
    private static final Integer UPDATED_WORK_MINUTES = 2;

    private static final Integer DEFAULT_WORK_PAUSE = 1;
    private static final Integer UPDATED_WORK_PAUSE = 2;

    private static final String ENTITY_API_URL = "/api/task-sheets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskSheetRepository taskSheetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskSheetMockMvc;

    private TaskSheet taskSheet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskSheet createEntity(EntityManager em) {
        TaskSheet taskSheet = new TaskSheet()
            .brand(DEFAULT_BRAND)
            .name(DEFAULT_NAME)
            .comment(DEFAULT_COMMENT)
            .active(DEFAULT_ACTIVE)
            .completed(DEFAULT_COMPLETED)
            .date(DEFAULT_DATE)
            .workMinutes(DEFAULT_WORK_MINUTES)
            .workPause(DEFAULT_WORK_PAUSE);
        return taskSheet;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskSheet createUpdatedEntity(EntityManager em) {
        TaskSheet taskSheet = new TaskSheet()
            .brand(UPDATED_BRAND)
            .name(UPDATED_NAME)
            .comment(UPDATED_COMMENT)
            .active(UPDATED_ACTIVE)
            .completed(UPDATED_COMPLETED)
            .date(UPDATED_DATE)
            .workMinutes(UPDATED_WORK_MINUTES)
            .workPause(UPDATED_WORK_PAUSE);
        return taskSheet;
    }

    @BeforeEach
    public void initTest() {
        taskSheet = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskSheet() throws Exception {
        int databaseSizeBeforeCreate = taskSheetRepository.findAll().size();
        // Create the TaskSheet
        restTaskSheetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskSheet)))
            .andExpect(status().isCreated());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeCreate + 1);
        TaskSheet testTaskSheet = taskSheetList.get(taskSheetList.size() - 1);
        assertThat(testTaskSheet.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testTaskSheet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTaskSheet.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testTaskSheet.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTaskSheet.getCompleted()).isEqualTo(DEFAULT_COMPLETED);
        assertThat(testTaskSheet.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTaskSheet.getWorkMinutes()).isEqualTo(DEFAULT_WORK_MINUTES);
        assertThat(testTaskSheet.getWorkPause()).isEqualTo(DEFAULT_WORK_PAUSE);
    }

    @Test
    @Transactional
    void createTaskSheetWithExistingId() throws Exception {
        // Create the TaskSheet with an existing ID
        taskSheet.setId(1L);

        int databaseSizeBeforeCreate = taskSheetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskSheetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskSheet)))
            .andExpect(status().isBadRequest());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkBrandIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskSheetRepository.findAll().size();
        // set the field null
        taskSheet.setBrand(null);

        // Create the TaskSheet, which fails.

        restTaskSheetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskSheet)))
            .andExpect(status().isBadRequest());

        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTaskSheets() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        // Get all the taskSheetList
        restTaskSheetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskSheet.getId().intValue())))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].completed").value(hasItem(DEFAULT_COMPLETED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].workMinutes").value(hasItem(DEFAULT_WORK_MINUTES)))
            .andExpect(jsonPath("$.[*].workPause").value(hasItem(DEFAULT_WORK_PAUSE)));
    }

    @Test
    @Transactional
    void getTaskSheet() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        // Get the taskSheet
        restTaskSheetMockMvc
            .perform(get(ENTITY_API_URL_ID, taskSheet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskSheet.getId().intValue()))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.completed").value(DEFAULT_COMPLETED.booleanValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.workMinutes").value(DEFAULT_WORK_MINUTES))
            .andExpect(jsonPath("$.workPause").value(DEFAULT_WORK_PAUSE));
    }

    @Test
    @Transactional
    void getNonExistingTaskSheet() throws Exception {
        // Get the taskSheet
        restTaskSheetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTaskSheet() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();

        // Update the taskSheet
        TaskSheet updatedTaskSheet = taskSheetRepository.findById(taskSheet.getId()).get();
        // Disconnect from session so that the updates on updatedTaskSheet are not directly saved in db
        em.detach(updatedTaskSheet);
        updatedTaskSheet
            .brand(UPDATED_BRAND)
            .name(UPDATED_NAME)
            .comment(UPDATED_COMMENT)
            .active(UPDATED_ACTIVE)
            .completed(UPDATED_COMPLETED)
            .date(UPDATED_DATE)
            .workMinutes(UPDATED_WORK_MINUTES)
            .workPause(UPDATED_WORK_PAUSE);

        restTaskSheetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTaskSheet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTaskSheet))
            )
            .andExpect(status().isOk());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
        TaskSheet testTaskSheet = taskSheetList.get(taskSheetList.size() - 1);
        assertThat(testTaskSheet.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testTaskSheet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTaskSheet.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTaskSheet.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTaskSheet.getCompleted()).isEqualTo(UPDATED_COMPLETED);
        assertThat(testTaskSheet.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTaskSheet.getWorkMinutes()).isEqualTo(UPDATED_WORK_MINUTES);
        assertThat(testTaskSheet.getWorkPause()).isEqualTo(UPDATED_WORK_PAUSE);
    }

    @Test
    @Transactional
    void putNonExistingTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskSheet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskSheet))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskSheet))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskSheet)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskSheetWithPatch() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();

        // Update the taskSheet using partial update
        TaskSheet partialUpdatedTaskSheet = new TaskSheet();
        partialUpdatedTaskSheet.setId(taskSheet.getId());

        partialUpdatedTaskSheet.completed(UPDATED_COMPLETED).date(UPDATED_DATE).workMinutes(UPDATED_WORK_MINUTES);

        restTaskSheetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskSheet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskSheet))
            )
            .andExpect(status().isOk());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
        TaskSheet testTaskSheet = taskSheetList.get(taskSheetList.size() - 1);
        assertThat(testTaskSheet.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testTaskSheet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTaskSheet.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testTaskSheet.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTaskSheet.getCompleted()).isEqualTo(UPDATED_COMPLETED);
        assertThat(testTaskSheet.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTaskSheet.getWorkMinutes()).isEqualTo(UPDATED_WORK_MINUTES);
        assertThat(testTaskSheet.getWorkPause()).isEqualTo(DEFAULT_WORK_PAUSE);
    }

    @Test
    @Transactional
    void fullUpdateTaskSheetWithPatch() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();

        // Update the taskSheet using partial update
        TaskSheet partialUpdatedTaskSheet = new TaskSheet();
        partialUpdatedTaskSheet.setId(taskSheet.getId());

        partialUpdatedTaskSheet
            .brand(UPDATED_BRAND)
            .name(UPDATED_NAME)
            .comment(UPDATED_COMMENT)
            .active(UPDATED_ACTIVE)
            .completed(UPDATED_COMPLETED)
            .date(UPDATED_DATE)
            .workMinutes(UPDATED_WORK_MINUTES)
            .workPause(UPDATED_WORK_PAUSE);

        restTaskSheetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskSheet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskSheet))
            )
            .andExpect(status().isOk());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
        TaskSheet testTaskSheet = taskSheetList.get(taskSheetList.size() - 1);
        assertThat(testTaskSheet.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testTaskSheet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTaskSheet.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTaskSheet.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTaskSheet.getCompleted()).isEqualTo(UPDATED_COMPLETED);
        assertThat(testTaskSheet.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTaskSheet.getWorkMinutes()).isEqualTo(UPDATED_WORK_MINUTES);
        assertThat(testTaskSheet.getWorkPause()).isEqualTo(UPDATED_WORK_PAUSE);
    }

    @Test
    @Transactional
    void patchNonExistingTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskSheet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskSheet))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskSheet))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskSheet() throws Exception {
        int databaseSizeBeforeUpdate = taskSheetRepository.findAll().size();
        taskSheet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskSheetMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(taskSheet))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskSheet in the database
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskSheet() throws Exception {
        // Initialize the database
        taskSheetRepository.saveAndFlush(taskSheet);

        int databaseSizeBeforeDelete = taskSheetRepository.findAll().size();

        // Delete the taskSheet
        restTaskSheetMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskSheet.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskSheet> taskSheetList = taskSheetRepository.findAll();
        assertThat(taskSheetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
