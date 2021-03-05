'use strict';

exports.bottom = bottom;
exports.compact = compact;
exports.correctBounds = correctBounds;

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
function bottom(layout) {
  var max = 0,
    bottomY = void 0;
  for (var _i = 0, len = layout.length; _i < len; _i++) {
    bottomY = layout[_i].y + layout[_i].h;
    if (bottomY > max) {
      max = bottomY;
    }
  }
  return max;
}

// Fast path to cloning, since this is monomorphic
function cloneLayoutItem(layoutItem) {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    persistentW: layoutItem.persistentW,
    persistentH: layoutItem.persistentH,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable,
    isBounded: layoutItem.isBounded,
  };
}

/**
 * Given two layout items, check if they collide.
 */
function collides(l1, l2) {
  if (l1.i === l2.i) {
    return false;
  } // same element
  if (l1.x + l1.w <= l2.x) {
    return false;
  } // l1 is left of l2
  if (l1.x >= l2.x + l2.w) {
    return false;
  } // l1 is right of l2
  if (l1.y + l1.h <= l2.y) {
    return false;
  } // l1 is above l2
  if (l1.y >= l2.y + l2.h) {
    return false;
  } // l1 is below l2
  return true; // boxes overlap
}

/**
 * Given a layout, compact it. This involves going down each y coordinate and removing gaps
 * between items.
 *
 * @param  {Array} layout Layout.
 * @param  {Boolean} compactType Whether or not to compact the layout
 *   vertically.
 * @return {Array}       Compacted Layout.
 */
function compact(layout, compactType, cols) {
  // Statics go in the compareWith array right away so items flow around them.
  var compareWith = getStatics(layout);
  // We go through the items by row and column.
  var sorted = sortLayoutItems(layout, compactType);
  // Holding for new items.
  var out = Array(layout.length);

  for (var _i3 = 0, len = sorted.length; _i3 < len; _i3++) {
    var l = cloneLayoutItem(sorted[_i3]);

    // Don't move static elements
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted);

      // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.
      compareWith.push(l);
    }

    // Add to output array to make sure they still come out in the right order.
    out[layout.indexOf(sorted[_i3])] = l;

    // Clear moved flag, if it exists.
    l.moved = false;
  }

  return out;
}

var heightWidth = { x: 'w', y: 'h' };
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */
function resolveCompactionCollision(layout, item, moveToCoord, axis) {
  var sizeProp = heightWidth[axis];
  item[axis] += 1;
  var itemIndex = layout
    .map(function (layoutItem) {
      return layoutItem.i;
    })
    .indexOf(item.i);

  // Go through each item we collide with.
  for (var _i4 = itemIndex + 1; _i4 < layout.length; _i4++) {
    var otherItem = layout[_i4];
    // Ignore static items
    if (otherItem.static) {
      continue;
    }

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.y > item.y + item.h) {
      break;
    }

    if (collides(item, otherItem)) {
      resolveCompactionCollision(
        layout,
        otherItem,
        moveToCoord + item[sizeProp],
        axis,
      );
    }
  }

  item[axis] = moveToCoord;
}

/**
 * Compact an item in the layout.
 */
function compactItem(compareWith, l, compactType, cols, fullLayout) {
  var compactV = compactType === 'vertical';
  var compactH = compactType === 'horizontal';
  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } else if (compactH) {
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element left as far as it can go without colliding.
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x--;
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  var collides = void 0;
  while ((collides = getFirstCollision(compareWith, l))) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, 'x');
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, 'y');
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w;
      l.y++;
    }
  }
  return l;
}

/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */
function correctBounds(layout, bounds) {
  var collidesWith = getStatics(layout);
  for (var _i5 = 0, len = layout.length; _i5 < len; _i5++) {
    var l = layout[_i5];
    // Overflows right
    if (l.x + l.w > bounds.cols) {
      l.x = bounds.cols - l.w;
    }
    // Overflows left
    if (l.x < 0) {
      l.x = 0;
      l.w = bounds.cols;
    }
    if (!l.static) {
      collidesWith.push(l);
    } else {
      // If this is static and collides with other statics, we must move it down.
      // We have to do something nicer than just letting them overlap.
      while (getFirstCollision(collidesWith, l)) {
        l.y++;
      }
    }
  }
  return layout;
}

/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */
function getFirstCollision(layout, layoutItem) {
  for (var _i7 = 0, len = layout.length; _i7 < len; _i7++) {
    if (collides(layout[_i7], layoutItem)) {
      return layout[_i7];
    }
  }
}

/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */
function getStatics(layout) {
  return layout.filter(function (l) {
    return l.static;
  });
}

/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */
function sortLayoutItems(layout, compactType) {
  if (compactType === 'horizontal') {
    return sortLayoutItemsByColRow(layout);
  } else {
    return sortLayoutItemsByRowCol(layout);
  }
}

function sortLayoutItemsByRowCol(layout) {
  return [].concat(layout).sort(function (a, b) {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }
    return -1;
  });
}

function sortLayoutItemsByColRow(layout) {
  return [].concat(layout).sort(function (a, b) {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1;
    }
    return -1;
  });
}
