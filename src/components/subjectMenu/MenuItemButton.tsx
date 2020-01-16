import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import {
  ActionType as ObserverActionType,
  IObserverPayload
} from '../../store/observer-reducer';
import {
  ActionType as MenuActionType,
  ISubjectMenuPayload
} from '../../store/subject-menu-reducer';
import { useDispatch } from 'react-redux';
import { MenuItemVariant } from './SubjectTopMenu';

export interface IProps {
  label: string;
  variant?: MenuItemVariant;
  onClickAction: ObserverActionType | MenuActionType | null;
  onClickActionPayload: IObserverPayload | ISubjectMenuPayload;
  onFocusAction?: ObserverActionType | MenuActionType;
  onFocusActionPayload?: IObserverPayload | ISubjectMenuPayload;
}

const MenuItemButtonStyles = styled.button<Partial<IProps>>`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${props =>
    props.variant === MenuItemVariant.Delete ? 'red' : 'black'};
`;
const MenuItemButton: React.FC<IProps> = props => {
  const {
    label,
    variant,
    onClickAction,
    onClickActionPayload,
    onFocusAction,
    onFocusActionPayload
  } = props;
  const dispatch = useDispatch();
  return (
    <MenuItemButtonStyles
      variant={variant}
      name={label}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: onClickAction, payload: onClickActionPayload });
      }}
      onMouseOver={(e: MouseEvent) => {
        e.stopPropagation();
        if (onFocusAction) {
          e.stopPropagation();
          dispatch({ type: onFocusAction, payload: onFocusActionPayload });
        }
      }}
      onFocus={e => {
        e.stopPropagation();
        if (onFocusAction) {
          e.stopPropagation();
          dispatch({ type: onFocusAction, payload: onFocusActionPayload });
        }
      }}
    >
      {label}
    </MenuItemButtonStyles>
  );
};

export default MenuItemButton;
