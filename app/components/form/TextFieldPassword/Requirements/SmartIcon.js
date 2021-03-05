import React from 'react';

import CheckCircleIcon from 'app/components/icons/CheckCircleIcon';
import CrossCircleIcon from 'app/components/icons/CrossCircleIcon';
import UncheckedCircleIcon from 'app/components/icons/UncheckedCircleIcon';

const SmartIcon = ({ iconName }) => {
  return (
    <>
      {iconName === 'success' && <CheckCircleIcon />}
      {iconName === 'error' && <CrossCircleIcon fill="#F6473B" />}
      {iconName === 'empty' && <UncheckedCircleIcon fill="#DFE1E7" />}
    </>
  );
};

export default SmartIcon;
