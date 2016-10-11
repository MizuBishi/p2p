package ch.fhnw.p2p.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import ch.fhnw.p2p.entities.mixins.VersionedObject;
import lombok.Data;

/**
 * Entity Member
 * 
 * @author Joël Meiller
 *
 *
 **/

@Data
@Entity
public class Member extends VersionedObject{

	// Constants
	public static enum Status {
		NEW, // Set when member is added to project by QM
		OPEN, // Set when student confirmes project participation
		READONLY, // Set when student sends the final evaluation
	}

	// Attributes
	private double rating;
	private double deviation;

	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "projectId")
	private Project project;
	
	// Relations
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "studentId")
	private Student student;
	
	@OneToMany(mappedBy="member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<MemberRole> roles;

	@Enumerated(EnumType.STRING)
	private Status status;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "sourceMember")
	private List<MemberRating> memberRatings;


	// Constructor
	public Member() {
		this.status = Status.NEW;
		this.rating = 0;
		this.deviation = 0;
		this.roles = new ArrayList<MemberRole>();
		this.memberRatings = new ArrayList<MemberRating>();
	}

	public Member(Project project, Student student) {
		this();
		this.project = project;
		this.student = student;
	}
	
	public Member(Project project, Student student, Role role) {
		this(project, student);
		this.roles.add(new MemberRole(this, role));
	}

	public Member(Project project, Student student, Role role, List<MemberRating> memberRatings) {
		this(project, student, role);
		this.memberRatings = memberRatings;
	}
	
	public String toString() {
		return this.getStudent().getFirstName() + " " + this.getStudent().getLastName() + " in " + this.getProject().getTitle();
	}
}
