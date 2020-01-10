import React, { MouseEvent } from 'react';
import styled from 'styled-components';

interface IListItem {
  id: string;
}
interface IDropDownListProps {
  list: IListItem[];
  onMouseOver(item: IListItem): void;
  onClick(item: IListItem): void;
  onRightClick(item: IListItem): void;
}

const List = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
  background-color: grey;
`;

const ListItem = styled.li`
  list-style: none;
  background-color: lightgrey;
  &:hover {
    background-color: blue;
  }
`;
const DropDownList: React.FC<IDropDownListProps> = props => {
  const { list, onMouseOver, onClick, onRightClick } = props;
  return (
    <List>
      {list.map((listItem, index) => {
        return (
          <ListItem
            key={`${listItem.id}-list-item-${index}`}
            className="list-item"
            onMouseOver={() => onMouseOver(listItem)}
            onClick={(e: MouseEvent) => {
              // stop event from bubbling to Subject
              e.stopPropagation();
              onClick(listItem);
            }}
            onContextMenu={(e: MouseEvent) => {
              e.preventDefault();
              onRightClick(listItem);
            }}
          >
            {listItem.id}
          </ListItem>
        );
      })}
    </List>
  );
};

export default DropDownList;
