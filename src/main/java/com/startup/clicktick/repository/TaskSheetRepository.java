package com.startup.clicktick.repository;

import com.startup.clicktick.domain.TaskSheet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TaskSheet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskSheetRepository extends JpaRepository<TaskSheet, Long> {}
