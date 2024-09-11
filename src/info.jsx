import React, { useState } from "react";
import "./info.css";
import Cv from "./cv";

function Details() {
  const [formData, setFormData] = useState({
    job: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    bio: "",
    experiences: [],
    education: [], // Added education state
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [name]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        { jobTitle: "", company: "", from: "", to: "", location: "", description: "" },
      ],
    }));
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "", description: "" },
      ],
    }));
  };

  return (
    <div>
      <form>
        <h2>Your Details</h2>
        <CustomInput
          label="Job"
          name="job"
          value={formData.job}
          onChange={handleChange}
          placeholder="Enter your job title"
        />
        <div className="row">
          <CustomInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          <CustomInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <CustomInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
        />
        <CustomInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
        <CustomInput
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        <hr />
        <h2>Short Bio</h2>
        <CustomTextarea
          label="Short Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write a short bio about yourself..."
        />
        <hr />

        <h2>Your Experience</h2>
        {formData.experiences.map((experience, index) => (
          <ExperienceEntry
            key={index}
            index={index}
            experience={experience}
            onChange={handleExperienceChange}
          />
        ))}
        <button type="button" className="add-experience-button" onClick={addExperience}>
          <i className="fas fa-plus"></i> Add New Experience
        </button>
        <hr />

        <h2>Your Education</h2>
        {formData.education.map((edu, index) => (
          <EducationEntry
            key={index}
            index={index}
            education={edu}
            onChange={handleEducationChange}
          />
        ))}
        <button type="button" className="add-education-button" onClick={addEducation}>
          <i className="fas fa-plus"></i> Add New Education
        </button>
      </form>
      
      {/* Pass formData to the Cv component */}
      <Cv formData={formData} />
    </div>
  );
}

function CustomInput({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function CustomTextarea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows="5"
        className="large-input"
        placeholder={placeholder}
      />
    </div>
  );
}

function ExperienceEntry({ index, experience, onChange }) {
  return (
    <div className="experience-entry">
      <h3>Experience {index + 1}</h3>
      <CustomInput
        label="Job Title"
        name="jobTitle"
        value={experience.jobTitle}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter job title"
      />
      <CustomInput
        label="Company"
        name="company"
        value={experience.company}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter company name"
      />
      <div className="row">
        <CustomInput
          label="From"
          name="from"
          value={experience.from}
          onChange={(e) => onChange(index, e)}
          placeholder="Start date"
          type="date"
        />
        <CustomInput
          label="To"
          name="to"
          value={experience.to}
          onChange={(e) => onChange(index, e)}
          placeholder="End date"
          type="date"
        />
      </div>
      <CustomInput
        label="Location"
        name="location"
        value={experience.location}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter location"
      />
      <CustomTextarea
        label="Description"
        name="description"
        value={experience.description}
        onChange={(e) => onChange(index, e)}
        placeholder="Describe your experience"
      />
      <hr />
    </div>
  );
}

function EducationEntry({ index, education, onChange }) {
  return (
    <div className="education-entry">
      <h3>Education {index + 1}</h3>
      <CustomInput
        label="Institution"
        name="institution"
        value={education.institution}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter institution name"
      />
      <CustomInput
        label="Degree"
        name="degree"
        value={education.degree}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter degree"
      />
      <CustomInput
        label="Field of Study"
        name="fieldOfStudy"
        value={education.fieldOfStudy}
        onChange={(e) => onChange(index, e)}
        placeholder="Enter field of study"
      />
      <div className="row">
        <CustomInput
          label="Start Year"
          name="startYear"
          value={education.startYear}
          onChange={(e) => onChange(index, e)}
          placeholder="Start year"
          type="number"
        />
        <CustomInput
          label="End Year"
          name="endYear"
          value={education.endYear}
          onChange={(e) => onChange(index, e)}
          placeholder="End year"
          type="number"
        />
      </div>
      <CustomTextarea
        label="Description"
        name="description"
        value={education.description}
        onChange={(e) => onChange(index, e)}
        placeholder="Describe your education"
      />
      <hr />
    </div>
  );
}

export default Details;