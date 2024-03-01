import React from 'react';
import HomeLayout from '../../components/HomeLayout';
import Tab from '../../components/Tab';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import PictureLeft from '../Picture/PictureLeft';
import PictureRight from '../Picture/PictureRight';
import DiaryRight from '../Diary/DiaryRight';
import VisitorsRight from '../Visitors/VisitorsRight';

const Home = () => {
  return (
    <>
      <HomeLayout
        leftChildren={
          <div className="bottomArea left">
            {/* ex) 사진첩 클릭 했을 때 homeLeft와 사진첩Left로 component변경 */}
            <HomeLeft />
            <PictureLeft />
          </div>
        }
        rightChildren={
          <div className="bottomArea right">
            {/* ex) 사진첩 클릭 했을 때 homeRight와 사진첩Right로 component변경 */}
            {/* <HomeRight />
            <PictureRight />
            <DiaryRight /> */}
            <VisitorsRight />
          </div>
        }
      />
      <Tab />
    </>
  );
};

export default Home;
