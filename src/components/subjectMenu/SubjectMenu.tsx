import React from 'react';
import {
  MenuType,
  ISubjectMenuInitialState
} from '../../store/subject-menu-reducer';
import { useSelector } from 'react-redux';
import SubjectRegisterObserverMenu from './SubjectRegisterObserverMenu';
import SubjectTopMenu from './SubjectTopMenu';
import SubjectUnregisterObserverMenu from './SubjectUnregisterObserverMenu';

interface IStateProps {
  menuType: MenuType | null;
}

export interface IProps {
  subjectId: string;
}

const SubjectMenu: React.FC<IProps> = props => {
  const { subjectId } = props;
  const { menuType }: IStateProps = useSelector(
    ({
      subjectMenuReducer
    }: {
      subjectMenuReducer: ISubjectMenuInitialState;
    }) => {
      if (!subjectMenuReducer.menuStack.length) {
        return { menuType: null };
      }
      return {
        menuType:
          subjectMenuReducer.menuStack[subjectMenuReducer.menuStack.length - 1]
      };
    }
  );

  // determine return component
  if (menuType === MenuType.SubjectTopMenu) {
    return <SubjectTopMenu subjectId={subjectId} />;
  } else if (menuType === MenuType.SubjectRegisterObserverMenu) {
    return <SubjectRegisterObserverMenu subjectId={subjectId} />;
  } else if (menuType === MenuType.SubjectUnregisterObserverMenu) {
    return <SubjectUnregisterObserverMenu subjectId={subjectId} />;
  } else {
    return null;
  }
};

export default SubjectMenu;
