import { compact, correctBounds } from './responsiveGridUtils';
import { columns } from 'app/config';

export const layoutCorrect = (initialLayout, breakpoint) => {
  let layout = [];
  if (initialLayout?.length) {
    const layoutItems = initialLayout.map((layoutItem) => ({ ...layoutItem }));
    // эти корректировки я взял с библиотеки react-grid-layout
    // которую мы используем на вебе при формировании лейаута
    layout = correctBounds(layoutItems, { cols: columns[breakpoint] });
    layout = compact(layout, 'vertical', columns[breakpoint]);
  }

  return layout;
};
