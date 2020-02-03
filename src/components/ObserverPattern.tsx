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
import { ISubjectMenuInitialState } from '../store/subject-menu-reducer';
import Observer from './Observer';
import Subject from './Subject';

interface IProps {}

interface IStateProps {
  observers: IDictionary<ObserverClass>;
  subjects: IDictionary<SubjectClass>;
  selectedObserverId: string;
  selectedSubjectId: string;
  subjectMenuSubjectId: string;
}

const ObserverPatternContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  align-items: center;
  > div {
    width: 60%;
    margin-top: 10px;
  }
`;

const ObserverPattern: React.FC<IProps> = () => {
  // subscribes to changes in values in store
  const {
    observers,
    subjects,
    selectedObserverId,
    selectedSubjectId,
    subjectMenuSubjectId
  }: IStateProps = useSelector(
    ({
      observerReducer,
      subjectMenuReducer
    }: {
      observerReducer: IInitialState;
      subjectMenuReducer: ISubjectMenuInitialState;
    }) => {
      return {
        observers: observerReducer.observers,
        subjects: observerReducer.subjects,
        selectedObserverId: observerReducer.selectedObserverId,
        selectedSubjectId: observerReducer.selectedSubjectId,
        subjectMenuSubjectId: subjectMenuReducer.subjectId
      };
    }
  );

  // dispatches actions to store
  const dispatch = useDispatch();
  console.log(subjectMenuSubjectId);

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
        <GroupContainer>
          {Object.values(subjects).map(subjectItem => (
            <Subject
              menuIsOpen={subjectItem.id === subjectMenuSubjectId}
              observers={subjectItem.observers}
              selected={subjectItem.id === selectedSubjectId}
              id={subjectItem.id}
              key={subjectItem.id}
            />
          ))}
        </GroupContainer>
        <GroupContainer>
          {Object.values(observers).map((observerItem, index) => (
            <Observer
              key={observerItem.id}
              id={observerItem.id}
              selected={observerItem.id === selectedObserverId}
              gridColumnStart={index % 2 ? 1 : 5}
              gridColumnEnd={index % 2 ? 5 : 9}
              beingNotified={observerItem.beingNotified}
            />
          ))}
        </GroupContainer>
      </ObserverPatternContainer>
    </div>
  );
};

export default ObserverPattern;
