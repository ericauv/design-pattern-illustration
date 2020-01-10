import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SELECT_OBSERVER, DESELECT_SUBJECT } from '../store/observer-reducer';
export interface IObserverProps {
  gridColumnStart: number;
  gridColumnEnd: number;
  id: string;
  selected: boolean;
}

const ObserverContainer = styled.div<Partial<IObserverProps>>`
  width: 100%;
  height: 30px;
  background-color: red;
  grid-column: ${props => props.gridColumnStart} /
    ${props => props.gridColumnEnd};
  border: ${props => (props.selected ? '1px solid black' : '0px')};
  border-radius: 5px;
`;

const Observer: React.FC<IObserverProps> = props => {
  const { gridColumnStart, gridColumnEnd, id, selected } = props;
  const dispatch = useDispatch();

  return (
    <ObserverContainer
      className="observer"
      gridColumnStart={gridColumnStart}
      gridColumnEnd={gridColumnEnd}
      selected={selected}
      onClick={(e: MouseEvent) => {
        // prevent clickEvent from bubbling up to ObserverPattern, which would cause DESELECT_OBSERVER to be dispatched
        e.stopPropagation();
        dispatch(SELECT_OBSERVER(id));
        dispatch(DESELECT_SUBJECT());
      }}
    >
      {id}
    </ObserverContainer>
  );
};

export default Observer;
