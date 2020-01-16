import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IProps } from './SubjectMenu';
import MenuItemButton, { IProps as IMenuItemProps } from './MenuItemButton';
import { ActionType as ObserverActionType } from '../../store/observer-reducer';
import {
  ActionType as MenuActionType,
  MenuType,
  CLOSE_SUBJECT_MENU,
  BACK_SUBJECT_MENU
} from '../../store/subject-menu-reducer';
import BackButton from './BackButton';
import CloseButton from './CloseButton';

export enum MenuItemVariant {
  Parent = 'Parent',
  Delete = 'Delete',
  Observer = 'Observer'
}

const SubjectTopMenuStyles = styled.div`
  display: absolute;
  left: 100%;
  top: 0;
`;

const SubjectTopMenu: React.FC<IProps> = props => {
  const { subjectId } = props;
  const dispatch = useDispatch();
  const menuItems: IMenuItemProps[] = [
    {
      label: 'Register Observer',
      onClickAction: MenuActionType.UPDATE_SUBJECT_MENU,
      onClickActionPayload: {
        subjectId,
        menuType: MenuType.SubjectRegisterObserverMenu
      }
    },
    {
      label: 'Unregister Observer',
      onClickAction: MenuActionType.UPDATE_SUBJECT_MENU,
      onClickActionPayload: {
        subjectId,
        menuType: MenuType.SubjectUnregisterObserverMenu
      }
    },
    {
      label: 'Notify Observers',
      onClickAction: ObserverActionType.TRY_NOTIFY_OBSERVERS,
      onClickActionPayload: {
        subjectId,
        observerId: ''
      }
    },
    {
      label: 'Delete Subject',
      variant: MenuItemVariant.Delete,
      onClickAction: ObserverActionType.DELETE_SUBJECT,
      onClickActionPayload: {
        subjectId,
        observerId: ''
      }
    }
  ];
  return (
    <div>
      <BackButton />
      <CloseButton />
      <ul>
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
      </ul>
    </div>
  );
};

export default SubjectTopMenu;
