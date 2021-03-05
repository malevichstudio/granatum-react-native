import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import memoize from 'memoize-state';
import {
  STICKERS_CONTAINER_TYPE,
  SHEET_TYPE_COMMON,
  TASK_BLOCK_TYPE,
} from 'app/constants';
import {
  makeSelectTaskResultsBlockWidgets,
  selectTeamName,
  selectActiveSheetType,
  selectPassing,
} from '../../../selectors';
import WidgetSelector from './../WidgetSelector';
import WidgetWrapper from './../WidgetWrapper';
import BlockLayout from '../../components/BlockLayout';
import WidgetLayout from '../../components/WidgetLayout';
import StickersContainer from '../../widgets/StickersContainer';
import Background from './../../components/Background';
import TaskBlockHeader from './TaskBlockHeader';
import Timer from '../../../components/Timer';

const extractStickersContainers = memoize((widgets) => {
  const otherWidgets = [];
  const stickerContainers = [];

  for (let i = 0; i < widgets.length; i += 1) {
    if (widgets[i].type === STICKERS_CONTAINER_TYPE) {
      stickerContainers.push(widgets[i]);
    } else {
      otherWidgets.push(widgets[i]);
    }
  }

  return [otherWidgets, stickerContainers];
});

const Block = ({ block, position, scrollTo, scrollPosition, startFrom }) => {
  const selectBlockWidgets = useMemo(
    () => makeSelectTaskResultsBlockWidgets(block.id, block.ancestors[0]),
    [block.id, block.ancestors[0]],
  );
  const blockWidgets = useSelector(selectBlockWidgets, shallowEqual);
  const teamName = useSelector(selectTeamName);
  const sheetType = useSelector(selectActiveSheetType);
  const isSheetCommon = sheetType === SHEET_TYPE_COMMON;
  const [widgets, stickerContainers] = extractStickersContainers(blockWidgets);
  const passing = useSelector(selectPassing);
  const carouselRef = useRef(null);
  const viewHeightRef = useRef(0);
  const topAnim = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(1);

  function getTopPosition() {
    if (scrollPosition <= startFrom) {
      return 0;
    }

    const currentHeight = Number(
      startFrom + viewHeightRef?.current - 50,
    ).toFixed(0);

    if (scrollPosition >= currentHeight) {
      return currentHeight;
    }

    return Number(scrollPosition - startFrom).toFixed(0);
  }

  const onBeforeSnapToItem = (index) => {
    setActive(index + 1);
  };

  const getCarouselAlign = () => {
    if (stickerContainers.length > 1) {
      if (active === 2 && stickerContainers.length > 2) {
        return 'center';
      }

      if (active === 3 || (stickerContainers.length === 2 && active === 2)) {
        return 'end';
      }

      return 'start';
    }

    return 'center';
  };

  React.useEffect(() => {
    Animated.timing(topAnim, {
      toValue: getTopPosition() || 16,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [topAnim, scrollPosition]);

  const showTimer =
    [TASK_BLOCK_TYPE].includes(block.type) && block.useTimer && !passing;

  const renderItem = ({ item, index }) => {
    return (
      <StickersContainer
        idx={index + 1}
        count={stickerContainers.length}
        position={position}
        scrollTo={scrollTo}
        key={item.id}
        id={item.id}
        canAddStickers={block.canAddStickers}
        canAddLike={item.canAddLike}
        blockType={block.type}
        blockId={block.id}
        // TODO resultsFilter - объект, нужно проверить
        // производительность и мемоизацию.
        resultsFilter={block.resultsFilter}
        ancestorType={block.ancestors[0] ? block.ancestors[0].sheetType : null}
        authorType={block.authorType}
        backgroundColor={item.backgroundColor}
        backgroundImage={item.backgroundImage}
        backgroundType={item.backgroundType}
        textColor={item.decoration?.textColor}
        descriptionColor={item.decoration?.descriptionColor}
        imageUrl={item.imageUrl}
        name={item.name}
        description={item.description}
        withBorder={block.withBorder}
        blockSubtype={block.subType}
        passing={passing}
      />
    );
  };

  return (
    <View
      onLayout={(event) => {
        viewHeightRef.current = event?.nativeEvent?.layout?.height;
      }}>
      {showTimer ? (
        <Animated.View style={styles.timer(topAnim)}>
          <Timer parentId={block.id} />
        </Animated.View>
      ) : null}
      <Background
        backgroundType={block?.backgroundType}
        backgroundColor={block?.backgroundColor}
        backgroundImage={block?.backgroundImage}>
        {!isSheetCommon && block.type === TASK_BLOCK_TYPE && (
          <TaskBlockHeader
            blockId={block?.id}
            backgroundType={block?.backgroundType}
            backgroundColor={block?.backgroundColor}
            name={block.name}
            optionName={block.optionName}
            teamName={teamName}
          />
        )}
        <BlockLayout block={block} withoutBg={true}>
          {widgets?.map((widget) => (
            <WidgetLayout
              widget={widget}
              blockLayout={block.layout}
              key={widget.id}>
              <WidgetWrapper widgetId={widget.id} type={widget.type}>
                <WidgetSelector
                  id={widget.id}
                  type={widget.type}
                  blockId={block.id}
                />
              </WidgetWrapper>
            </WidgetLayout>
          ))}
        </BlockLayout>
        <Carousel
          onBeforeSnapToItem={onBeforeSnapToItem}
          activeSlideAlignment={getCarouselAlign()}
          inactiveSlideScale={1}
          layout={'default'}
          ref={carouselRef}
          data={stickerContainers}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={
            stickerContainers.length > 1
              ? Dimensions.get('window').width - 50
              : Dimensions.get('window').width
          }
        />
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: (top) => ({
    position: 'absolute',
    zIndex: 1,
    left: 16,
    top: top || 16,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: '#fff',
    width: 82,
    paddingVertical: 4,
    paddingRight: 12,
    paddingLeft: 14,
    borderRadius: 20,
  }),
});

export default Block;
