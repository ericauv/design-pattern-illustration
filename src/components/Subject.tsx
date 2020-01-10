import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  IDictionary,
  ObserverClass,
  SubjectClass,
  IInitialState,
  SELECT_SUBJECT,
  SELECT_OBSERVER,
  DESELECT_OBSERVER,
  REGISTER_OBSERVER,
  UNREGISTER_OBSERVER
} from '../store/observer-reducer';
import DropDownList from './DropDownList';

export interface ISubjectProps {
  id: string;
  selected: boolean;
  observers: IDictionary<ObserverClass>;
}
interface IStateProps {
  allObservers: IDictionary<ObserverClass>;
  subject: SubjectClass;
}

const SubjectContainer = styled.div<Partial<ISubjectProps>>`
  position: relative;
  width: 100%;
  height: 30px;
  background-color: green;
  grid-column: 1/-1;
  border: ${props => (props.selected ? '1px solid black' : '0px')};
  border-radius: 5px;
`;

const Subject: React.FC<ISubjectProps> = props => {
  const { id, selected, observers } = props;
  const { subject, allObservers }: IStateProps = useSelector(
    (state: IInitialState) => ({
      subject: state.subjects[id],
      allObservers: state.observers
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

        SubjectClass.notifyObservers(subject.observers);
        dispatch(SELECT_SUBJECT(id));
        dispatch(DESELECT_OBSERVER());
      }}
    >
      {id}
      {selected && Object.keys(observers).length === 0 && (
        <DropDownList
          list={Object.values(allObservers)}
          onClick={observer => dispatch(REGISTER_OBSERVER(id, observer.id))}
          onRightClick={observer =>
            dispatch(REGISTER_OBSERVER(id, observer.id))
          }
          onMouseOver={observer => dispatch(SELECT_OBSERVER(observer.id))}
        />
      )}
      {selected && Object.keys(observers).length > 0 && (
        <DropDownList
          list={Object.values(observers)}
          onClick={observer => dispatch(UNREGISTER_OBSERVER(id, observer.id))}
          onRightClick={observer =>
            dispatch(REGISTER_OBSERVER(id, observer.id))
          }
          onMouseOver={observer => dispatch(SELECT_OBSERVER(observer.id))}
        />
      )}
    </SubjectContainer>
  );
};

export default Subject;
