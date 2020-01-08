import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  return (
    <div style={{ backgroundColor: name }}>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateName(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateAddress(e.target.value));
          }}
        />
        <button type="submit"> Submit </button>
      </form>
      <ul>
        {records.map((record: IRecord, index: number) => (
          <li key={index}>
            {record.name} | {record.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObserverPattern;
