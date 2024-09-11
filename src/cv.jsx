import React, { useEffect, useState } from 'react';
import Page from './Page'; // Import the Page component
import './cv.css'; // Import the CSS file

function Cv({ formData }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const pageHeightLimit = 561; // Scaled A4 height in pixels
    const newPages = [];
    let currentPageContent = '';

    // Function to add content and create new pages if needed
    const addContentToPage = (content) => {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.width = '396.5px'; // Scaled A4 width
      tempDiv.style.padding = '20px';
      tempDiv.innerHTML = currentPageContent + content;
      document.body.appendChild(tempDiv);

      // Check if content fits in the page
      if (tempDiv.scrollHeight > pageHeightLimit) {
        newPages.push(currentPageContent);
        currentPageContent = content;
      } else {
        currentPageContent += content;
      }

      document.body.removeChild(tempDiv);
    };
    addContentToPage(`
    <div class="header">
      <div>
        <p class="name">${formData.firstName} ${formData.lastName}</p>
        <p class="job-title">${formData.job}</p>
      </div>
      <div class="contact-info">
        <p> ${formData.email}</p>
        <p> ${formData.phoneNumber}</p>
        <p>  ${formData.address}</p>
      </div>
    </div>
       <div class="short-bio-container">
        <div class="short-bio-title">Short Bio</div>
        <div class="short-bio-content">${formData.bio}</div>
      </div>
    `);

    addContentToPage(`
    <div class="experience-container">
      <div class="experience-title">
        <h3>Experiences</h3>
      </div>
      <div class="experience-details">
  `);
  
  formData.experiences.forEach((experience, index) => {
    const experienceContent = `
      <div key=${index}>
        <p class="experience-title">${experience.jobTitle}</p>
        <p class="experience-company">${experience.company}</p>
        <p class="experience-location">${experience.location}</p>
        <p class="experience-dates">${experience.from} - ${experience.to}</p>
        <p>${experience.description}</p>

      </div>
    `;
    addContentToPage(experienceContent);
  });
  addContentToPage(`
      </div>
    </div>
  `);
  addContentToPage(`
  <div class="education-container">
    <div class="education-title">
      <h3>Education</h3>
    </div>
    <div class="education-details">
`);

// Loop through education
formData.education.forEach((edu, index) => {
  const educationContent = `
    <div key=${index}>
      <p class="education-institution"> ${edu.institution}</p>
      <p class="education-degree"> ${edu.degree}</p>
      <p class="education-field-of-study"> ${edu.fieldOfStudy}</p>
      <p class="education-dates"> ${edu.startYear} - ${edu.endYear}</p>
      <p class="education-description"> ${edu.description}</p>
    </div>
    <hr />
  `;
  addContentToPage(educationContent);
});

addContentToPage(`
    </div>
  </div>
`);

    if (currentPageContent) {
      newPages.push(currentPageContent);
    }

    setPages(newPages);
  }, [formData]);

  useEffect(() => {
    // Ensure the #cv container exists and is not duplicated
    const cvContainer = document.getElementById('cv');
    if (cvContainer) {
      // Create a new div for pages only if it does not exist
      let pagesElement = document.getElementById('pages');
      if (!pagesElement) {
        pagesElement = document.createElement('div');
        pagesElement.id = 'pages';
        cvContainer.appendChild(pagesElement);
      }

      // Clear the existing content and re-render only the current page
      pagesElement.innerHTML = `
        <div class="page">
          ${pages[currentPage] || ''}
        </div>
      `;
    }
  }, [pages, currentPage]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div id="controls" className="controls">
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
        Next
      </button>
    </div>
  );
}

export default Cv;