package ch.fhnw.p2p.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "student")
public class Student {

	private @Id @GeneratedValue Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String type;

	public Student() {}
	
	public Student(long id) {
		this.id = id;
	}

	public Student(String firstName, String lastName, String email, String studentType) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.type = studentType;
	}
}
