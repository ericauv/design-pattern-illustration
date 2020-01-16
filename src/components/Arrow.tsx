import React from 'react'
import styled from 'styled-components'

const ArrowStyles = styled.i`
    margin-right: 20px;
    margin-left:20px;
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
`;
const Arrow:React.FC = () => (<ArrowStyles/>)


export default Arrow
