import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  IDictionary,
  ObserverClass,
  SubjectClass,
  IInitialState,
  SELECT_SUBJECT,
  DESELECT_OBSERVER,
  TRY_NOTIFY_OBSERVERS
} from '../store/observer-reducer';
import SubjectMenu from './subjectMenu/SubjectMenu';
import { OPEN_SUBJECT_MENU } from '../store/subject-menu-reducer';
export interface ISubjectProps {
  id: string;
  selected: boolean;
  observers: IDictionary<ObserverClass>;
  menuIsOpen: boolean;
}
interface IStateProps {
  allObservers: IDictionary<ObserverClass>;
  subject: SubjectClass;
}

interface ISubjectContainerProps {
  selected: boolean;
}

const SubjectContainer = styled.div<ISubjectContainerProps>`
  z-index: 2;
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #0b64c0;
  grid-column: 1/-1;
  border: ${props => (props.selected ? '1px solid black' : '0px')};
  border-radius: 5px;
`;

const Subject: React.FC<ISubjectProps> = props => {
  const { id, selected, menuIsOpen } = props;

  const dispatch = useDispatch();
  return (
    <SubjectContainer
      className="subject"
      selected={selected}
      onContextMenu={(e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(SELECT_SUBJECT(id));
        dispatch(OPEN_SUBJECT_MENU(id));
      }}
      onClick={(e: MouseEvent) => {
        // prevent the event from bubbling up, to stop the deselect from being fired in ObserverPattern
        e.stopPropagation();
        dispatch(SELECT_SUBJECT(id));
        dispatch(DESELECT_OBSERVER());
        dispatch(TRY_NOTIFY_OBSERVERS(id));
      }}
    >
      {id}
      {menuIsOpen && <SubjectMenu subjectId={id} />}
    </SubjectContainer>
  );
};

export default Subject;
