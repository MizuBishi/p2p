package ch.fhnw.p2p.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.p2p.authorization.AccessControl;
import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.User;
import ch.fhnw.p2p.entities.mapping.CriteriaRatingMapping;
import ch.fhnw.p2p.entities.mapping.MemberRatingMapping;
import ch.fhnw.p2p.repositories.MemberRatingRepository;

/**
 * REST api controller for the member ratings collection
 *
 * @author Joel Meiller
 */

@RestController
@RequestMapping("/api/project/member")
public class MemberRatingController {
	// ------------------------
	// PRIVATE FIELDS
	// ------------------------
	private Log logger = LogFactory.getLog(this.getClass());
	
	private User user;
	
	@Autowired
	private MemberRatingRepository memberRatingRepo;
		
	@Autowired
	private AccessControl accessControl;
	
	// ------------------------
	// PUBLIC METHODS
	// ------------------------
	
	/**
	 * /findAll --> Returns all project related categories and criterias.
	 * 
	 * @return A list of criterias
	 */
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.GET)
	public ResponseEntity<Member> getMemberRating(HttpServletRequest request) {
		logger.info("Request for member/ratings");
		// User user = AccessControl.login(request.getHeader("username"));
		User user = accessControl.login("heidi.vonderheide@students.fhnw.ch");

		return new ResponseEntity<Member>(user.getMember(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ratings", method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> add(@RequestBody MemberRatingMapping updatedMemberRating, BindingResult result) {
		// User user = AccessControl.login(request.getHeader("username"));
		this.user = accessControl.login("heidi.vonderheide@students.fhnw.ch", AccessControl.Allowed.ALL);	
		
		if (result.hasErrors()) {
			logger.error(result);
			return new ResponseEntity<HttpStatus>(HttpStatus.PRECONDITION_FAILED);
		}
		
		MemberRating memberRating = memberRatingRepo.findByIdAndSourceMemberId(updatedMemberRating.getId(), this.user.getMember().getId());
		
		if (memberRating == null) return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
		
		try {
			logger.info("Update team member ratings of " + this.user.getMember().toString());
			
			if (updatedMemberRating.getComment() != null) {
				memberRating.setComment(updatedMemberRating.getComment());
			}
				
			for (CriteriaRating criteriaRating : memberRating.getCriteriaRatings()) {
				Optional<CriteriaRatingMapping> updatedRating = updatedMemberRating.getCriteriaRatings().stream()
						.filter(r -> r.getId() == criteriaRating.getId()).findFirst();

				criteriaRating.setRating(updatedRating.get().getRating());
			}
		
			memberRatingRepo.save(memberRating);
			
			logger.info("Successfully updated member rating " + memberRating.toString());
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
