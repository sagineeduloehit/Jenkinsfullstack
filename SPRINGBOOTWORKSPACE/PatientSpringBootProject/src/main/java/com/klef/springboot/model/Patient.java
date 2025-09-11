package com.klef.springboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_table")
public class Patient 
{
	@Id
	@Column(name = "patient_id")
	private int id;
	@Column(name = "patient_name", nullable = false, length = 50)
	private String name;
	@Column(name = "patient_gender", nullable = false, length = 10)
	private String gender; //FEMALE or MALE
	@Column(name = "patient_diagnosis", nullable = false, length = 20)
	private String diagnosis;
	@Column(name = "patient_email", nullable = false, unique = true, length = 20)
	private String email;
	@Column(name = "patient_contact", nullable = false, unique = true, length = 20)
	private String contact;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}

}
