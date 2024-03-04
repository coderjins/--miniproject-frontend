import React from 'react';

const Tab = ({ onSelectMenu, selectedMenu }) => {
  const menus = ['홈', '사진첩', '다이어리', '방명록'];

  const handleMenuClick = menu => {
    onSelectMenu(menu);
  };

  return (
    <div className="tab">
      <ul className="tabArea">
        {menus.map(menu => (
          <li key={menu}>
            <button
              type="button"
              className={`btn${selectedMenu === menu ? ' active' : ''}`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
