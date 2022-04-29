import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const PrivateTemplate = (props: Props) => {
  return (
    <div>
      <h2>AdminTemplate</h2>
      {props.children}
    </div>
  );
};

export default PrivateTemplate;
