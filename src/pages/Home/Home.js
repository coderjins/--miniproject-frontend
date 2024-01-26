import React from 'react';
import HomeLayout from '../../components/HomeLayout';

const Home = () => {
  return (
    <HomeLayout
      leftChildren={<div className="bottomArea left">ddd</div>}
      rightChildren={<div className="bottomArea right">fdafdfa</div>}
    />
  );
};

export default Home;
