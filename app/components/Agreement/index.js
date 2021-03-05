import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import IsResidentModal from './IsResidentModal';
import PdfModal from './PdfModal';

/**
 * This component exposes `isAgree` variable to react-form it can be validated
 * from outside
 *
 * We expose this field to separate component because it is used by several cases:
 * registration, login by invitation link, maybe something else
 * @return {*}
 * @constructor
 */
export default function Agreement({ enter }) {
  const [open, setOpen] = useState(false);
  const [pdfModal, setPdfModal] = useState({
    isOpen: false,
    type: 'en',
  });

  function handlePolicyClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function showPdf(type) {
    setPdfModal({
      isOpen: true,
      type,
    });
  }

  const iAgree = !enter ? messages.iAgree : messages.iAgreeEnter;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text()}>
        <FormattedMessage
          {...iAgree}
          values={{
            policy: (
              <Text onPress={handlePolicyClick} style={styles.text(true)}>
                <FormattedMessage {...messages.policy} />
              </Text>
            ),
          }}
        />
      </Text>
      <IsResidentModal open={open} onClose={handleClose} showPdf={showPdf} />
      <PdfModal
        open={pdfModal.isOpen}
        type={pdfModal.type}
        onClose={() => setPdfModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 80,
  },
  text: (link) => ({
    fontSize: 11,
    color: link ? '#3294E6' : '#000',
  }),
});
