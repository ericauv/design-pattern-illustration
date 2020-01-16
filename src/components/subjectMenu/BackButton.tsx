import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { BACK_SUBJECT_MENU } from '../../store/subject-menu-reducer';

const BackButton: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <button
      name="Back"
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        dispatch(BACK_SUBJECT_MENU());
      }}
    >
      Back
    </button>
  );
};
export default BackButton;
