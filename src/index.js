import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { StrictMode } from "react";
import "./index.css" 
import Cv from "./cv";
import '@fortawesome/fontawesome-free/css/all.min.css';


import App from "./App"; // Import the main App component

  
createRoot(document.getElementById("info")).render(
    <StrictMode>
      <App />
     </StrictMode>
  );
  const sampleFormData = {
    firstName: 'John',
    lastName: 'Doe',
    job: 'Software Engineer',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    bio: 'Passionate software engineer with 5 years of experience in building scalable applications.',
    experiences: [
      {
        jobTitle: 'Senior Developer',
        company: 'Tech Solutions Inc.',
        location: 'San Francisco, CA',
        from: 'Jan 2020',
        to: 'Present',
        description: 'Led the development of a major product feature that increased user engagement by 30%.'
      },
      {
        jobTitle: 'Junior Developer',
        company: 'WebWorks Ltd.',
        location: 'New York, NY',
        from: 'Jun 2017',
        to: 'Dec 2019',
        description: 'Worked on various client projects, including a high-traffic e-commerce site.'
      }
    ],
    education: [
      {
        institution: 'University of California',
        degree: 'B.Sc. in Computer Science',
        fieldOfStudy: 'Computer Science',
        startYear: '2013',
        endYear: '2017',
        description: 'Focused on software engineering and data structures.'
      }
    ]
  };
  
  // Render the Cv component into the #container element
  createRoot(document.getElementById("cv")).render(
    <StrictMode>
      <Cv formData={sampleFormData} />
    </StrictMode>
  );