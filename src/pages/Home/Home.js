import React, { useState } from 'react';
import HomeLayout from '../../components/HomeLayout';
import Tab from '../../components/Tab';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import PictureLeft from '../Picture/PictureLeft';
import PictureRight from '../Picture/PictureRight';
import DiaryRight from '../Diary/DiaryRight';
import VisitorsRight from '../Visitors/VisitorsRight';

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState('홈');

  const HOME_MENUS = [
    { menu: '홈', componentLeft: <HomeLeft />, componentRight: <HomeRight /> },
    {
      menu: '사진첩',
      componentLeft: <PictureLeft />,
      componentRight: <PictureRight />,
    },
    {
      menu: '다이어리',
      componentLeft: <HomeLeft />,
      componentRight: <DiaryRight />,
    },
    {
      menu: '방명록',
      componentLeft: <HomeLeft />,
      componentRight: <VisitorsRight />,
    },
  ];

  const handleMenuSelect = menu => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <HomeLayout
        leftChildren={
          <div className="bottomArea left">
            {HOME_MENUS.find(({ menu }) => menu === selectedMenu).componentLeft}
          </div>
        }
        rightChildren={
          <div className="bottomArea right">
            {
              HOME_MENUS.find(({ menu }) => menu === selectedMenu)
                .componentRight
            }
          </div>
        }
      />
      <Tab onSelectMenu={handleMenuSelect} selectedMenu={selectedMenu} />
    </>
  );
};

export default Home;
