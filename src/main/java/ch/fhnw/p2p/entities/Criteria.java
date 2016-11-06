package ch.fhnw.p2p.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.p2p.entities.Locale.Language;
import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of="id")
@Entity
public class Criteria extends VersionedObject{
	
	// Attributes
	@NotEmpty private String label;

	// Relations
	@ManyToOne
	@JoinColumn(name="categoryId")
	@JsonIgnore
	private Category category;
	
	// Constructor
	public Criteria() {}
	
	public Criteria(String label, Language lang) {
		this.label = label;
	}
	
	public String toString() {
		return this.label;
	}
	
}