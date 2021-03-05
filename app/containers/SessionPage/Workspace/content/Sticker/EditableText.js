import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Textarea } from 'native-base';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import colors from 'app/theme/variables/colors/defaultColors';
import { updateContent } from '../../../actions';
import messages from '../../../messages';

const EditableText = ({ id, text, edited }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(text || '');
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current._root.focus();
    }
  }, []);

  function handleClickAway() {
    if (edited) {
      dispatch(updateContent(id, { text: value?.trim(), edited: false }));
    }
  }

  function handleChange(valueText) {
    setValue(valueText);
  }

  return (
    <Textarea
      style={styles.root}
      onBlur={handleClickAway}
      bordered
      ref={(ref) => (textareaRef.current = ref)}
      defaultValue={text}
      rowSpan={5}
      // we take into account new lines (not only 1000 characters) here
      rowsMax={40}
      placeholder={intl.formatMessage(messages.enterText)}
      onChangeText={handleChange}
      underline
    />
  );
};

EditableText.propTypes = {
  id: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  root: {
    marginTop: -10,
    fontSize: 15,
    color: colors.textDark,
    marginLeft: -1,
  },
});

export default EditableText;
