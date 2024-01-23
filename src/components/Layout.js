import React from 'react';

const layout = ({ children }) => {
  return (
    <div className="App">
      <section className="container">{children}</section>
    </div>
  );
};

export default layout;
