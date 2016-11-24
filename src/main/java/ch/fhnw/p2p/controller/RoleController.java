package ch.fhnw.p2p.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ch.fhnw.p2p.entities.Role;
import ch.fhnw.p2p.repositories.RoleRepository;

/**
 * REST api controller for the roles collection
 *
 * @author Joel Meiller
 */
@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/roles")
public class RoleController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private RoleRepository repository;

	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all active roles.
	 * 
	 * @return A list of roles
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="/active", method = RequestMethod.GET)
	public ResponseEntity<List<Role>> getAllRoles() {
		List<Role> roles = repository.findAll();
		if ((roles == null) || (roles.isEmpty())) {
			logger.debug("No roles found");
			return new ResponseEntity<List<Role>>(HttpStatus.NO_CONTENT);
		} else {
			logger.debug("Successfully read " + roles.size() + " Roles");
			return new ResponseEntity<List<Role>>(roles, HttpStatus.OK);
		}
	}

	/**
	 * POST method --> Create or update a role and save it in the database.
	 * 
	 * @param title
	 *            role title (e.g. 'Project Leader')
	 * @param shortcut
	 *            role short-cut (e.g. 'PL')
	 * @param isQM
	 *            flag to indicate if the new role is the QM (only one QM role
	 *            can exists, an existing QM role would be annulated)
	 * @return The created or updated role
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Role> saveRole(@Valid @RequestBody Role role, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<Role>(HttpStatus.PRECONDITION_FAILED);
		}
		try {
			role = repository.save(role);
			logger.debug("Successfully saved role[" + role.getId() + "] with content '" + role.toString() + "'");
			return new ResponseEntity<Role>(role, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * DELETE method --> Delete the role having the passed id.
	 * 
	 * @param id The id of the role to delete
	 * @return Http Status
	 */
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Role> delete(long id) {
		try {
			Role role = new Role(id);
			repository.delete(role);
			logger.debug("Successfully deleted role[" + role.getId() + "] with content '" + role.toString() + "'");
			return new ResponseEntity<Role>(HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Server error", e);
			return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
