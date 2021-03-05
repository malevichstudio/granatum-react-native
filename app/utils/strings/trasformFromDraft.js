export default function trasformFromDraft(initialStyles) {
  const joinedStyles = [];

  initialStyles.forEach((initialStyle) => {
    let isUnique = false;

    joinedStyles.forEach((joinedStyle, joinedStyleIndex) => {
      if (
        joinedStyle.offset === initialStyle.offset &&
        joinedStyle.length === initialStyle.length &&
        initialStyle.style.indexOf(joinedStyle.style) === -1
      ) {
        isUnique = true;
        joinedStyles[joinedStyleIndex] = {
          ...joinedStyle,
          style: [...joinedStyles[joinedStyleIndex].style, initialStyle.style],
        };
      }
    });

    if (!isUnique) {
      joinedStyles.push({ ...initialStyle, style: [initialStyle.style] });
    }
  });

  return sliceComponents(joinedStyles);
}

function sliceComponents(joinedStyles) {
  // Список компонентов которые будут рендериться
  const result = {
    components: [],
  };
  // Список компонентов которые пересекается со многими другими компонентами
  const deepComponents = [];

  // Если компонент пересекается с каким-то одним добавленым компонентом
  joinedStyles.forEach((joinedItem) => {
    // Результат поиска пересечений компонентов
    const crossing = isCrossing(joinedItem, result.components);

    // Если компонент не пересекается с уже добавленными компонентами - добавляем в список
    if (!crossing?.result) return result.components.push(joinedItem);

    const joinedItemStart = joinedItem?.offset;
    const joinedItemEnd = joinedItem?.offset + joinedItem?.length;

    // Список созданных компонентов
    let slicedComponents = [];

    // Если компонент пересекается с каким-то одним добавленым компонентом
    if (crossing?.count === 1) {
      result.components.forEach((component) => {
        const componentStart = component?.offset;
        const componentEnd = component?.offset + component?.length;

        if (checkSideCrossing(joinedItem, component, 'right')) {
          deleteComponentFromList(result, component);

          for (let i = 0; i < 3; i++) {
            let length = 0;
            let offset = 0;
            let style = [];

            if (i === 0) {
              offset = componentStart;
              length = joinedItemStart - componentStart;
              style = [...component?.style];
            }
            if (i === 1) {
              offset = joinedItemStart;
              length = joinedItem?.length;
              style = [...component?.style, ...joinedItem?.style];
            }
            if (i === 2) {
              offset = joinedItemEnd;
              length = componentEnd - joinedItemEnd;
              style = [...component?.style];
            }

            if (length > 0) {
              slicedComponents.push({ offset, length, style });
            }
          }
        } else if (checkSideCrossing(joinedItem, component, 'left')) {
          deleteComponentFromList(result, component);

          for (let i = 0; i < 3; i++) {
            let length = 0;
            let offset = 0;
            let style = [];

            if (i === 0) {
              offset = componentStart;
              length = joinedItemStart - componentStart;
              style = [...component?.style];
            }
            if (i === 1) {
              offset = joinedItemStart;
              length = componentEnd - joinedItemStart;
              style = [...component?.style, ...joinedItem?.style];
            }
            if (i === 2) {
              offset = joinedItemStart + componentEnd - joinedItemStart;
              length = joinedItem?.length - componentEnd + joinedItemStart;
              style = [...joinedItem?.style];
            }

            if (length > 0) {
              slicedComponents.push({ offset, length, style });
            }
          }
        } else if (checkSideCrossing(joinedItem, component, 'inside')) {
          deleteComponentFromList(result, component);

          for (let i = 0; i < 3; i++) {
            let length = 0;
            let offset = 0;
            let style = [];

            if (i === 0) {
              offset = componentStart;
              length = joinedItemStart - componentStart;
              style = [...component?.style];
            }
            if (i === 1) {
              offset = joinedItemStart;
              length = joinedItem.length;
              style = [...component?.style, ...joinedItem?.style];
            }
            if (i === 2) {
              offset = joinedItemEnd;
              length = componentEnd - joinedItemEnd;
              style = [...component?.style];
            }

            if (length > 0) {
              slicedComponents.push({ offset, length, style });
            }
          }
        } else if (checkSideCrossing(joinedItem, component, 'outside')) {
          deleteComponentFromList(result, component);

          for (let i = 0; i < 3; i++) {
            let length = 0;
            let offset = 0;
            let style = [];

            if (i === 0) {
              offset = joinedItemStart;
              length = componentStart - joinedItemStart - 1;
              style = [...joinedItem?.style];
            }
            if (i === 1) {
              offset = componentStart;
              length = component?.length;
              style = [...component?.style, ...joinedItem?.style];
            }
            if (i === 2) {
              offset = componentEnd + 1;
              length = joinedItemEnd - componentEnd - 1;
              style = [...joinedItem?.style];
            }

            if (length > 0) {
              slicedComponents.push({ offset, length, style });
            }
          }
        }
      });
    }

    result.components = [...result.components, ...slicedComponents];

    // Сохраняем компоненты с множеством пересечений отдельно
    if (crossing?.count > 1) {
      deepComponents.push(joinedItem);
    }
  });

  // Если компонент пересекается со многими добавлеными компонентами
  deepReplacing(result, deepComponents);

  return result.components;
}

function deepReplacing(result, deepComponents) {
  deepComponents.forEach((joinedItem) => {
    const crossing = isCrossing(joinedItem, result.components);

    // Берем первый компонент
    const component = crossing.list[0];
    // Остальные потом
    const elseItems = crossing.list.slice(1);

    // Удаляем компоненты из списка
    crossing.list.forEach((item) => deleteComponentFromList(result, item));

    const joinedItemStart = joinedItem?.offset;
    const joinedItemEnd = joinedItem?.offset + joinedItem?.length;
    const componentStart = component?.offset;
    const componentEnd = component?.offset + component?.length;

    if (checkSideCrossing(joinedItem, component, 'left')) {
      const slicedComponents = [];

      for (let i = 0; i < 3; i++) {
        let length = 0;
        let offset = 0;
        let style = [];

        if (i === 0) {
          offset = componentStart;
          length = joinedItemStart - componentStart;
          style = [...component?.style];
        }
        if (i === 1) {
          offset = joinedItemStart;
          length = componentEnd - joinedItemStart;
          style = [...component?.style, ...joinedItem?.style];
        }
        if (i === 2) {
          offset = componentEnd;
          length = joinedItemEnd - componentEnd;
          style = [...joinedItem?.style];
        }
        if (length > 0) {
          slicedComponents.push({ offset, length, style });
        }
      }

      result.components = [...result.components, ...slicedComponents];
    }
    if (checkSideCrossing(joinedItem, component, 'right')) {
      const slicedComponents = [];

      for (let i = 0; i < 3; i++) {
        let length = 0;
        let offset = 0;
        let style = [];

        if (i === 0) {
          offset = joinedItemStart;
          length = componentStart - joinedItemStart;
          style = [...component?.style];
        }
        if (i === 1) {
          offset = componentStart;
          length = component?.length;
          style = [...component?.style, ...joinedItem?.style];
        }
        if (i === 2) {
          offset = componentEnd;
          length = componentEnd - joinedItemEnd;
          style = [...component?.style];
        }

        if (length > 0) {
          slicedComponents.push({ offset, length, style });
        }
      }

      result.components = [...result.components, ...slicedComponents];
    }
    if (checkSideCrossing(joinedItem, component, 'inside')) {
      const slicedComponents = [];

      for (let i = 0; i < 3; i++) {
        let length = 0;
        let offset = 0;
        let style = [];

        if (i === 0) {
          offset = componentStart;
          length = joinedItemStart - componentStart;
          style = [...component?.style];
        }
        if (i === 1) {
          offset = joinedItemStart;
          length = joinedItem.length;
          style = [...component?.style, ...joinedItem?.style];
        }
        if (i === 2) {
          offset = joinedItemEnd;
          length = componentEnd - joinedItemEnd;
          style = [...component?.style];
        }

        if (length > 0) {
          slicedComponents.push({ offset, length, style });
        }
      }
      result.components = [...result.components, ...slicedComponents];
    }
    if (checkSideCrossing(joinedItem, component, 'outside')) {
      const slicedComponents = [];

      for (let i = 0; i < 3; i++) {
        let length = 0;
        let offset = 0;
        let style = [];

        if (i === 0) {
          offset = joinedItemStart;
          length = componentStart - joinedItemStart;
          style = [...joinedItem?.style];
        }
        if (i === 1) {
          offset = componentStart;
          length = component?.length;
          style = [...component?.style, ...joinedItem?.style];
        }
        if (i === 2) {
          offset = componentEnd;
          length = joinedItemEnd - componentEnd;
          style = [...joinedItem?.style];
        }

        if (length > 0) {
          slicedComponents.push({ offset, length, style });
        }
      }

      result.components = [...result.components, ...slicedComponents];
    }

    const elseComponentsWithManyCrossing = [];

    elseItems.forEach((joinedItem) => {
      const crossing = isCrossing(joinedItem, result.components);

      const joinedItemStart = joinedItem?.offset;
      const joinedItemEnd = joinedItem?.offset + joinedItem?.length;

      if (crossing.count === 1) {
        crossing.list.forEach((component) => {
          const componentStart = component?.offset;
          const componentEnd = component?.offset + component?.length;

          if (checkSideCrossing(joinedItem, component, 'right')) {
            deleteComponentFromList(result, component);
            const slicedComponents = [];

            for (let i = 0; i < 3; i++) {
              let length = 0;
              let offset = 0;
              let style = [];

              if (componentStart === joinedItemStart) {
                if (i === 0) {
                  offset = joinedItemStart;
                  length = joinedItem.length;
                  style = [...component?.style, ...joinedItem?.style];
                }
                if (i === 1) {
                  offset = joinedItemEnd;
                  length = componentEnd - joinedItemEnd;
                  style = [...component?.style];
                }
              } else {
                if (i === 0) {
                  offset = joinedItemStart;
                  length = componentStart - joinedItemStart;
                  style = [...joinedItem?.style];
                }
                if (i === 1) {
                  offset = componentStart;
                  length = component?.length;
                  style = [...component?.style, ...joinedItem?.style];
                }
                if (i === 2) {
                  offset = componentEnd;
                  length = componentEnd - joinedItemEnd;
                  style = [...component?.style];
                }
              }

              if (length > 0) {
                slicedComponents.push({ offset, length, style });
              }
            }

            return (result.components = [
              ...result.components,
              ...slicedComponents,
            ]);
          }
          if (checkSideCrossing(joinedItem, component, 'left')) {
            deleteComponentFromList(result, component);
            const slicedComponents = [];

            for (let i = 0; i < 3; i++) {
              let length = 0;
              let offset = 0;
              let style = [];

              if (componentStart === joinedItemStart) {
                if (i === 0) {
                  offset = componentStart;
                  length = component.length;
                  style = [...component?.style, ...joinedItem?.style];
                }
                if (i === 1) {
                  offset = componentEnd;
                  length = joinedItemEnd - componentEnd;
                  style = [...joinedItem?.style];
                }
              } else {
                if (i === 0) {
                  offset = componentStart;
                  length = joinedItemStart - componentStart;
                  style = [...component?.style];
                }
                if (i === 1) {
                  offset = joinedItemStart;
                  length = componentEnd - joinedItemStart;
                  style = [...component?.style, ...joinedItem?.style];
                }
                if (i === 2) {
                  offset = joinedItemStart + componentEnd - joinedItemStart;
                  length = joinedItem?.length - componentEnd + joinedItemStart;
                  style = [...joinedItem?.style];
                }
              }

              if (length > 0) {
                slicedComponents.push({ offset, length, style });
              }
            }

            return (result.components = [
              ...result.components,
              ...slicedComponents,
            ]);
          }
          if (checkSideCrossing(joinedItem, component, 'inside')) {
            deleteComponentFromList(result, component);
            const slicedComponents = [];

            for (let i = 0; i < 3; i++) {
              let length = 0;
              let offset = 0;
              let style = [];

              if (i === 0) {
                offset = componentStart;
                length = joinedItemStart - componentStart;
                style = [...component?.style];
              }
              if (i === 1) {
                offset = joinedItemStart;
                length = joinedItem.length;
                style = [...component?.style, ...joinedItem?.style];
              }
              if (i === 2) {
                offset = joinedItemEnd;
                length = componentEnd - joinedItemEnd;
                style = [...component?.style];
              }

              if (length > 0) {
                slicedComponents.push({ offset, length, style });
              }
            }

            return (result.components = [
              ...result.components,
              ...slicedComponents,
            ]);
          }
          if (checkSideCrossing(joinedItem, component, 'outside')) {
            deleteComponentFromList(result, component);
            const slicedComponents = [];

            for (let i = 0; i < 3; i++) {
              let length = 0;
              let offset = 0;
              let style = [];

              if (i === 0) {
                offset = joinedItemStart;
                length = componentStart - joinedItemStart - 1;
                style = [...joinedItem?.style];
              }
              if (i === 1) {
                offset = componentStart;
                length = component?.length;
                style = [...component?.style, ...joinedItem?.style];
              }
              if (i === 2) {
                offset = componentEnd + 1;
                length = joinedItemEnd - componentEnd - 1;
                style = [...joinedItem?.style];
              }

              if (length > 0) {
                slicedComponents.push({ offset, length, style });
              }
            }

            return (result.components = [
              ...result.components,
              ...slicedComponents,
            ]);
          }
        });
      }

      if (crossing.count > 1) {
        elseComponentsWithManyCrossing.push(joinedItem);
      }
    });
  });
}

// Проверяем в какой стороне было пересечение компонентов
function checkSideCrossing(joinedItem, component, side) {
  const joinedItemStart = joinedItem?.offset;
  const joinedItemEnd = joinedItem?.offset + joinedItem?.length;
  const componentStart = component?.offset;
  const componentEnd = component?.offset + component?.length;

  // Пересечение в правой стороне
  if (side === 'right') {
    return (
      joinedItemStart <= componentStart &&
      joinedItemEnd > componentStart &&
      joinedItemEnd <= componentEnd
      // joinedItemStart <= componentStart &&
      // joinedItemEnd >= componentStart &&
      // joinedItemEnd <= componentEnd
    );
  }
  // Пересечение в левой стороне
  if (side === 'left') {
    return (
      joinedItemStart < componentEnd &&
      componentEnd <= joinedItemEnd &&
      joinedItemStart >= componentStart
      // joinedItemStart <= componentEnd &&
      // componentEnd <= joinedItemEnd &&
      // joinedItemStart >= componentStart
    );
  }
  // Пересечение внутри
  if (side === 'inside') {
    return joinedItemStart >= componentStart && joinedItemEnd <= componentEnd;
  }
  // Пересечение снаружи
  if (side === 'outside') {
    return joinedItemStart <= componentStart && joinedItemEnd >= componentEnd;
  }
}

// Проверить было ли пересечение и сохраняем информацию о нем
function isCrossing(joinedItem, components) {
  let result = false;
  let count = 0;
  const list = [];

  components.forEach((component) => {
    if (checkSideCrossing(joinedItem, component, 'right')) {
      result = true;
      if (!isAdded(list, component)) {
        count++;
        list.push(component);
      }
    }
    if (checkSideCrossing(joinedItem, component, 'left')) {
      result = true;
      if (!isAdded(list, component)) {
        count++;
        list.push(component);
      }
    }
    if (checkSideCrossing(joinedItem, component, 'inside')) {
      result = true;
      if (!isAdded(list, component)) {
        count++;
        list.push(component);
      }
    }
    if (checkSideCrossing(joinedItem, component, 'outside')) {
      result = true;
      if (!isAdded(list, component)) {
        count++;
        list.push(component);
      }
    }
  });

  return {
    result,
    count,
    list,
  };
}

// Проверить был ли компонент уже добавлен в список
function isAdded(list, item) {
  return list.find(
    (el) => el.offset === item.offset && el.length === item.length,
  );
}

// Удалить компонент из списка
function deleteComponentFromList(result, component) {
  const index = result.components.findIndex(
    (el) => el.offset === component.offset && el.length === component.length,
  );
  result.components = result.components.filter((_, idx) => index !== idx);
}
