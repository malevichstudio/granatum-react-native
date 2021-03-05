import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import useAvailableColor from 'app/hooks/useAvailableColor';
import { trasformFromDraft } from 'app/utils/strings';
import TextWithStyles from './TextWithStyles';

const TextElement = ({ element, entity, widget, setWidgetHeight }) => {
  const { availableColor } = useAvailableColor(widget);

  const onLayoutChange = (event) => {
    setWidgetHeight(event.nativeEvent.layout.height);
  };

  const hasStyles = element?.inlineStyleRanges?.length > 0;
  const hasLinks = element?.entityRanges?.length > 0;

  const ranges = trasformFromDraft(element?.inlineStyleRanges);

  let splitText = element.text.split('');

  function replaceText({ start, end, style, href, align }) {
    splitText[start] = (
      <TextWithStyles
        onLayoutChange={onLayoutChange}
        text={element.text.substring(start, end)}
        styles={[...style, element?.type]}
        href={href}
        widget={widget}
        align={align}
        listItemIndex={element?.index}
      />
    );

    for (let i = start + 1; i < end; i++) {
      splitText[i] = splitText[i] === ' ' && null;
    }
  }

  if (hasStyles) {
    ranges.forEach((range) => {
      const start = range.offset;
      const end = range.offset + range.length;

      const isNeedReplace = range?.style[0] || element?.type !== 'unstyled';

      if (isNeedReplace) {
        replaceText({
          start,
          end,
          style: range?.style,
          align: element?.data?.align,
        });
      }

      element?.entityRanges?.forEach((link) => {
        let currentStyle = [];
        if (link.offset < end && link.offset >= start) {
          currentStyle = range?.style;
        }

        replaceText({
          start: link.offset,
          end: link.offset + link.length,
          style: currentStyle,
          href: entity[link.key]?.data?.url,
          align: element?.data?.align,
        });
      });
    });
  }

  if (hasLinks && !hasStyles) {
    element?.entityRanges?.forEach((link) => {
      replaceText({
        start: link.offset,
        end: link.offset + link.length,
        style: [],
        href: entity[link.key]?.data?.url,
        align: element?.data?.align,
      });
    });
  }

  if (!hasLinks && !hasStyles) {
    return (
      <Wrapper align={element?.data?.align} onLayoutChange={onLayoutChange}>
        <TextWithStyles
          onLayoutChange={onLayoutChange}
          text={element?.text}
          styles={[element?.type]}
          widget={widget}
          align={element?.data?.align}
          listItemIndex={element?.index}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper align={element?.data?.align} onLayoutChange={onLayoutChange}>
      {splitText.map((content, contentIndex) => {
        if (content === null || content === false) {
          return null;
        }
        return (
          <Text
            key={contentIndex}
            style={{
              color: availableColor,
            }}>
            {content}
          </Text>
        );
      })}
    </Wrapper>
  );
};

export default TextElement;

const Wrapper = ({ align, children, onLayoutChange }) => {
  return (
    <View style={[styles.wrapper, styles[align]]}>
      <Text
        onLayout={onLayoutChange ? onLayoutChange : null}
        style={{ textAlign: align }}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  justify: {
    justifyContent: 'space-between',
  },
});
