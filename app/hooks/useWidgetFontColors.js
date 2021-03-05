import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  makeSelectBlockBackgroundColor,
  makeSelectBlockBackgroundType,
  selectActiveSheetBackgroundColor,
} from '../containers/SessionPage/selectors';
import { findInfluencingColor } from '../containers/SessionPage/utils';
import { sessionColorsRelationships } from '../config';

/**
 * Согласно пунктам 3.1, 3.2 и 3.3 кейса 2.19 мы должны делать цвет шрифта
 * виджета зависимым от цвета фона одного из родителей. В данном хуке мы находим
 * того родителя (виджет/блок/лист) от которого будет зависить цвет шрифта
 * и возращаем соответствующие идентификаторы цвета согласно таблице соответствия
 * из пункта 2 "Правила сочетания цветов" того же кейса
 * @param widget
 * @return {string[]|'image'}
 */
export default function useWidgetFontColors(widget) {
  // TODO а что если у нас другой цвет установлен, будет ли на инициализации
  //  новые цвета устанавливаться?

  // Значения по умолчанию вообще никакой роли не играет. Он взято из таблицы
  // для белого фона
  const [colors, setColors] = useState({
    first: 'colorFive',
    second: 'colorThree',
    third: 'colorFour',
    fourth: 'colorFive',
    fifth: 'colorThree',
    sixth: 'colorFive',
  });
  const [image, setImage] = useState(false);

  const activeSheetBackgroundColor = useSelector(
    selectActiveSheetBackgroundColor,
  );
  const blockId = widget.blockId || widget.testId;

  const selectBlockBackgroundColor = useMemo(
    () => makeSelectBlockBackgroundColor(blockId),
    [blockId],
  );
  const blockBackgroundColor = useSelector(selectBlockBackgroundColor);
  const selectBlockBackgroundType = useMemo(
    () => makeSelectBlockBackgroundType(blockId),
    [blockId],
  );
  const blockBackgroundType = useSelector(selectBlockBackgroundType);

  useEffect(() => {
    // Если работать с листом, а затем переместиться на другой, то иногда блок
    // может быть недоступен в момент перемещения (из-за useMemo), хотя виджет
    // и лист ещё в сторе
    if (
      typeof blockBackgroundType !== 'string' &&
      typeof widget.backgroundColor !== 'string' &&
      typeof activeSheetBackgroundColor !== 'string'
    ) {
      return;
    }

    const influencingColor = findInfluencingColor(
      widget.backgroundType,
      widget.backgroundColor,
      blockBackgroundType,
      blockBackgroundColor,
      activeSheetBackgroundColor,
    );

    if (influencingColor === 'image') {
      // Если присутствует картинка в фоне, то мы берём цвета из первого цвета
      setColors({
        first: sessionColorsRelationships.colorOne[0],
        second: sessionColorsRelationships.colorOne[1],
        third: sessionColorsRelationships.colorOne[2],
        fourth: sessionColorsRelationships.colorOne[3],
        fifth: sessionColorsRelationships.colorOne[4],
        sixth: sessionColorsRelationships.colorOne[5],
      });
      setImage(true);
    } else {
      setColors({
        first: sessionColorsRelationships[influencingColor][0],
        second: sessionColorsRelationships[influencingColor][1],
        third: sessionColorsRelationships[influencingColor][2],
        fourth: sessionColorsRelationships[influencingColor][3],
        fifth: sessionColorsRelationships[influencingColor][4],
        sixth: sessionColorsRelationships[influencingColor][5],
      });
      setImage(false);
    }
  }, [
    activeSheetBackgroundColor,
    blockBackgroundColor,
    blockBackgroundType,
    widget.backgroundColor,
    widget.backgroundType,
  ]);

  const resultArray = [
    colors.first,
    colors.second,
    colors.third,
    colors.fourth,
    colors.fifth,
    colors.sixth,
  ];

  if (image) {
    // добавляем один пустой элемент в массив, чтобы его длина была не равна 6
    // потому что у нас везде проверки на длину массива и если равно 6 то только
    // три цвета даём выбирать, а с картинкой на БГ нужно давать все пять цветов
    resultArray.push(null);
  }

  return resultArray;
}
