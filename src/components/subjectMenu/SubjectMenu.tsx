import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  MenuType,
  ISubjectMenuInitialState,
  ActionType as MenuActionType
} from '../../store/subject-menu-reducer';
import {
  ActionType as ObserverActionType,
  IDictionary,
  IObserver,
  IInitialState as IObserverInitialState
} from '../../store/observer-reducer';
import MenuNavBar from './MenuNavBar';
import { IProps as IMenuItem } from './MenuItemButton';
import MenuItemsList, { MenuItemVariant } from './MenuItemsList';

interface IStateProps {
  menuType: MenuType | null;
  hasPreviousMenu: boolean;
  allObservers?: IDictionary<IObserver>;
  subjectObservers?: IDictionary<IObserver>;
}

export interface IProps {
  subjectId: string;
}
const MenuStyles = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 70%;
  border: 1px solid black;
  border-radius: 0px 5px 5px 5px;
`;

function getNonRegisteredObserversForSubject(
  allObservers: IDictionary<IObserver>,
  subjectObservers: IDictionary<IObserver>
): IDictionary<IObserver> {
  const nonRegisteredObservers = { ...allObservers };

  for (const id in nonRegisteredObservers) {
    if (subjectObservers.hasOwnProperty(id)) {
      delete nonRegisteredObservers[id];
    }
  }

  return nonRegisteredObservers;
}

function getTopMenuItems(subjectId: string): IMenuItem[] {
  const menuItems: IMenuItem[] = [
    {
      label: 'Register Observer',
      variant: MenuItemVariant.Parent,
      onClickAction: MenuActionType.UPDATE_SUBJECT_MENU,
      onClickActionPayload: {
        subjectId,
        menuType: MenuType.SubjectRegisterObserverMenu
      }
    },
    {
      label: 'Unregister Observer',
      variant: MenuItemVariant.Parent,
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
  return menuItems;
}

function getSubjectObserverMenuItems(
  menuType: MenuType,
  subjectId: string,
  allObservers: IDictionary<IObserver>,
  subjectObservers: IDictionary<IObserver>
): IMenuItem[] {
  let menuItems: IMenuItem[] = [];

  switch (menuType) {
    case MenuType.SubjectRegisterObserverMenu: {
      const nonRegisteredObservers = Object.values(
        getNonRegisteredObserversForSubject(allObservers, subjectObservers)
      );
      if (nonRegisteredObservers.length === 0) {
        menuItems = [{ label: 'No Observers to Register' }];
      } else {
        menuItems = nonRegisteredObservers.map(observer => ({
          label: observer.id,
          variant: MenuItemVariant.Observer,
          onClickAction: ObserverActionType.REGISTER_OBSERVER,
          onClickActionPayload: { subjectId, observerId: observer.id },
          onFocusAction: ObserverActionType.SELECT_OBSERVER,
          onFocusActionPayload: { subjectId, observerId: observer.id }
        }));
      }
      break;
    }
    case MenuType.SubjectUnregisterObserverMenu: {
      if (Object.values(subjectObservers).length === 0) {
        menuItems = [{ label: 'No Observers to Unregister' }];
      } else {
        menuItems = Object.values(subjectObservers).map(observer => ({
          label: observer.id,
          variant: MenuItemVariant.Observer,
          onClickAction: ObserverActionType.UNREGISTER_OBSERVER,
          onClickActionPayload: { subjectId, observerId: observer.id },
          onFocusAction: ObserverActionType.SELECT_OBSERVER,
          onFocusActionPayload: { subjectId, observerId: observer.id }
        }));
      }
      break;
    }
    default:
      break;
  }

  return menuItems;
}
const SubjectMenu: React.FC<IProps> = props => {
  const { subjectId } = props;
  let menuItems: IMenuItem[] = [];
  const { menuType, hasPreviousMenu }: IStateProps = useSelector(
    ({
      subjectMenuReducer
    }: {
      subjectMenuReducer: ISubjectMenuInitialState;
    }) => {
      if (!subjectMenuReducer.menuStack.length) {
        return { menuType: null, hasPreviousMenu: false };
      } else {
        return {
          menuType:
            subjectMenuReducer.menuStack[
              subjectMenuReducer.menuStack.length - 1
            ],
          hasPreviousMenu: subjectMenuReducer.menuStack.length > 1
        };
      }
    }
  );
  const { allObservers, subjectObservers }: Partial<IStateProps> = useSelector(
    ({ observerReducer }: { observerReducer: IObserverInitialState }) => ({
      allObservers: observerReducer.observers,
      subjectObservers: observerReducer.subjects[subjectId].observers
    })
  );

  switch (menuType) {
    case MenuType.SubjectTopMenu:
      menuItems = getTopMenuItems(subjectId);
      break;
    case MenuType.SubjectRegisterObserverMenu:
    case MenuType.SubjectUnregisterObserverMenu:
      menuItems = getSubjectObserverMenuItems(
        menuType,
        subjectId,
        allObservers,
        subjectObservers
      );
      break;

    default:
      break;
  }

  return (
    <MenuStyles className="menu">
      <MenuNavBar hasPreviousMenu={hasPreviousMenu} />
      <MenuItemsList menuItems={menuItems} />
    </MenuStyles>
  );
};

export default SubjectMenu;
