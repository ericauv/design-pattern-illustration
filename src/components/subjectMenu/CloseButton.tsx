import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_SUBJECT_MENU } from '../../store/subject-menu-reducer';

const CloseButton: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <button
      name="Close Menu"
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        dispatch(CLOSE_SUBJECT_MENU());
      }}
    >
      X
    </button>
  );
};
export default CloseButton;
