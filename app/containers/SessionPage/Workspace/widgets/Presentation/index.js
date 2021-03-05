import React, { useEffect, useState, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'native-base';
import Pdf from 'react-native-pdf';
import { FormattedMessage } from 'react-intl';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import useSessionColors from 'app/hooks/useSessionColors';
import ChevronLeftIcon from 'app/components/icons/ChevronLeftIcon';
import ChevronRightIcon from 'app/components/icons/ChevronRightIcon';
import FullScreenIcon from 'app/components/icons/FullScreenIcon';
import PresentationWidgetPlaceholder from 'app/components/icons/PresentationWidgetPlaceholder';
import {
  controlsButtonPresentation,
  controlsButtonText,
} from 'app/styles/buttons';
import colors from 'app/theme/variables/colors/defaultColors';
import { GRID_ROW_MARGIN, GRID_ROW_HEIGHT } from 'app/constants';

import {
  makeSelectPresentaionWidget,
  makeSelectBlock,
  selectActiveBreakpoint,
} from '../../../selectors';
import messages from '../../../messages';
import { changeWidgetLayout } from '../../../actions';
import FullScreenPdf from './FullScreenPdf';

const Presentation = ({ id, blockId }) => {
  const dispatch = useDispatch();
  const selectPresentationWidget = useMemo(
    () => makeSelectPresentaionWidget(id),
    [id],
  );
  const widget = useSelector(selectPresentationWidget);
  const { accentColor } = useSessionColors(widget);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pdfRatio, setPdfRatio] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const selectBlock = useMemo(() => makeSelectBlock(blockId), [blockId]);
  const block = useSelector(selectBlock);
  const activeBreakpoint = useSelector(selectActiveBreakpoint);
  const widgetLayout =
    block.layout[activeBreakpoint] &&
    block.layout[activeBreakpoint].find((item) => item.i === id);

  useEffect(() => {
    widget?.enabledSynchronousView && setPageNumber(widget?.currentPage);
  }, [widget?.currentPage, widget?.enabledSynchronousView]);

  const goToNextPage = () => {
    setPageNumber(pageNumber < numberOfPages ? pageNumber + 1 : pageNumber);
  };
  const goToPrevPage = () => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1);

  const source = { uri: widget?.url };

  const isPrevDisabled = pageNumber === 1 || widget?.enabledSynchronousView;
  const isNextDisabled =
    pageNumber >= numberOfPages || widget?.enabledSynchronousView;

  const widgetHeight = Math.round(
    GRID_ROW_HEIGHT * widgetLayout?.h +
      Math.max(0, widgetLayout?.h - 1) * GRID_ROW_MARGIN,
  );

  const pdfHeight = pdfRatio
    ? (Dimensions.get('window').width - 20) * pdfRatio
    : widgetHeight;

  useEffect(() => {
    if (pdfRatio) {
      const wrapHeight = Math.ceil(
        (pdfHeight + 70 + GRID_ROW_MARGIN) /
          (GRID_ROW_HEIGHT + GRID_ROW_MARGIN),
      );

      const h =
        wrapHeight < widgetLayout?.persistentH
          ? widgetLayout?.persistentH
          : wrapHeight;

      dispatch(
        changeWidgetLayout(blockId, id, {
          h,
        }),
      );
    }
  }, [pdfRatio, widgetLayout?.h]);

  if (!widget?.url) {
    return <Placeholder />;
  }

  return (
    <View style={styles.wrapper(pdfHeight)}>
      <FullScreenPdf
        options={{ source, page: pageNumber }}
        open={isFullScreen}
        onClose={() => {
          setIsFullScreen(false);
        }}
      />
      <ReactNativeZoomableView
        style={{ justifyContent: 'flex-start' }}
        maxZoom={1.5}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}>
        <View pointerEvents={'none'}>
          <Pdf
            page={pageNumber}
            spacing={0}
            source={source}
            onLoadComplete={(numberOfPages, path, size) => {
              setPdfRatio(size.height / size.width);
              setNumberOfPages(numberOfPages);
            }}
            style={styles.pdf(pdfHeight)}
          />
        </View>
      </ReactNativeZoomableView>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fullScreen}
        onPress={() => setIsFullScreen(true)}>
        <FullScreenIcon fill={colors.textDark} />
      </TouchableOpacity>
      <View style={controlsButtonPresentation(accentColor)}>
        <TouchableOpacity
          style={isPrevDisabled && styles.disabled}
          disabled={isPrevDisabled}
          onPress={goToPrevPage}>
          <ChevronLeftIcon color={colors.white} width={16} />
        </TouchableOpacity>
        <Text
          semiBold
          style={controlsButtonText(
            colors.white,
          )}>{`${pageNumber} / ${numberOfPages}`}</Text>
        <TouchableOpacity
          style={isNextDisabled && styles.disabled}
          disabled={isNextDisabled}
          onPress={goToNextPage}>
          <ChevronRightIcon color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Presentation);

const Placeholder = () => {
  return (
    <View style={styles.placeholder}>
      <PresentationWidgetPlaceholder />
      <Text semiBold style={styles.placeholderText}>
        <FormattedMessage {...messages.PresentationNotUploaded} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: (height) => ({
    position: 'relative',
    height: height + 60,
    width: Dimensions.get('window').width - 20,
  }),
  pdf: (height) => ({
    height: height,
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'transparent',
  }),
  fullScreen: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  placeholder: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: colors.mainL7,
  },
  placeholderText: {},
});
