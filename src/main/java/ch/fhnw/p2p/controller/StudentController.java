package ch.fhnw.p2p.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Student;
import ch.fhnw.p2p.repositories.MemberRepository;
import ch.fhnw.p2p.repositories.StudentRepository;

/**
 * A class to test interactions with the MySQL database using the
 * StudentRepository class.
 *
 * @author Joel Meiller
 */
@Controller
@RequestMapping("/api/students")
public class StudentController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	StudentRepository studentRepo;

	@Autowired
	MemberRepository memberRepo;
	
	/**
	 * /suggestions --> Get suggestions depending on search pattern
	 * 
	 * @param pattern
	 *            search pattern to search in first name, last name and email
	 * @return list of the maximal first 7 students found by the search pattern.
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/suggestions", params = "pattern", method = RequestMethod.GET)
	public ResponseEntity<List<Student>> getStudentSuggestions(@RequestParam String pattern) {
		Member member = memberRepo.findByStudentEmail("max.muster@students.fhnw.ch");
		logger.info("Is QM:" + member.isQM());
		if (member == null || !member.isQM()) return new ResponseEntity<List<Student>>(HttpStatus.FORBIDDEN);
		
		logger.info("Student login: " + member.getStudent().getEmail() + " for project " + member.getProject().getTitle());
		
		if (member.getProject() == null) {
			logger.info("No project found");
			return new ResponseEntity<List<Student>>(HttpStatus.NO_CONTENT);
		} else {
			logger.info("Get students by pattern: '" + pattern + "'");
			return new ResponseEntity<List<Student>>(studentRepo.findSuggestions(pattern.toLowerCase()), HttpStatus.OK);
		}
	}
}
