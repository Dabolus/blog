import React, { FunctionComponent } from 'react';
import {
  Nav,
  NavContainer,
  NavLink,
  ExternalNavLink,
  NavMenu,
  NavMenuItem,
  NavWrapper,
  SearchContainer,
} from './style';
import { MenuItem } from '../../utils/models';
import { Search } from '../search';
import Logo from '../logo';
import useDisappearingHeader from '../../hooks/useDisappearingHeader';
import ExternalIcon from '../icons/external';

interface NavigationProps {
  title: string;
  menu: MenuItem[];
  showSearch: boolean;
  dark?: boolean;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  title,
  menu,
  dark = false,
  showSearch = true,
}) => {
  const scrollFromTop = useDisappearingHeader();

  return (
    <NavContainer
      dark={dark}
      style={{ transform: `translateY(${scrollFromTop}px)` }}
    >
      <Nav>
        <Logo title={title} />
        <NavWrapper>
          <NavMenu mobile={true}>
            {menu.map((item, index) => (
              <NavMenuItem key={index}>
                {item.path.startsWith('http') ? (
                  <ExternalNavLink
                    href={item.path}
                    rel="external"
                    target={item.name}
                    key={index}
                  >
                    {item.name} <ExternalIcon />
                  </ExternalNavLink>
                ) : (
                  <NavLink to={item.path} key={index}>
                    {item.name}
                  </NavLink>
                )}
              </NavMenuItem>
            ))}
          </NavMenu>
          <SearchContainer>
            {showSearch && (
              <NavMenu>
                <Search />
              </NavMenu>
            )}
          </SearchContainer>
        </NavWrapper>
      </Nav>
    </NavContainer>
  );
};

export default Navigation;
