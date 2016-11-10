package ch.fhnw.p2p.entities.mapping;

import java.math.BigDecimal;

import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.CriteriaRating;
import lombok.Data;

@Data
public class CriteriaRatingMapping {

	private Long id;
	private BigDecimal rating;
	private Criteria criteria;
	private CategoryMapping category;
	
	public CriteriaRatingMapping() {};
	
	public CriteriaRatingMapping(CriteriaRating criteriaRating) {
		this.id = criteriaRating.getId();
		this.rating = criteriaRating.getRating();
		this.criteria = criteriaRating.getCriteria().getCriteria();
		this.category = new CategoryMapping(criteriaRating.getCriteria().getCategory().getCategory());
	}
}
