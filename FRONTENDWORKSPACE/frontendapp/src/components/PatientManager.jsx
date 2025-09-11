import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const PatientManager = () => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    gender: '',
    diagnosis: '',
    email: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}`;

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setPatients(res.data);
    } catch (error) {
      setMessage('Failed to fetch patients.');
    }
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in patient) {
      if (!patient[key] || patient[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addPatient = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, patient);
      setMessage('Patient added successfully.');
      fetchAllPatients();
      resetForm();
    } catch (error) {
      setMessage('Error adding patient.');
    }
  };

  const updatePatient = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, patient);
      setMessage('Patient updated successfully.');
      fetchAllPatients();
      resetForm();
    } catch (error) {
      setMessage('Error updating patient.');
    }
  };

  const deletePatient = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllPatients();
    } catch (error) {
      setMessage('Error deleting patient.');
    }
  };

  const getPatientById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedPatient(res.data);
      setMessage('');
    } catch (error) {
      setFetchedPatient(null);
      setMessage('Patient not found.');
    }
  };

  const handleEdit = (pat) => {
    setPatient(pat);
    setEditMode(true);
    setMessage(`Editing patient with ID ${pat.id}`);
  };

  const resetForm = () => {
    setPatient({
      id: '',
      name: '',
      gender: '',
      diagnosis: '',
      email: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Patient Management</h2>

      <div>
        <h3>{editMode ? 'Edit Patient' : 'Add Patient'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={patient.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={patient.name} onChange={handleChange} />
          <select name="gender" value={patient.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <input type="text" name="diagnosis" placeholder="Diagnosis" value={patient.diagnosis} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={patient.email} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={patient.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addPatient}>Add Patient</button>
          ) : (
            <>
              <button className="btn-green" onClick={updatePatient}>Update Patient</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Patient By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getPatientById}>Fetch</button>

        {fetchedPatient && (
          <div>
            <h4>Patient Found:</h4>
            <pre>{JSON.stringify(fetchedPatient, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Patients</h3>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(patient).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pat) => (
                  <tr key={pat.id}>
                    {Object.keys(patient).map((key) => (
                      <td key={key}>{pat[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(pat)}>Edit</button>
                        <button className="btn-red" onClick={() => deletePatient(pat.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default PatientManager;
