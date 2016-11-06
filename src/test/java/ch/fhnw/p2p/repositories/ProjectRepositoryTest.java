package ch.fhnw.p2p.repositories;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Student;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ProjectRepositoryTest {
	
	private Project project; 
	private Student student, student2;
	private Member member;
   
    
    @Autowired
    private ProjectRepository projectRepo;
    
    @Autowired
    private StudentRepository studentRepo;
    
    private ProjectRepositoryImpl projectRepoImpl;
    

    @Before
    public void prepareEntities() {
    	projectRepoImpl = new ProjectRepositoryImpl();
    	
    	project = new Project("Not found");
    	student = studentRepo.save(new Student("Not", "Fount", "not.found@fhnw.ch"));
    	member = new Member(project, student);
    	project.getMembers().add(member);
    	project = projectRepo.save(project);
    	
    	project = new Project("Test");
    	student = studentRepo.save(new Student("Max", "Muster", "max.muster@fhnw.ch"));
    	member = new Member(project, student);
    	project.getMembers().add(member);
    	project = projectRepo.saveAndFlush(project);    	
    	studentRepo.saveAndFlush(new Student("Add", "Me", "add.me@test.ch"));
    	
    	assertEquals(2, projectRepo.findAll().size());
    	assertEquals(1, project.getMembers().size());
    	assertEquals(3, studentRepo.findAll().size());
    }
    
    @Test
    public void testFindProjectByMemberAndStatus() {
        Project foundProject = projectRepo.findByIdAndStatus(member.getProject().getId(), Project.Status.OPEN);
       
        assertNotNull(foundProject.getId());
        assertEquals(Project.Status.OPEN, foundProject.getStatus());
        assertEquals("Test", foundProject.getTitle());
        assertTrue(foundProject.getMembers().contains(member));
    }
    
    @Test
    public void testAddMember() {
    	student2 = studentRepo.findByEmail("add.me@test.ch").get();
    	assertNotNull(student2.getId());
    	Student addStudent = new Student();
    	addStudent.setId(student2.getId());
    	
    	List<Member> updatedMembers = project.getMembers();
    	Member addedMember = new Member();
    	addedMember.setAdded(true);
    	addedMember.setStudent(addStudent);
    	updatedMembers.add(addedMember);
    	
    	project = projectRepo.findOne(project.getId());
    	Project projectUpdated = projectRepoImpl.updateProject(project, updatedMembers);
    	assertNotNull(projectUpdated.getId());
        assertEquals(projectUpdated.getMembers().size(), 2);
    }
    
//    @Test
//    public void testAddMemberWithRole() {
//    	List<Member> members = project1.getMembers();
//    	Member addedMember = new Member();
//    	addedMember.setAdded(true);
//    	addedMember.setStudent(student3);
//    	List<Role> roles = new ArrayList<>();
//    	roles.add(role);
//    	addedMember.setRoles(roles);
//    	
//    	
//    	Member testMember = memberRepo.findByStudentEmail(email1);
//        assertNotNull(testMember.getId());
//        assertEquals(member1, testMember);
//        
//        testMember = memberRepo.findByStudentEmail(email2);  	
//        assertNotNull(testMember.getId());
//        assertEquals(member2, testMember);
//    }
}
