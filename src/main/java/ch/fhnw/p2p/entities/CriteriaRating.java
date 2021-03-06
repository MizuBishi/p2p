package ch.fhnw.p2p.entities;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true, exclude={"memberRating", "criteria"})
@Entity
public class CriteriaRating extends VersionedObject {
	
	// Attributes
	@NotNull @DecimalMax("5.0") @DecimalMin("0.0")
	@Column(precision = 4, scale = 1)
	private BigDecimal rating;

	// Relations
	@ManyToOne
	@JoinColumn(name = "memberRatingId")
	@JsonIgnore
	private MemberRating memberRating;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "criteriaId")
	@JsonIgnore
	private ProjectCriteria criteria;

	// Constructor
	public CriteriaRating() {
		this.rating = new BigDecimal(0);
	}
	
	public CriteriaRating(ProjectCriteria criteria, MemberRating memberRating) {
		this();
		this.criteria = criteria;
		this.memberRating = memberRating;
	}
	
	public String toString() {
		return this.getClass() + " (id=" + this.getId() + ")" + " - rating=" + this.getRating();
	}
}
