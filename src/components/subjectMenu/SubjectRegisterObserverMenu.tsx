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
function getNonRegisteredObserversForSubject(
  subjectObservers: ObserverDictionary,
  allObservers: ObserverDictionary
): ObserverDictionary {
  const nonRegisteredObservers = { ...allObservers };

  for (const id in nonRegisteredObservers) {
    if (subjectObservers.hasOwnProperty(id)) {
      delete nonRegisteredObservers[id];
    }
  }

  return nonRegisteredObservers;
}

interface IStateProps {
  allObservers: ObserverDictionary;
  subjectObservers: ObserverDictionary;
}

const SubjectRegisterObserverMenu: React.FC<IProps> = props => {
  const { subjectId } = props;
  const dispatch = useDispatch();
  const { allObservers, subjectObservers }: IStateProps = useSelector(
    ({ observerReducer }: { observerReducer: IInitialState }) => ({
      allObservers: observerReducer.observers,
      subjectObservers: observerReducer.subjects[subjectId].observers
    })
  );

  const nonRegisteredObservers = getNonRegisteredObserversForSubject(
    subjectObservers,
    allObservers
  );
  return (
    <div>
      <BackButton />
      <CloseButton />
      <ul>
        {Object.values(nonRegisteredObservers).map((observer, index) => (
          <li style={{ listStyle: 'none' }} key={index}>
            <MenuItemButton
              key={index}
              label={observer.id}
              variant={MenuItemVariant.Observer}
              onClickAction={ObserverActionType.REGISTER_OBSERVER}
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

export default SubjectRegisterObserverMenu;
