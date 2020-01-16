import React from 'react'
import styled from 'styled-components'
import BackButton from './BackButton'
import CloseButton from './CloseButton'


interface IProps{
    hasPreviousMenu:boolean;
}

const MenuNavBarStyles = styled.div<IProps>`
    display:flex;
    justify-content:${props=>props.hasPreviousMenu ? 'space-between' : 'flex-end'};
    width:100%;
`;
const MenuNavBar:React.FC<IProps> = (props) => { 
    const {hasPreviousMenu} = props;
    return (
        <MenuNavBarStyles className='menu-nav-bar' hasPreviousMenu={hasPreviousMenu}>
            {hasPreviousMenu && <BackButton />}
            <CloseButton />
        </MenuNavBarStyles>
    )
}

export default MenuNavBar
