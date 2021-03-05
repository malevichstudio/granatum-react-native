import React, { memo } from 'react';
import { TASK_BLOCK_TYPE, RESULTS_BLOCK_TYPE } from 'app/constants';

import Block from './Block';
import TaskBlock from './TaskBlock';

function BlockWrapper({
  block,
  position,
  scrollTo,
  scrollPosition,
  startFrom,
}) {
  switch (block.type) {
    case TASK_BLOCK_TYPE:
    case RESULTS_BLOCK_TYPE:
      return (
        <TaskBlock
          block={block}
          position={position}
          scrollTo={scrollTo}
          scrollPosition={scrollPosition}
          startFrom={startFrom}
        />
      );
    default:
      return (
        <Block
          block={block}
          scrollPosition={scrollPosition}
          startFrom={startFrom}
        />
      );
  }
}

export default memo(BlockWrapper);
