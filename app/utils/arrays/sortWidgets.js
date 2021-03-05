export default function sortWidgets(block, widgets) {
  if (widgets?.length > 0 && block) {
    let data = widgets;
    if (block?.layout?.xs?.length > 1) {
      data = widgets.map((widget) => {
        const element = block.layout.xs.find((el) => el.i === widget.id);
        return { ...widget, orderIndex: element?.y };
      });
    }
    return data.sort(compare);
  }
  return [];
}

function compare(a, b) {
  if (a.orderIndex < b.orderIndex) {
    return -1;
  }
  if (a.orderIndex > b.orderIndex) {
    return 1;
  }
  return 0;
}
