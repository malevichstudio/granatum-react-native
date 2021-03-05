import { useSelector } from 'react-redux';

import {
  selectActiveThemeId,
  selectActiveSheet,
  selectBlocks,
  selectCustomThemes,
} from '../containers/SessionPage/selectors';
import { sessionThemes } from '../theme/sessionThemes';

export default function useSessionColors(widget) {
  const activeSheet = useSelector(selectActiveSheet);
  const activeThemeId = useSelector(selectActiveThemeId);
  const customThemes = useSelector(selectCustomThemes);
  const blocks = useSelector(selectBlocks);

  let mixedThemes = { ...sessionThemes };
  if (customThemes?.length > 0) {
    customThemes.forEach((theme) => {
      if (theme?.id && theme?.palette) {
        mixedThemes[theme?.id] = theme?.palette;
      }
    });
  }
  const sessionColors = mixedThemes[activeThemeId];

  const parentBlock = blocks.find((block) => block.id === widget?.blockId);

  const isContrast = () => {
    if (widget?.backgroundColor === 'colorThree') {
      return true;
    }
    if (parentBlock?.backgroundColor === 'colorThree') {
      return !widget?.backgroundColor;
    }
    if (activeSheet?.decoration?.backgroundColor === 'colorThree') {
      return !parentBlock?.backgroundColor && !widget?.backgroundColor;
    }
  };

  if (sessionColors) {
    return {
      sessionColors,
      accentColor: sessionColors[isContrast() ? 'colorFour' : 'colorThree'],
    };
  }

  return {
    sessionColors: [],
    accentColor: null,
  };
}
