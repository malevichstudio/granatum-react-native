//
// dnd constants
//

import DeviceInfo from 'react-native-device-info';

export const DND_NEW_BLOCK = 'DND_NEW_BLOCK';
export const DND_NEW_IMAGE_WIDGET = 'DND_NEW_IMAGE_WIDGET';
export const DND_NEW_YOUTUBE_WIDGET = 'DND_NEW_YOUTUBE_WIDGET';
export const DND_NEW_BUTTON_WIDGET = 'DND_NEW_BUTTON_WIDGET';
export const DND_NEW_TEXT_WIDGET = 'DND_NEW_TEXT_WIDGET';
export const DND_NEW_DRAWING_WIDGET = 'DND_NEW_DRAWING_WIDGET';
export const DND_NEW_GOOGLE_DRIVE_WIDGET = 'DND_NEW_GOOGLE_DRIVE_WIDGET';
export const DND_NEW_TABLE_WIDGET = 'DND_NEW_TABLE_WIDGET';
export const DND_NEW_HEADER_WIDGET = 'DND_NEW_HEADER_WIDGET';
export const DND_NEW_PRESENTATION_WIDGET = 'DND_NEW_PRESENTATION_WIDGET';
export const DND_STICKERS_CONTAINER_WIDGET = 'DND_STICKERS_CONTAINER_WIDGET';
export const DND_USERS_CONTENT_STICKER = 'DND_USERS_CONTENT_STICKER';
export const DND_RESULTS_USERS_CONTENT_STICKER =
  'DND_RESULTS_USERS_CONTENT_STICKER';
// для модалки управления пользователями
export const DND_USER_CHIP = 'DND_USER_CHIP';
export const DND_USERS_BOX = 'DND_USERS_BOX';

//
// Widget and block types, etc
//

export const BLOCK_TYPE = 'BLOCK';
export const TASK_BLOCK_TYPE = 'TASK_BLOCK';
export const RESULTS_BLOCK_TYPE = 'RESULTS_BLOCK';
export const TEST_BLOCK_TYPE = 'TEST_BLOCK';
export const IMAGE_TYPE = 'IMAGE';
export const YOUTUBE_TYPE = 'YOUTUBE';
export const VIDEO_TYPE = 'VIDEO';
export const BUTTON_TYPE = 'BUTTON';
export const TEXT_TYPE = 'TEXT';
export const DRAWING_TYPE = 'DRAWING';
export const HEADER_TYPE = 'HEADER';
export const STICKERS_CONTAINER_TYPE = 'STICKERS_CONTAINER';
export const STICKER_TYPE = 'STICKER';
export const SESSION_FORM_TYPE = 'SESSION_FORM';
export const PRESENTATION_TYPE = 'PRESENTATION';
export const GOOGLE_DRIVE_TYPE = 'GOOGLE_DRIVE';
export const TABLE_TYPE = 'TABLE';
export const INVITE_USERS_TYPE = 'INVITE_USERS';
export const UNIVERSAL_TYPE = 'UNIVERSAL';
export const TEST_HEADER_TYPE = 'TEST_HEADER';
export const TEST_QUESTION_TYPE = 'TEST_QUESTION';
export const TEST_ANSWER_TYPE = 'TEST_ANSWER';
export const PASSING_HISTORY = 'PASSING_HISTORY';
export const SURVEY_BLOCK_TYPE = 'SURVEY_BLOCK';

//
// Adaptive types
//
export const ADAPTIVE_TYPE_DESKTOP = 'DESKTOP';
export const ADAPTIVE_TYPE_TABLET = 'TABLET';
export const ADAPTIVE_TYPE_MOBILE = 'MOBILE';

//
// Sheet types
//
export const SHEET_TYPE_COMMON = 'COMMON';
export const SHEET_TYPE_TEAM = 'TEAM';
export const SHEET_TYPE_PERSONAL = 'PERSONAL';

// chat types
export const VIDEO_CHAT = 'VIDEO_CHAT';
export const CHAT = 'CHAT';

export const WEBINAR_BROADCASTING = 'WEBINAR';
export const FREE_BROADCASTING = 'FREE';

export const CHAT_TYPE_COMMON = SHEET_TYPE_COMMON;
export const CHAT_TYPE_TEAM = SHEET_TYPE_TEAM;
export const CHAT_TYPE_PERSONAL = SHEET_TYPE_PERSONAL;

export const SESSION_CHAT_TYPE = 'SESSION';
export const TEAM_CHAT_TYPE = 'TEAM';

// grid default row height
export const GRID_ROW_HEIGHT = 24;
export const GRID_ROW_MARGIN = 8;
export const GRID_PRESENTATION_ROWS = DeviceInfo.isTablet() ? 32 : 17;

export const COURSE_STATUS_ACTIVE = 'ACTIVE';
export const COURSE_STATUS_COMING = 'COMING';
export const COURSE_STATUS_COMPLETED = 'COMPLETED';
export const COURSE_STATUS_DRAFT = 'DRAFT';
export const COURSE_STATUS_PUBLISHED = 'PUBLISHED';

export const COURSE_TYPE_SYNCHRONOUS = 'SYNC';
export const COURSE_TYPE_ASYNCHRONOUS = 'ASYNC';

// Заочное занятие
export const SESSION_TYPE_ASYNC_LESSON = 'ASYNC_LESSON';
// Очное занятие
export const SESSION_TYPE_SYNC_LESSON = 'SYNC_LESSON';
export const SESSION_TYPE_WEBINAR = 'WEBINAR';
export const SESSION_TYPE_SELF_STUDY = 'SELF_STUDY';
export const SESSION_TYPE_KNOWLEDGE_CHECK = 'KNOWLEDGE_CHECK';

// после того как ведущий начал старт
export const OPENED_SESSION = 'OPEN';
// после завершения недоступна
export const CLOSED_SESSION = 'CLOSE';
// после завершения только просмотр
export const READ_ONLY_SESSION = 'READ_ONLY';
// после завершения можно редактировать
export const EDITABLE_SESSION = 'WRITE';

// editor theming constants
export const FONT_COLOR_ONE = 'FONT_COLOR_ONE';
export const FONT_COLOR_TWO = 'FONT_COLOR_TWO';
export const FONT_COLOR_THREE = 'FONT_COLOR_THREE';
export const FONT_COLOR_FOUR = 'FONT_COLOR_FOUR';
export const FONT_COLOR_FIVE = 'FONT_COLOR_FIVE';

export const FONT_SIZE_14 = 'FONT_SIZE_14';
export const FONT_SIZE_16 = 'FONT_SIZE_16';
export const FONT_SIZE_18 = 'FONT_SIZE_18';
export const FONT_SIZE_20 = 'FONT_SIZE_20';
export const FONT_SIZE_24 = 'FONT_SIZE_24';
export const FONT_SIZE_28 = 'FONT_SIZE_28';
export const FONT_SIZE_32 = 'FONT_SIZE_32';
export const FONT_SIZE_36 = 'FONT_SIZE_36';
export const FONT_SIZE_42 = 'FONT_SIZE_42';
export const FONT_SIZE_48 = 'FONT_SIZE_48';
export const FONT_SIZE_54 = 'FONT_SIZE_54';
export const FONT_SIZE_60 = 'FONT_SIZE_60';

// Text widget text vertical align
export const VERTICAL_ALIGN_TOP = 'VERTICAL_ALIGN_TOP';
export const VERTICAL_ALIGN_BOTTOM = 'VERTICAL_ALIGN_BOTTOM';

export const USER_ROLE_REGULAR = 'USER';
export const USER_ROLE_PROJECT_ADMIN = 'ADMIN';
export const USER_ROLE_GLOBAL_ADMIN = 'GLOBAL_ADMIN';
export const USER_ROLE_PROJECT_OWNER = 'PROJECT_OWNER';

// Block sub types
export const BLOCK_WITH_ONE_STICKERS_CONTAINER =
  'BLOCK_WITH_ONE_STICKERS_CONTAINER';
export const BLOCK_WITH_TWO_STICKERS_CONTAINERS =
  'BLOCK_WITH_TWO_STICKERS_CONTAINERS';
export const BLOCK_WITH_THREE_STICKERS_CONTAINERS =
  'BLOCK_WITH_THREE_STICKERS_CONTAINERS';

export const AUTHOR_USER_TYPE = 'USER';
export const AUTHOR_TEAM_TYPE = 'TEAM';

export const QUESTION_MANY_TO_MANY_TYPE = 'MANY_TO_MANY';
export const QUESTION_CARDS_TYPE = 'CARDS';
export const QUESTION_DETAILED_TYPE = 'DETAILED_ANSWER';

export const TEST_DROP_CARDS_TYPE = 'CARDS';
export const TEST_DROP_CARDS_RESULT_TYPE = 'CARDS_RESULT';

export const TEST_RIGHT_WITH_MARK = 'RIGHT_WITH_MARK';
export const TEST_RIGHT_WITHOUT_MARK = 'RIGHT_WITHOUT_MARK';
export const TEST_WRONG_WITH_MARK = 'WRONG_WITH_MARK';
export const TEST_RIGHT_NONE = 'NONE';

// Types of button widget

export const BUTTON_WIDGET_TYPE_EXTERNAL = 'EXTERNAL';
export const BUTTON_WIDGET_TYPE_BLOCK = 'BLOCK';
