import { getAvailableColors } from '../utils/widgets';
import useSessionColors from './useSessionColors';
import useWidgetFontColors from './useWidgetFontColors';

const useAvailableColor = (widget) => {
  const { sessionColors } = useSessionColors();
  const fontColors = useWidgetFontColors(widget);
  const availableColors = getAvailableColors(fontColors, sessionColors);

  return {
    availableColors,
    availableColor: sessionColors[fontColors[0]],
  };
};

export default useAvailableColor;
