import React, { memo, useRef, useEffect } from 'react';
import { StyleSheet, View, Keyboard, Animated, Platform } from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import DeviceInfo from 'react-native-device-info';
import { Text } from 'native-base';
import { colorsNames } from 'app/config';
import { selectWidgetContent } from '../../../selectors';
import Sticker from '../../content/Sticker';
import useSessionColors from '../../../../../hooks/useSessionColors';
import useWidgetFontColors from '../../../../../hooks/useWidgetFontColors';
import { selectUserId } from '../../../../App/selectors';
import { selectSessionRole } from '../../../selectors';
import AddStickerButton from './AddStickerButton';
import Controls from './Controls';
import Background from '../../components/Background';
import { changeContentEdited } from '../../../actions';
import Image from './Image';

const getTeamName = (team, author) => {
  if (team) {
    // Если мы на индивидуальном листе, то не показываем имя команды, т.к. оно
    // будет дублировать имя пользователя
    if (team.id === author?.id) {
      return null;
    }
    return team.name;
  }
  return null;
};
const StickersContainer = ({
  id,
  blockType,
  blockId,
  ancestorType,
  resultsFilter,
  backgroundColor,
  withBorder,
  authorType,
  canAddLike,
  imageUrl,
  description,
  name,
  textColor = 0,
  descriptionColor = 0,
  canAddStickers,
  passing,
  backgroundType,
  backgroundImage,
  position,
  scrollTo,
  idx,
  count,
}) => {
  const dispatch = useDispatch();
  const { sessionColors } = useSessionColors();
  const userId = useSelector(selectUserId);
  const role = useSelector(selectSessionRole);
  const content = useSelector(
    (state) =>
      selectWidgetContent(
        state.session.content,
        id,
        resultsFilter,
        ancestorType,
        blockType,
      ),
    shallowEqual,
  );

  const colors = useWidgetFontColors({
    blockId,
    backgroundColor,
    backgroundType,
  });

  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const stickerWrapperRef = useRef(null);
  const stickersPositionRef = useRef({}).current;
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardDidHideSubscribe = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHideHandler,
      );

      return () => {
        keyboardDidHideSubscribe.remove();
      };
    }
  }, []);

  const keyboardDidHideHandler = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const focusedStickerHandler = (stickerId) => {
    dispatch(changeContentEdited(stickerId, true));

    if (Platform.OS === 'ios') {
      BackgroundTimer.start();

      // Делаем с задержкой - бывает новый стикер не успивает пройти рендер
      BackgroundTimer.setTimeout(() => {
        if (id) {
          const sticker = stickersPositionRef[stickerId];

          const y =
            position[blockId]?.y +
            position[blockId]?.height -
            wrapperRef?.current?.height +
            headerRef?.current?.height;

          if (y) {
            scrollTo.scrollTo({
              x: 0,
              y,
              animated: true,
            });
          }

          if (sticker?.y) {
            Animated.timing(shift, {
              toValue: -sticker?.y,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        }
      }, 100);

      BackgroundTimer.stop();
    }
  };

  const titleColor =
    colors.length === 6 ? colors[textColor] : colorsNames[textColor - 1];
  const descColor =
    colors.length === 6
      ? colors[descriptionColor]
      : colorsNames[descriptionColor - 1];

  const color = sessionColors[colors[4]];

  const withName = Boolean(name?.length);
  const withDescription = Boolean(description?.length);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        if (Platform.OS === 'ios') {
          wrapperRef.current = event.nativeEvent.layout;
        }
      }}>
      <Background
        backgroundType={backgroundType}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        style={[
          styles.wrap,
          {
            paddingRight: (count > 1 && idx === count) || count === 1 ? 20 : 10,
            paddingLeft: (count > 1 && idx === 1) || count === 1 ? 20 : 10,
          },
        ]}>
        <View
          onLayout={(event) => {
            if (Platform.OS === 'ios') {
              headerRef.current = event.nativeEvent.layout;
            }
          }}>
          <View style={{ alignItems: 'center' }}>
            {imageUrl && <Image style={styles.image} uri={imageUrl} />}
          </View>
          {withName && (
            <Text
              variantH6
              style={[
                { color: sessionColors[titleColor] || '#ABB0C4' },
                styles.title,
              ]}>
              {name}
            </Text>
          )}
          {withDescription && (
            <Text
              variantBody2
              style={[
                { color: sessionColors[descColor] || '#ABB0C4' },
                styles.desc,
              ]}>
              {description}
            </Text>
          )}
          <Controls
            buttonBg={sessionColors[colors[4]]}
            buttonColor={sessionColors[colors[0]]}
            widgetId={id}
          />
        </View>
        <View
          onLayout={(event) => {
            if (Platform.OS === 'ios') {
              stickerWrapperRef.current = event.nativeEvent.layout;
            }
          }}
          style={[
            withBorder ? styles.withBorder(color) : styles.withoutBorder,
          ]}>
          {content?.map((c, idx) => {
            const authorProps = c.author
              ? {
                  authorName: c.author.name, // eslint-disable-line indent
                  authorId: c.author.id, // eslint-disable-line indent
                } // eslint-disable-line indent
              : {};
            const editorProps = c.editor
              ? {
                  editorId: c.editor.id, // eslint-disable-line indent
                  editorName: c.editor.name, // eslint-disable-line indent
                } // eslint-disable-line indent
              : {};
            return (
              <Animated.View
                style={{
                  transform: [{ translateY: shift }],
                  width: DeviceInfo.isTablet() ? '50%' : '100%',
                }}
                key={idx}
                onLayout={(event) => {
                  stickersPositionRef[c.id] = event?.nativeEvent?.layout;
                }}>
                <Sticker
                  key={c.id}
                  focusedStickerHandler={focusedStickerHandler}
                  blockId={blockId}
                  currentBlockId={blockId}
                  blockType={blockType}
                  id={c.id}
                  edited={c.edited}
                  text={c.text}
                  authorType={authorType}
                  teamName={getTeamName(c.team, c.author)}
                  originalText={c.originalText}
                  originalAuthor={c.originalAuthor}
                  color={c.team ? c.team.color : c.author.color}
                  canAddLike={canAddLike}
                  isLiked={c.isLiked}
                  likesCount={c.likesCount}
                  userId={userId}
                  role={role}
                  passing={passing}
                  {...authorProps}
                  {...editorProps}
                />
              </Animated.View>
            );
          })}
          <AddStickerButton
            passing={passing}
            buttonBg={sessionColors[colors[4]]}
            widgetId={id}
            blockType={blockType}
            canAddStickers={canAddStickers}
            addNewStickerHandler={focusedStickerHandler}
          />
        </View>
      </Background>
    </View>
  );
};

export default memo(StickersContainer);

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 24,
    width: '100%',
  },
  withBorder: (color) => ({
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: color,
    borderRadius: 8,
    paddingBottom: 8,
    paddingTop: 0,
    overflow: 'hidden',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  }),
  withoutBorder: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 0,
  },
  image: { width: '100%', height: 'auto' },
  title: {
    textAlign: 'left',
    marginTop: 16,
    paddingBottom: 0,
    zIndex: 1,
  },
  desc: {
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 1,
    marginTop: 16,
  },
});
