import React from 'react';
import styled from 'styled-components';
import MenuItemButton, { IProps as IMenuItem } from './MenuItemButton';

export enum MenuItemVariant {
  Parent = 'Parent',
  Delete = 'Delete',
  Observer = 'Observer'
}

interface IProps{
  menuItems: IMenuItem[];
}

const MenuItemsListStyles = styled.ul`
  width:100%;
  margin:0;
  padding:0;
`;

const MenuItemsList: React.FC<IProps> = props => {
  const { menuItems } = props;
  
  return (
    <MenuItemsListStyles className='menu-items-list'>
        {menuItems.map((menuItem, index) => (
          <li style={{ listStyle: 'none' }} key={index}>
            <MenuItemButton
              key={index}
              label={menuItem.label}
              variant={menuItem.variant}
              onClickAction={menuItem.onClickAction}
              onClickActionPayload={menuItem.onClickActionPayload}
              onFocusAction={menuItem.onFocusAction}
              onFocusActionPayload={menuItem.onFocusActionPayload}
            />
          </li>
        ))}
    </MenuItemsListStyles>
  );
};

export default MenuItemsList;
