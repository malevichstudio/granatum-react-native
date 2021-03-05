import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Spinner, View } from 'native-base';
import { useSelector } from 'react-redux';
import BlockWrapper from './blocks/BlockWrapper';
import {
  selectActiveSheetId,
  selectSheetLoading,
  selectBlocks,
  selectIsVideoChatOpen,
  selectActiveSheet,
} from '../selectors';
import { VIDEO_CHAT_HEIGHT, CLOSED_VIDEO_CHAT_HEIGHT } from '../constants';
import useSessionColors from '../../../hooks/useSessionColors';

const Workspace = () => {
  const route = useRoute();
  const activeSheetId = useSelector(selectActiveSheetId);
  const activeSheet = useSelector(selectActiveSheet);
  const sheetLoading = useSelector(selectSheetLoading);
  const blocks = useSelector(selectBlocks);
  const isVideoChatOpen = useSelector(selectIsVideoChatOpen);
  const { sessionColors } = useSessionColors();

  const [targetBlockY, setTargetBlockY] = useState(null);
  const scrollViewRef = useRef();
  const blocksPositionRef = useRef({});
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const blockPosition =
      blocksPositionRef?.current &&
      blocksPositionRef?.current[route.params?.blockId];
    let y;

    if (targetBlockY) {
      y = targetBlockY;
      setTargetBlockY(null);
    } else if (route?.params?.isCurrentSheet && blockPosition) {
      y = blockPosition?.y;
    }

    if (y) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y,
        animated: true,
      });
    }
  }, [targetBlockY, route.params?.blockId, route.params?.clickId]);

  const style = {
    ...styles.content,
    paddingTop: isVideoChatOpen ? VIDEO_CHAT_HEIGHT : CLOSED_VIDEO_CHAT_HEIGHT,
  };

  const background = sessionColors[activeSheet?.decoration?.backgroundColor];
  if (background) {
    style.backgroundColor = background;
  }

  return (
    <View style={style}>
      {sheetLoading || !activeSheetId ? (
        <Spinner color="blue" />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={0}
          onScrollEndDrag={(event) => {
            setScrollPosition(event.nativeEvent.contentOffset?.y);
          }}
          onScroll={(event) => {
            setScrollPosition(event.nativeEvent.contentOffset?.y);
          }}
          style={styles.scrollView}>
          {blocks?.map((block) => (
            <View
              key={block.id}
              onLayout={(event) => {
                blocksPositionRef.current[block.id] =
                  event?.nativeEvent?.layout;
                if (route?.params?.blockId === block.id) {
                  setTargetBlockY(event.nativeEvent.layout.y);
                }
              }}>
              <BlockWrapper
                block={block}
                position={blocksPositionRef.current}
                scrollTo={scrollViewRef.current}
                scrollPosition={scrollPosition}
                startFrom={blocksPositionRef?.current[block.id]?.y || 0}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 8,
  },
});

export default Workspace;
