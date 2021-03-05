import React from 'react';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import CheckCircleIcon from 'app/components/icons/CheckCircleIcon';
import SessionLessonIcon from 'app/components/icons/SessionLessonIcon';
import SessionSelfStudyIcon from 'app/components/icons/SessionSelfStudyIcon';
import SessionWebinarIcon from 'app/components/icons/SessionWebinarIcon';
import SessionKnowledgeCheckIcon from 'app/components/icons/SessionKnowledgeCheckIcon';
import variables from 'app/theme/variables/defaultTheme';

const getIcon = (type) => {
  switch (type) {
    case 'LESSON':
      return <SessionLessonIcon />;
    case 'WEBINAR':
      return <SessionWebinarIcon />;
    case 'SELF_STUDY':
      return <SessionSelfStudyIcon />;
    case 'KNOWLEDGE_CHECK':
      return <SessionKnowledgeCheckIcon />;
    default:
      return <SessionLessonIcon />;
  }
};

const SessionIcon = ({ type, style, available, finished = false }) => {
  return (
    <View
      style={[
        style,
        styles.sessionIcon,
        { backgroundColor: variables.primary },
        !available && { backgroundColor: variables.textL1 },
      ]}>
      {finished && (
        <CheckCircleIcon
          style={[
            { backgroundColor: variables.white },
            styles.sessionFinishedLabel,
          ]}
        />
      )}

      {getIcon(type)}
    </View>
  );
};

const styles = StyleSheet.create({
  sessionIcon: {
    borderRadius: 4,
    width: 48,
    height: 48,
  },
  sessionFinishedLabel: {
    position: 'absolute',
    top: -12,
    right: -8,
    zIndex: 1,
    borderRadius: 50,
  },
});

SessionIcon.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  finished: PropTypes.bool,
};

export default SessionIcon;
