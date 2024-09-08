import React, { useEffect } from "react";

function Cv({ formData }) {
  useEffect(() => {
    // Find the existing element with the id 'pages'
    const pagesElement = document.getElementById("pages");
    
    if (pagesElement) {
      pagesElement.innerHTML = `
        <h2>${formData.job}</h2>
        <p>Name: ${formData.firstName} ${formData.lastName}</p>
        <p>Email: ${formData.email}</p>
        <p>Address: ${formData.address}</p>
        <p>Phone Number: ${formData.phoneNumber}</p>
        <h3>Short Bio</h3>
        <p>${formData.bio}</p>

        <h3>Experiences</h3>
        ${formData.experiences.map((experience, index) => `
          <div key=${index}>
            <h4>Experience ${index + 1}</h4>
            <p>Job Title: ${experience.jobTitle}</p>
            <p>Company: ${experience.company}</p>
            <p>From: ${experience.from}</p>
            <p>To: ${experience.to}</p>
            <p>Location: ${experience.location}</p>
            <p>Description: ${experience.description}</p>
          </div>
        `).join('')}
      `;
    }
  }, [formData]); // Re-run effect whenever formData changes
 
}

export default Cv;