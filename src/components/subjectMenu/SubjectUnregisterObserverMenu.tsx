import React from 'react';

import { IProps } from './SubjectMenu';
import {
  BACK_SUBJECT_MENU,
  CLOSE_SUBJECT_MENU
} from '../../store/subject-menu-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInitialState,
  IDictionary,
  ObserverClass,
  ActionType as ObserverActionType
} from '../../store/observer-reducer';
import { MenuItemVariant } from './SubjectTopMenu';
import MenuItemButton from './MenuItemButton';
import BackButton from './BackButton';
import CloseButton from './CloseButton';

type ObserverDictionary = IDictionary<ObserverClass>;

interface IStateProps {
  subjectObservers: ObserverDictionary;
}

const SubjectUnregisterObserverMenu: React.FC<IProps> = props => {
  const { subjectId } = props;
  const dispatch = useDispatch();
  const { subjectObservers }: IStateProps = useSelector(
    ({ observerReducer }: { observerReducer: IInitialState }) => ({
      subjectObservers: observerReducer.subjects[subjectId].observers
    })
  );
  return (
    <div>
      <BackButton />
      <CloseButton />
      <ul>
        {Object.values(subjectObservers).map((observer, index) => (
          <li style={{ listStyle: 'none' }} key={index}>
            <MenuItemButton
              key={index}
              label={observer.id}
              variant={MenuItemVariant.Observer}
              onClickAction={ObserverActionType.UNREGISTER_OBSERVER}
              onClickActionPayload={{ subjectId, observerId: observer.id }}
              onFocusAction={ObserverActionType.SELECT_OBSERVER}
              onFocusActionPayload={{ subjectId, observerId: observer.id }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectUnregisterObserverMenu;
