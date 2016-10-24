package ch.fhnw.p2p.fixtures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;
import ch.fhnw.p2p.entities.Student;
import ch.fhnw.p2p.repositories.CategoryRepository;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

@Component
@Order(1)
public class CategoryDataLoader implements CommandLineRunner {

	@Autowired
	ProjectRepository projectRepo;
	
	@Autowired
	MemberRepository memberRepo;
	
	@Autowired
	StudentRepository studentRepo;
	
	@Autowired
	CategoryRepository repository;
	

	@Override
	public void run(String... strings) throws Exception {
		System.out.println("Autorunner QM Category Setup");
		
		// Prepare categories
		Category category1 = new Category("First Test Category", Locale.Language.EN);
		Criteria criteria11 = new Criteria("First Test Criteria", Locale.Language.EN);
		criteria11.setCategory(category1);
		category1.getCriterias().add(criteria11);
		Criteria criteria12 = new Criteria("Second Test Criteria", Locale.Language.EN);
		criteria12.setCategory(category1);
		category1.getCriterias().add(criteria12);
		
		this.repository.save(category1);
		
		Category category2 = new Category("Second Test Category", Locale.Language.EN);
		Criteria criteria21 = new Criteria("Another Text", Locale.Language.EN);
		criteria21.setCategory(category2);
		category2.getCriterias().add(criteria21);
		Criteria criteria22 = new Criteria("Somemore Text", Locale.Language.EN);
		criteria22.setCategory(category2);
		category2.getCriterias().add(criteria22);
		
		this.repository.save(category2);
		
		// Self category
		Category ownCategory = new Category("Own Criterias", Locale.Language.EN);
		ownCategory.setType(Category.Type.OWN);
		this.repository.save(ownCategory);
		
		// Add student, project and member
		studentRepo.save(new Student("Max", "Muster", "max.muster@students.fhnw.ch", Student.Type.BB));
		Project project = new Project("Test Project");
		
		// Add project categories & criterias
		ProjectCategory projectCategory = new ProjectCategory(category1);
		projectCategory.setProject(project);
		ProjectCriteria projectCriteria = new ProjectCriteria(criteria11);
		projectCriteria.setCategory(projectCategory);
		projectCategory.getProjectCriterias().add(projectCriteria);
		project.getProjectCategories().add(projectCategory);
	
		projectCategory = new ProjectCategory(category2);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
		
		projectCategory = new ProjectCategory(ownCategory);
		projectCategory.setProject(project);
		project.getProjectCategories().add(projectCategory);
		
		Student student = studentRepo.findByEmail("max.muster@students.fhnw.ch").get();
		Member member = new Member(project, student);
		project.getMembers().add(member);
		projectRepo.save(project);
	}
}