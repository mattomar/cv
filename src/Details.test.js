import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from './info';

const fillInput = (placeholder, value) => {
  const input = screen.getByPlaceholderText(placeholder);
  fireEvent.change(input, { target: { value } });
};

// Test for initial render and adding new experience
test('should render and add new experience', async () => {
  render(<Details />);

  // Check initial fields are rendered
  expect(screen.getByLabelText(/Job:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Address:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Short Bio:/i)).toBeInTheDocument();
  expect(screen.getByText(/Your Experience/i)).toBeInTheDocument();

  // Check initial experience entry is present
  expect(screen.getByPlaceholderText(/Enter job title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter company name/i)).toBeInTheDocument();

  // Click the button to add a new experience
  const addButton = screen.getByText(/Add New Experience/i);
  fireEvent.click(addButton);

  // Fill out the new experience fields
  const jobTitleInput = screen.getAllByPlaceholderText(/Enter job title/i)[1]; // Adjust index if needed
  fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

  // Wait for the new experience entry to appear
  await waitFor(() => {
    const jobTitles = screen.getAllByDisplayValue('Software Engineer');
    expect(jobTitles).toHaveLength(1); // Check for the exact number of job titles
  });
});

// Test for filling and updating experience fields
test('should update experience fields correctly', async () => {
  render(<Details />);

  // Add a new experience
  const addButton = screen.getByText(/Add New Experience/i);
  fireEvent.click(addButton);

  // Fill out the new experience fields
  fillInput('Enter job title', 'Software Engineer');
  fillInput('Enter company name', 'Tech Corp');
  fillInput('Start', '2023-01-01');
  fillInput('End', '2024-01-01');
  fillInput('Enter location', 'San Francisco');
  fillInput('Describe your experience', 'Developed software applications.');

  // Click the button to add another new experience
  fireEvent.click(addButton);

  // Fill out the second experience fields
  const secondJobTitleInput = screen.getAllByPlaceholderText(/Enter job title/i)[2];
  fireEvent.change(secondJobTitleInput, { target: { value: 'Data Analyst' } });
  fillInput('Enter company name', 'Data Inc');
  fillInput('Start', '2022-01-01');
  fillInput('End', '2022-12-31');
  fillInput('Enter location', 'New York');
  fillInput('Describe your experience', 'Analyzed data trends.');

  // Check if the fields are updated correctly
  await waitFor(() => {
    expect(screen.getAllByDisplayValue('Software Engineer')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('Tech Corp')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('2023-01-01')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('2024-01-01')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('San Francisco')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('Developed software applications.')).toHaveLength(1);

    expect(screen.getAllByDisplayValue('Data Analyst')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('Data Inc')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('2022-01-01')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('2022-12-31')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('New York')).toHaveLength(1);
    expect(screen.getAllByDisplayValue('Analyzed data trends.')).toHaveLength(1);
  });
});