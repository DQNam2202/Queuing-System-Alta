import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
  children?: JSX.Element | JSX.Element[];
}

const HomeTemplate = (props: Props) => {

  return (
    <div className='relative'>
       {props.children}
    </div>
  )
}

export default HomeTemplate