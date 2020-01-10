import React, { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  IInitialState,
  ObserverClass,
  SubjectClass,
  IDictionary,
  CREATE_OBSERVER,
  CREATE_SUBJECT,
  DESELECT_SUBJECT,
  DESELECT_OBSERVER
} from '../store/observer-reducer';
import Observer from './Observer';
import Subject from './Subject';

interface IProps {}

interface IStateProps {
  observers: IDictionary<ObserverClass>;
  subjects: IDictionary<SubjectClass>;
  selectedObserverId: string;
  selectedSubjectId: string;
}

const ObserverPatternContainer = styled.div`
  font-size: 1.2rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(9, 10vw);
  /* grid-gap: 1.25vw; */
`;

const SubjectContainer = styled.div`
  width: 100%;
  height: 30px;
  grid-column: -1/1;
  background-color: green;
`;

const ObserverPattern: React.FC<IProps> = () => {
  // subscribes to changes in values in store
  const {
    observers,
    subjects,
    selectedObserverId,
    selectedSubjectId
  }: IStateProps = useSelector((state: IInitialState) => {
    return {
      observers: state.observers,
      subjects: state.subjects,
      selectedObserverId: state.selectedObserverId,
      selectedSubjectId: state.selectedSubjectId
    };
  });

  // dispatches actions to store
  const dispatch = useDispatch();

  return (
    <div
      style={{ height: '100%' }}
      onClick={(e: MouseEvent) => {
        dispatch(DESELECT_SUBJECT());
        dispatch(DESELECT_OBSERVER());
      }}
    >
      <button onClick={() => dispatch(CREATE_SUBJECT())}>CREATE SUBJECT</button>
      <button onClick={() => dispatch(CREATE_OBSERVER())}>
        CREATE OBSERVER
      </button>
      <ObserverPatternContainer>
        {Object.values(subjects).map(subjectItem => (
          <Subject
            observers={subjectItem.observers}
            selected={subjectItem.id === selectedSubjectId}
            id={subjectItem.id}
            key={subjectItem.id}
          />
        ))}

        {Object.values(observers).map((observerItem, index) => (
          <Observer
            key={observerItem.id}
            id={observerItem.id}
            selected={observerItem.id === selectedObserverId}
            gridColumnStart={index % 2 ? 1 : 5}
            gridColumnEnd={index % 2 ? 5 : 9}
          />
        ))}
      </ObserverPatternContainer>
    </div>
  );
};

export default ObserverPattern;
