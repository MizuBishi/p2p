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
	private Student student;
	private Member member;
   
    
    @Autowired
    private ProjectRepository projectRepo;
    
    @Autowired
    private StudentRepository studentRepo;
    

    @Before
    public void prepareEntities() {
    	project = new Project("Test");
    	student = studentRepo.save(new Student("Max", "Muster", "max.muster@fhnw.ch"));
    	member = new Member(project, student);
    	
    	project.getMembers().add(member);
    	project = projectRepo.save(project);
    	
    
    	System.out.println(project.getMembers());
    	
    	assertEquals(1, project.getMembers().size());
    }
    
    @Test
    public void testFindProjectByMemberAndStatus() {
    	List<Member> members = new ArrayList<Member>();
		members.add(member);
        Project foundProject = projectRepo.findByMembersAndStatus(members, Project.Status.OPEN);
        
        System.out.println(foundProject);
       
        assertNotNull(foundProject.getId());
        assertEquals(Project.Status.OPEN, foundProject.getStatus());
        assertEquals("Test", foundProject.getTitle());
        assertTrue(foundProject.getMembers().contains(member));
    }
}
