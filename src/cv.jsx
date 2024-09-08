import React, { useEffect, useState } from 'react';
import Page from './Page'; // Import the Page component

function Cv({ formData }) {
  const [pages, setPages] = useState([]);

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

    // Add header content
    addContentToPage(`
      <h2>${formData.job}</h2>
      <p>Name: ${formData.firstName} ${formData.lastName}</p>
      <p>Email: ${formData.email}</p>
      <p>Address: ${formData.address}</p>
      <p>Phone Number: ${formData.phoneNumber}</p>
      <h3>Short Bio</h3>
      <p>${formData.bio}</p>
      <h3>Experiences</h3>
    `);

    // Add experiences
    formData.experiences.forEach((experience, index) => {
      const experienceContent = `
        <div key=${index}>
          <p>Job Title: ${experience.jobTitle}</p>
          <p>Company: ${experience.company}</p>
          <p>From: ${experience.from}</p>
          <p>To: ${experience.to}</p>
          <p>Location: ${experience.location}</p>
          <p>Description: ${experience.description}</p>
        </div>
      `;
      addContentToPage(experienceContent);
    });

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

      // Clear the existing content and re-render the pages
      pagesElement.innerHTML = pages.map((content, index) => `
        <div key=${index} class="page">
          ${content}
        </div>
      `).join('');
    }
  }, [pages]);

  return null; // Do not return anything as we're directly appending to #cv
}

export default Cv;