package ch.fhnw.p2p.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.Project.Status;
import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.repositories.ProjectRepository;
import ch.fhnw.p2p.repositories.RoleRepository;
import ch.fhnw.p2p.repositories.UserRepository;

/**
 * REST api controller for the project list
 *
 * @author Michelle Andrey
 */

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/projects")
public class ProjectController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccessControl accessControl;

	@Autowired
	private ProjectRepository projectRepo;

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	RoleRepository roleRepo;

	@PersistenceContext
	EntityManager entityManager;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * Fetch full project (for editing).
	 */
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public ResponseEntity<Project> getProject(HttpServletRequest request, @PathVariable Long id) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("GET project user=" + user.getEmail());
		Project project = projectRepo.findById(id);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	/**
	 * Update an existing project -- UI only supports changing of status from
	 * final to closed.
	 */
	@RequestMapping(value="{id}", method = RequestMethod.PUT)
	public ResponseEntity<HttpStatus> updateProject(HttpServletRequest request, @PathVariable Long id, @Valid @RequestBody Project project, BindingResult result) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("PUT project user=" + user.getEmail());
		if (result.hasErrors()) {
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		Project oldProject = projectRepo.findById(project.getId());
		if (oldProject == null) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}
		if (oldProject.getStatus() != Status.FINAL
				|| (project.getStatus() != Status.CLOSE && project.getStatus() != Status.FINAL)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		if (project.getStatus() == Status.CLOSE) {
			oldProject.setStop(new Date());
			oldProject.setStatus(Status.CLOSE);
		}
		try {
			projectRepo.save(oldProject);
			logger.debug("Successfully updated project[" + project.getId() + "]: " + project.toString());
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Create a new project. The posted project must contain a Member with a
	 * user that has the email address set.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> addProject(HttpServletRequest request, @Valid @RequestBody Project project, BindingResult result) {
		User user = accessControl.login(request, AccessControl.Allowed.COACH);
		logger.info("POST project user=" + user.getEmail());
		if (result.hasErrors()) {
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		if (project.getMembers().size() > 0) {
			User qmUser = userRepo.findByEmail(project.getMembers().iterator().next().getStudent().getEmail()).get();
			if (qmUser.getStatus() != User.Status.FREE) {
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			project.getMembers().clear();
			Role qmRole = roleRepo.findByShortcut("QM");
			Member qmMember = new Member(project, qmUser, qmRole);
			project.getMembers().add(qmMember);
			logger.info("Adding QM=" + qmUser.toString());
		}
		try {
			projectRepo.save(project);
			logger.debug("Successfully saved project[" + project.getId() + "]: " + project.toString());
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Fetch list of abbreviated projects (for overview).
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Project>> getProjects(HttpServletRequest request) {
		logger.info("GET request for projectList");
		User user = accessControl.login(request, AccessControl.Allowed.COACH);

		logger.info("Successfully read projects for " + user.toString());
		List<Project> projectList = projectRepo.findAll();

		for (Project project : projectList) {
			Member QM = null;
			for (Member member : project.getMembers()) {
				if (member.isQM()) {
					QM = member;
					QM.setRatings(new HashSet<MemberRating>());
				}
			}
			project.setProjectCategories(new HashSet<>());
			project.setMembers(new HashSet<>());
			if (QM != null) {
				project.getMembers().add(QM);
			}
		}
		return new ResponseEntity<List<Project>>(projectList, HttpStatus.OK);
	}
}
