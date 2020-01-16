import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  IDictionary,
  ObserverClass,
  SubjectClass,
  IInitialState,
  REGISTER_OBSERVER,
  UNREGISTER_OBSERVER,
  SELECT_OBSERVER,
  TRY_NOTIFY_OBSERVERS
} from '../store/observer-reducer';
import DropDownList from './DropDownList';

type ObserverDictionary = IDictionary<ObserverClass>;
interface ISubjectOptionsProps {
  subjectId: string;
}
interface IStateProps {
  allObservers: ObserverDictionary;
  subjectObservers: ObserverDictionary;
}

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

const OptionsContainer = styled.div`
  left: 100%;
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
`;
const SubjectOptions: React.FC<ISubjectOptionsProps> = props => {
  const { subjectId } = props;
  const { subjectObservers, allObservers }: IStateProps = useSelector(
    (state: IInitialState) => ({
      subjectObservers: state.subjects[subjectId].observers,
      allObservers: state.observers
    })
  );
  const dispatch = useDispatch();

  return (
    <OptionsContainer>
      <DropDownList
        items={Object.keys(
          getNonRegisteredObserversForSubject(subjectObservers, allObservers)
        )}
        onMouseOver={observerId => dispatch(SELECT_OBSERVER(observerId))}
        onClick={observerId =>
          dispatch(REGISTER_OBSERVER(subjectId, observerId))
        }
      >
        REGISTER
      </DropDownList>
      <DropDownList
        items={Object.keys(subjectObservers)}
        onMouseOver={observerId => dispatch(SELECT_OBSERVER(observerId))}
        onClick={observerId =>
          dispatch(UNREGISTER_OBSERVER(subjectId, observerId))
        }
      >
        UNREGISTER
      </DropDownList>
      <button onClick={() => dispatch(TRY_NOTIFY_OBSERVERS(subjectId))}>
        Notify Observers
      </button>
    </OptionsContainer>
  );
};

export default SubjectOptions;
