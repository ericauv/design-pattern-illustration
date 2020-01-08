import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  IInitialState,
  IRecord,
  updateAddress,
  updateName,
  addRecord
} from '../store/root-reducer';

interface IProps {}

interface IStateProps {
  name: string;
  address: string;
  records: IRecord[];
}

const ObserverPattern: React.FC<IProps> = () => {
  // subscribes to changes in values in store
  const { name, address, records } = useSelector<IInitialState, IStateProps>(
    (state: IInitialState) => {
      return {
        name: state.name,
        address: state.address,
        records: state.records
      };
    }
  );
  // dispatches actions to store
  const dispatch = useDispatch();

  // Add new record to store onSubmit
  const handleSubmit = (e: FormEvent) => {
    dispatch(addRecord({ name, address }));
    dispatch(updateName(''));
    dispatch(updateAddress(''));
  };

  return <div></div>;
};

export default ObserverPattern;
