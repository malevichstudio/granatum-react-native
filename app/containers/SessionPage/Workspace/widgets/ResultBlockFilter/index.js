import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { SHEET_TYPE_TEAM } from 'app/constants';
import { makeSelectBlock } from '../../../selectors';
import messages from '../../../messages';

const ResultBlockFilter = ({ blockId }) => {
  const selectBlock = useMemo(() => makeSelectBlock(blockId), [blockId]);
  const block = useSelector(selectBlock);
  const type =
    block.ancestors[0]?.sheetType === SHEET_TYPE_TEAM ? SHEET_TYPE_TEAM : null;
  const { filter: stringItemNames } = block;
  const isTeamType = type === SHEET_TYPE_TEAM;

  return (
    <View style={styles.wrapper}>
      <Text semiBold>
        <FormattedMessage {...messages.showAnswers} />
        {stringItemNames && ':'}{' '}
        {stringItemNames || (
          <FormattedMessage
            {...messages[
              isTeamType ? 'resultsFilterOfAllTeams' : 'resultsFilterOfAllUsers'
            ]}
          />
        )}
      </Text>
    </View>
  );
};

export default memo(ResultBlockFilter);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    width: '100%',
  },
});
