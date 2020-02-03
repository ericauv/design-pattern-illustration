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
import { MenuItemVariant } from './MenuItemsList';
import Arrow from '../Arrow';

export interface IProps {
  label: string;
  variant?: MenuItemVariant;
  onClickAction?: ObserverActionType | MenuActionType;
  onClickActionPayload?: IObserverPayload | ISubjectMenuPayload;
  onFocusAction?: ObserverActionType | MenuActionType;
  onFocusActionPayload?: IObserverPayload | ISubjectMenuPayload;
}

const MenuItemButtonStyles = styled.button<Partial<IProps>>`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: ${props =>
    props.variant === MenuItemVariant.Delete ? 'red' : 'black'};
  background: ${props => props.theme.white};
  border: none;
  border-radius: 0px 0px 5px 5px;
  &:hover {
    background: ${props => props.theme.blue};
  }
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
        if (onClickAction) {
          dispatch({ type: onClickAction, payload: onClickActionPayload });
        }
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
      {variant === MenuItemVariant.Parent && <Arrow />}
    </MenuItemButtonStyles>
  );
};

export default MenuItemButton;
