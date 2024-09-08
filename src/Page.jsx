import React from 'react';
import './Page.css'; // Ensure you have this CSS file

function Page({ content }) {
  return (
    <div className="page">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Page;