package com.startup.clicktick.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.startup.clicktick.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskSheetTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskSheet.class);
        TaskSheet taskSheet1 = new TaskSheet();
        taskSheet1.setId(1L);
        TaskSheet taskSheet2 = new TaskSheet();
        taskSheet2.setId(taskSheet1.getId());
        assertThat(taskSheet1).isEqualTo(taskSheet2);
        taskSheet2.setId(2L);
        assertThat(taskSheet1).isNotEqualTo(taskSheet2);
        taskSheet1.setId(null);
        assertThat(taskSheet1).isNotEqualTo(taskSheet2);
    }
}
