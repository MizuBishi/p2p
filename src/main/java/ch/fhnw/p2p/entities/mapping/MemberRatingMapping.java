package ch.fhnw.p2p.entities.mapping;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.MemberRating;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false, exclude={"criteriaRatings"})
public class MemberRatingMapping {
	
	private Long id;

	private BigDecimal rating;
	private String comment;
	private MemberMapping member;
	private List<CriteriaRatingMapping> criteriaRatings;
	
	public MemberRatingMapping() {};
	
	public MemberRatingMapping(MemberRating rating, boolean sourceMemberMapping) {
		this.id = rating.getId();
		this.rating = rating.getRating();
		this.comment = rating.getComment() == null ? "" : rating.getComment();
		this.criteriaRatings = new ArrayList<CriteriaRatingMapping>();
		for (CriteriaRating criteriaRating: rating.getCriteriaRatings()) {
			this.criteriaRatings.add(new CriteriaRatingMapping(criteriaRating));
		}
		this.member = new MemberMapping(sourceMemberMapping ? rating.getTargetMember() : rating.getSourceMember());
	}	
}
