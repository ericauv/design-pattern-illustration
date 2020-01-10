import React, { MouseEvent, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';

interface IDropDownListProps {
  items: string[];
  onMouseOver(id: string): void;
  onClick(id: string): void;
  top?: string;
  left?: string;
}

interface IListProps {
  top?: string;
  left?: string;
}

const ListContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const List = styled.ul<IListProps>`
  padding: 0;
  margin: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
`;

const ListItem = styled.li`
  list-style: none;
  background-color: lightgrey;
  &:hover {
    background-color: blue;
  }
`;
const DropDownList: React.FC<IDropDownListProps> = props => {
  const { items, onMouseOver, onClick, top, left } = props;
  const [show, setShow] = useState(false);

  return (
    <ListContainer
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div>{props.children}</div>
      <List top={top} left={left}>
        {show &&
          items.map((item, index) => {
            return (
              <ListItem
                key={`${item}-list-item-${index}`}
                className="list-item"
                onMouseOver={() => onMouseOver(item)}
                onClick={(e: MouseEvent) => {
                  // stop event from bubbling to Subject
                  e.stopPropagation();
                  onClick(item);
                }}
              >
                {item}
              </ListItem>
            );
          })}
      </List>
    </ListContainer>
  );
};

export default DropDownList;
