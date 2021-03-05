import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectActiveSheet } from 'containers/Session/selectors';
import { sessionColorsRelationships } from 'config';
import { findInfluencingColor } from 'containers/Session/utils';

// Это более лёгкая версия хука `useWidgetFontColors`. Её нужно использовать там,
// где у нас нет виджетов
export default function useSheetColors(backgroundType, backgroundColor) {
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

  const sheet = useSelector(selectActiveSheet);

  useEffect(() => {
    // Если работать с листом, а затем переместиться на другой, то иногда блок
    // может быть недоступен в момент перемещения (из-за useMemo), хотя виджет
    // и лист ещё в сторе
    if (typeof sheet === 'undefined') {
      return;
    }

    const influencingColor = findInfluencingColor(
      null,
      null,
      backgroundType,
      backgroundColor,
      sheet.decoration.backgroundColor,
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
    } else {
      setColors({
        first: sessionColorsRelationships[influencingColor][0],
        second: sessionColorsRelationships[influencingColor][1],
        third: sessionColorsRelationships[influencingColor][2],
        fourth: sessionColorsRelationships[influencingColor][3],
        fifth: sessionColorsRelationships[influencingColor][4],
        sixth: sessionColorsRelationships[influencingColor][5],
      });
    }
  }, [backgroundColor, backgroundType, sheet?.decoration.backgroundColor]);

  return [
    colors.first,
    colors.second,
    colors.third,
    colors.fourth,
    colors.fifth,
    colors.sixth,
  ];
}
