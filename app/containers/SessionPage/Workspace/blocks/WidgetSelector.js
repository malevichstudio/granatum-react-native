import React from 'react';

import Image from '../widgets/Image';
import Text from '../widgets/Text';
import Youtube from '../widgets/Youtube';
import Presentation from '../widgets/Presentation';
import Button from '../widgets/Button';
import GoogleDrive from '../widgets/GoogleDrive';
import ResultBlockFilter from '../widgets/ResultBlockFilter';
import * as types from '../../../../constants';

function WidgetSelector({ id, type, blockId }) {
  switch (type) {
    case types.IMAGE_TYPE:
      return <Image id={id} />;
    case types.PRESENTATION_TYPE:
      return <Presentation id={id} blockId={blockId} />;
    case types.TEXT_TYPE:
      return <Text id={id} blockId={blockId} />;
    case types.VIDEO_TYPE:
      return <Youtube id={id} />;
    case types.BUTTON_TYPE:
      return <Button id={id} />;
    case types.GOOGLE_DRIVE_TYPE:
      return <GoogleDrive id={id} />;
    case types.UNIVERSAL_TYPE:
      return <ResultBlockFilter blockId={blockId} />;
    default:
      return null;
  }
}

export default React.memo(WidgetSelector);
