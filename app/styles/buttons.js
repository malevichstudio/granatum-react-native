import colors from 'app/theme/variables/colors/defaultColors';

// Полосочка свайпа вверх/вниз
export const swipeLine = (bgColor) => ({
  width: 32,
  height: 4,
  backgroundColor: bgColor,
  borderRadius: 7,
});

export const button = (bgColor) => ({
  backgroundColor: bgColor,
  borderRadius: 48,
  borderWidth: 0,
  textAlign: 'center',
  justifyContent: 'center',
});

// Размеры кнопок
export const buttonSmall = {
  paddingVertical: 4,
  paddingHorizontal: 24,
  minHeight: 32,
};

export const buttonMedium = {
  paddingVertical: 8,
  paddingHorizontal: 24,
  minHeight: 40,
};

export const buttonLarge = {
  paddingVertical: 12,
  paddingHorizontal: 40,
  minHeight: 48,
};

//Текст в кнопке
export const buttonText = (color) => ({
  fontSize: 17,
  lineHeight: 24,
  color: color || colors.white,
  textAlign: 'center',
  alignSelf: 'center',
});

//Controls button. Кнопка, которая состоит из текстового блока посередине и кнопками со стрелками влево/вправо побокам

export const controlsButton = (bgColor) => ({
  ...buttonMedium,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: bgColor,
  borderRadius: 48,
  paddingHorizontal: 16,
});

export const controlsButtonPresentation = (bgColor) => ({
  ...controlsButton(bgColor),
  marginBottom: 0,
});

export const controlsButtonText = (color) => ({
  fontSize: 16,
  lineHeight: 24,
  paddingHorizontal: 16,
  color: color,
});

export const disabledButton = {
  opacity: 0.5,
};

export const helpButton = {
  width: 260,
  justifyContent: 'center',
};
