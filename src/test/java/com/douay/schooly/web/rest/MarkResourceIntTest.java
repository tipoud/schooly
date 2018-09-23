package com.douay.schooly.web.rest;

import com.douay.schooly.SchoolyApp;

import com.douay.schooly.domain.Mark;
import com.douay.schooly.repository.MarkRepository;
import com.douay.schooly.service.MarkService;
import com.douay.schooly.service.dto.MarkDTO;
import com.douay.schooly.service.mapper.MarkMapper;
import com.douay.schooly.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.douay.schooly.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MarkResource REST controller.
 *
 * @see MarkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolyApp.class)
public class MarkResourceIntTest {

    private static final Double DEFAULT_VALUE = 1D;
    private static final Double UPDATED_VALUE = 2D;

    private static final Integer DEFAULT_NTH = 1;
    private static final Integer UPDATED_NTH = 2;

    @Autowired
    private MarkRepository markRepository;

    @Autowired
    private MarkMapper markMapper;
    
    @Autowired
    private MarkService markService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMarkMockMvc;

    private Mark mark;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MarkResource markResource = new MarkResource(markService);
        this.restMarkMockMvc = MockMvcBuilders.standaloneSetup(markResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mark createEntity(EntityManager em) {
        Mark mark = new Mark()
            .value(DEFAULT_VALUE)
            .nth(DEFAULT_NTH);
        return mark;
    }

    @Before
    public void initTest() {
        mark = createEntity(em);
    }

    @Test
    @Transactional
    public void createMark() throws Exception {
        int databaseSizeBeforeCreate = markRepository.findAll().size();

        // Create the Mark
        MarkDTO markDTO = markMapper.toDto(mark);
        restMarkMockMvc.perform(post("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isCreated());

        // Validate the Mark in the database
        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeCreate + 1);
        Mark testMark = markList.get(markList.size() - 1);
        assertThat(testMark.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testMark.getNth()).isEqualTo(DEFAULT_NTH);
    }

    @Test
    @Transactional
    public void createMarkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = markRepository.findAll().size();

        // Create the Mark with an existing ID
        mark.setId(1L);
        MarkDTO markDTO = markMapper.toDto(mark);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarkMockMvc.perform(post("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mark in the database
        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = markRepository.findAll().size();
        // set the field null
        mark.setValue(null);

        // Create the Mark, which fails.
        MarkDTO markDTO = markMapper.toDto(mark);

        restMarkMockMvc.perform(post("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isBadRequest());

        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNthIsRequired() throws Exception {
        int databaseSizeBeforeTest = markRepository.findAll().size();
        // set the field null
        mark.setNth(null);

        // Create the Mark, which fails.
        MarkDTO markDTO = markMapper.toDto(mark);

        restMarkMockMvc.perform(post("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isBadRequest());

        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMarks() throws Exception {
        // Initialize the database
        markRepository.saveAndFlush(mark);

        // Get all the markList
        restMarkMockMvc.perform(get("/api/marks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mark.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].nth").value(hasItem(DEFAULT_NTH)));
    }
    
    @Test
    @Transactional
    public void getMark() throws Exception {
        // Initialize the database
        markRepository.saveAndFlush(mark);

        // Get the mark
        restMarkMockMvc.perform(get("/api/marks/{id}", mark.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mark.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.nth").value(DEFAULT_NTH));
    }

    @Test
    @Transactional
    public void getNonExistingMark() throws Exception {
        // Get the mark
        restMarkMockMvc.perform(get("/api/marks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMark() throws Exception {
        // Initialize the database
        markRepository.saveAndFlush(mark);

        int databaseSizeBeforeUpdate = markRepository.findAll().size();

        // Update the mark
        Mark updatedMark = markRepository.findById(mark.getId()).get();
        // Disconnect from session so that the updates on updatedMark are not directly saved in db
        em.detach(updatedMark);
        updatedMark
            .value(UPDATED_VALUE)
            .nth(UPDATED_NTH);
        MarkDTO markDTO = markMapper.toDto(updatedMark);

        restMarkMockMvc.perform(put("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isOk());

        // Validate the Mark in the database
        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeUpdate);
        Mark testMark = markList.get(markList.size() - 1);
        assertThat(testMark.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testMark.getNth()).isEqualTo(UPDATED_NTH);
    }

    @Test
    @Transactional
    public void updateNonExistingMark() throws Exception {
        int databaseSizeBeforeUpdate = markRepository.findAll().size();

        // Create the Mark
        MarkDTO markDTO = markMapper.toDto(mark);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarkMockMvc.perform(put("/api/marks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(markDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mark in the database
        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMark() throws Exception {
        // Initialize the database
        markRepository.saveAndFlush(mark);

        int databaseSizeBeforeDelete = markRepository.findAll().size();

        // Get the mark
        restMarkMockMvc.perform(delete("/api/marks/{id}", mark.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mark> markList = markRepository.findAll();
        assertThat(markList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mark.class);
        Mark mark1 = new Mark();
        mark1.setId(1L);
        Mark mark2 = new Mark();
        mark2.setId(mark1.getId());
        assertThat(mark1).isEqualTo(mark2);
        mark2.setId(2L);
        assertThat(mark1).isNotEqualTo(mark2);
        mark1.setId(null);
        assertThat(mark1).isNotEqualTo(mark2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MarkDTO.class);
        MarkDTO markDTO1 = new MarkDTO();
        markDTO1.setId(1L);
        MarkDTO markDTO2 = new MarkDTO();
        assertThat(markDTO1).isNotEqualTo(markDTO2);
        markDTO2.setId(markDTO1.getId());
        assertThat(markDTO1).isEqualTo(markDTO2);
        markDTO2.setId(2L);
        assertThat(markDTO1).isNotEqualTo(markDTO2);
        markDTO1.setId(null);
        assertThat(markDTO1).isNotEqualTo(markDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(markMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(markMapper.fromId(null)).isNull();
    }
}
