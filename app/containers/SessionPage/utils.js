/**
 * Select proper background for an entity. It could be block or widget
 * @param entity
 * @param {object} theme
 * @return {string|*}
 */
export const getBackground = (entity, theme) => {
  switch (entity.backgroundType) {
    case 'color':
      return ['backgroundColor', theme.session[entity.backgroundColor]];
    case 'image':
      return ['backgroundImage', `url(${entity.backgroundImage})`];
    default:
      return ['backgroundColor', 'inherit'];
  }
};

/**
 * Выбираем того родителя, от цвета которого будет зависить цвет шрифта
 * При этом учитываем, что на каком-то из этапов фоном может быть изображение
 * @param widgetBgType
 * @param widgetBgColor
 * @param blockBgType
 * @param blockBgColor
 * @param sheetBgColor
 * @return {*}
 */
export const findInfluencingColor = (
  widgetBgType,
  widgetBgColor,
  blockBgType,
  blockBgColor,
  sheetBgColor,
) => {
  if (widgetBgType === 'color') {
    return widgetBgColor;
  }
  if (widgetBgType === 'image') {
    return 'image';
  }
  if (blockBgType === 'color') {
    return blockBgColor;
  }
  if (blockBgType === 'image') {
    return 'image';
  }
  return sheetBgColor;
};
