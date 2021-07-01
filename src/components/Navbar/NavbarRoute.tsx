import React, { useState, useEffect } from 'react';
import { MenuItem } from './MenuItems';
import { NavLink, useLocation } from 'react-router-dom';
import ScssClass from './Navbar.module.scss';
interface Menu {
  name: string;
  path: string;
  cRoute?: string;
}

// function arraymove(arr: Menu[], fromIndex: number, toIndex: number) {
//   var element = arr[fromIndex];
//   arr.splice(fromIndex, 1);
//   arr.splice(toIndex, 0, element);
//   return arr;
// }

function handleRoute(arr: Menu[], path: string) {
  const idxToRemove = arr.findIndex((el: Menu) => el.path === path);
  const newMenu = [...arr];
  const spliced = newMenu.splice(idxToRemove, 1);
  const newMenus = [...newMenu, ...spliced];
  return newMenus;
}

function NavBarRoute() {
  const [menus, setMenu] = useState([] as Menu[]);

  const location = useLocation();
  const curPath = location.pathname;

  useEffect(() => {
    setMenu(handleRoute(MenuItem, curPath));
  }, [curPath]);

  return (
    <div className={ScssClass.navRoute}>
      {menus.map((item: Menu, index: number) => {
        if (index < 3) {
          return (
            <span className={ScssClass.route} key={index}>
              <div style={{ position: 'relative' }}>
                <NavLink activeClassName={ScssClass.currentPage} to={item.path} exact>
                  <div className={ScssClass.paths}>{item.name}</div>
                </NavLink>
                {item.path === '/library' && (
                  <span
                    style={{
                      color: '#2dceef',
                      margin: '0',
                      cursor: 'pointer',
                      position: 'absolute',
                      fontSize: '38px',
                      top: curPath === '/library' ? '-24px' : '-14px',
                      left: curPath === '/library' ? '96px' : '18px',
                    }}
                  >
                    .
                  </span>
                )}
              </div>
            </span>
          );
        }
        return null;
      })}
      {curPath === '/browse' && (
        <span>
          <div className={ScssClass.browse_route}>
            <NavLink activeClassName={ScssClass.genre} to='#/' exact>
              GENRE & MOOD
            </NavLink>
            <NavLink activeClassName={ScssClass.release} to='#/' exact>
              New releases
            </NavLink>
            <NavLink activeClassName={ScssClass.release} to='#/' exact>
              Podcast
            </NavLink>
          </div>
        </span>
      )}
    </div>
  );
}

export default NavBarRoute;
