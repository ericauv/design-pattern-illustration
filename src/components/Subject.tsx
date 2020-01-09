import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
export interface ISubjectProps {
  id: string;
  selected: boolean;
}

const SubjectContainer = styled.div<Partial<ISubjectProps>>`
  width: 100%;
  height: 30px;
  background-color: green;
  grid-column: 1/-1;
`;

const Subject: React.FC<ISubjectProps> = props => {
  const { id } = props;
  return <SubjectContainer className="subject">{id}</SubjectContainer>;
};

export default Subject;
