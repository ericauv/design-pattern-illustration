import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  IDictionary,
  ObserverClass,
  SubjectClass,
  IInitialState,
  SELECT_SUBJECT,
  DESELECT_OBSERVER
} from '../store/observer-reducer';
import SubjectMenu from './subjectMenu/SubjectMenu';
import { OPEN_SUBJECT_MENU } from '../store/subject-menu-reducer';
export interface ISubjectProps {
  id: string;
  selected: boolean;
  observers: IDictionary<ObserverClass>;
}
interface IStateProps {
  allObservers: IDictionary<ObserverClass>;
  subject: SubjectClass;
}

interface ISubjectContainerProps {
  selected: boolean;
}

const SubjectContainer = styled.div<ISubjectContainerProps>`
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #0b64c0;
  grid-column: 1/-1;
  border: ${props => (props.selected ? '1px solid black' : '0px')};
  border-radius: 5px;
`;

const Subject: React.FC<ISubjectProps> = props => {
  const { id, selected, observers } = props;
  const { subject, allObservers }: IStateProps = useSelector(
    ({ observerReducer }: { observerReducer: IInitialState }) => ({
      subject: observerReducer.subjects[id],
      allObservers: observerReducer.observers
    })
  );
  const dispatch = useDispatch();
  return (
    <SubjectContainer
      className="subject"
      selected={selected}
      onClick={(e: MouseEvent) => {
        // prevent the event from bubbling up, to stop the deselect from being fired in ObserverPattern
        e.stopPropagation();
        dispatch(SELECT_SUBJECT(id));
        dispatch(DESELECT_OBSERVER());
        dispatch(OPEN_SUBJECT_MENU(id));
      }}
    >
      {id}
      {selected && <SubjectMenu subjectId={id} />}
    </SubjectContainer>
  );
};

export default Subject;
