import * as types from '../constants';

export const getSession = (payload) => ({
  type: types.GET_SESSION_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getSessionSuccess = ({ payload, meta }) => ({
  type: types.GET_SESSION_SUCCESS,
  payload,
  meta,
});

export const enterSession = (sessionId, sheetId) => ({
  type: types.ENTER_SESSION,
  sessionId,
  sheetId,
});

export const mediaSwitchedEvent = () => ({
  type: types.MEDIA_SWITCHED_EVENT_REQUEST,
});

export const enterSheet = (sheetId) => ({
  type: types.ENTER_SHEET,
  sheetId,
});

export const enterSheetComplete = () => ({
  type: types.ENTER_SHEET_COMPLETE,
});

export const getSheets = (payload) => ({
  type: types.GET_SHEETS_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getSheetsSuccess = ({ payload, meta }) => ({
  type: types.GET_SHEETS_SUCCESS,
  payload,
  meta,
});

export const getSheet = (payload) => ({
  type: types.GET_SHEET_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getSheetSuccess = ({ payload, meta }) => ({
  type: types.GET_SHEET_SUCCESS,
  payload,
  meta,
});

export const setActiveSheetId = (sheetId) => ({
  type: types.SET_ACTIVE_SHEET_ID,
  sheetId,
});

export const leaveSheet = (sheetId) => ({ type: types.LEAVE_SHEET, sheetId });

export const leaveSession = (sessionId) => ({
  type: types.LEAVE_SESSION,
  sessionId,
});

export const finishStopScreenSharingRequest = () => ({
  type: types.FINISH_STOP_SCREEN_SHARING_REQUEST,
});

export const disableBroadcast = (payload) => ({
  type: types.DISABLE_BROADCAST_REQUEST,
  payload,
});

export const togglePinnedUser = (userId) => ({
  type: types.TOGGLE_PINNED_USER_REQUEST,
  userId,
});

export const toggleSpeaker = (userId) => ({
  type: types.TOGGLE_SPEAKER_REQUEST,
  userId,
});

export const leaveSheetComplete = (sheetId) => ({
  type: types.LEAVE_SHEET_COMPLETE,
  sheetId,
});

export const getWidgetsSuccess = (payload) => ({
  type: types.GET_SHEET_WIDGETS_SUCCESS,
  payload,
});

export const getBlocksSuccess = (payload) => ({
  type: types.GET_BLOCKS_SUCCESS,
  payload,
});

export const getSheetContentSuccess = (payload) => ({
  type: types.GET_SHEET_USERS_CONTENT_SUCCESS,
  payload,
});

export const flushSelectedTeam = () => ({
  type: types.FLUSH_SELECTED_TEAM,
});

export const getTimersSuccess = (timers) => ({
  type: types.GET_TIMERS_SUCCESS,
  timers,
});

export const updateTeamReceive = (payload) => ({
  type: types.UPDATE_TEAM_RECEIVE,
  payload,
});

export const changeDrawingReceive = (id, payload) => ({
  type: types.CHANGE_DRAWING_RECEIVE,
  id,
  payload,
});

export const createBlockReceive = (payload) => ({
  type: types.CREATE_BLOCK_RECEIVE,
  payload,
});

export const bulkCreateWidgetReceive = (payload) => ({
  type: types.BULK_CREATE_WIDGET_RECEIVE,
  payload,
});

export const updateBlockReceive = (payload) => ({
  type: types.UPDATE_BLOCK_RECEIVE,
  payload,
});

export const cloneContentReceive = (content) => ({
  type: types.CLONE_USERS_CONTENT_RECEIVE,
  content,
});

export const cloneWidgetsReceive = (widgets) => ({
  type: types.CLONE_WIDGETS_RECEIVE,
  widgets,
});

export const linkedBlockReceive = (payload) => ({
  type: types.LINKED_BLOCK_RECEIVE,
  payload,
});

export const removeSheetReceive = (sheetId) => ({
  type: types.REMOVE_SHEET_RECEIVE,
  sheetId,
});

export const updateSessionReceive = (payload) => ({
  type: types.UPDATE_SESSION_RECEIVE,
  payload,
});

export const createThemeReceive = (theme) => ({
  type: types.CREATE_THEME_RECEIVE,
  theme,
});

export const updateThemeReceive = (id, palette) => ({
  type: types.UPDATE_THEME_RECEIVE,
  id,
  palette,
});

export const updateFontPairsReceive = (pair) => ({
  type: types.UPDATE_FONT_PAIRS_RECEIVE,
  pair,
});

export const leaveTeams = (ids) => ({
  type: types.LEAVE_TEAMS,
  ids,
});

export const flushTeamRelatedBlocks = (teamId) => ({
  type: types.FLUSH_TEAM_RELATED_BLOCKS,
  teamId,
});

export const updateSheetReceive = (payload) => ({
  type: types.UPDATE_SHEET_RECEIVE,
  payload,
});

export const selectTeams = (ids, skipRefetchContent = false) => ({
  type: types.SELECT_TEAMS,
  ids,
  skipRefetchContent,
});

export const flushContent = () => ({ type: types.FLUSH_USERS_CONTENT });

export const selectChatsWithTeam = (id) => ({
  type: types.SELECT_CHATS_WITH_TEAM,
  id,
});

export const updateUsersToTeams = (payload) => ({
  type: types.UPDATE_USERS_TO_TEAMS_RECEIVE,
  payload,
});

export const addUsersToTeamsReceive = (usersToTeams) => ({
  type: types.ADD_USERS_TO_TEAMS_RECEIVE,
  usersToTeams,
});

export const flushBlocks = () => ({
  type: types.FLUSH_BLOCKS,
});

export const createTeamReceive = (teamsSetId, payload) => ({
  type: types.CREATE_TEAM_RECEIVE,
  teamsSetId,
  payload,
});

export const removeTeamReceive = (teamId, teamsSetId) => ({
  type: types.REMOVE_TEAM_RECEIVE,
  teamId,
  teamsSetId,
});

export const removeBlockReceive = (blockId) => ({
  type: types.REMOVE_BLOCK_RECEIVE,
  blockId,
});

export const sortBlocksReceive = (payload) => ({
  type: types.SORT_BLOCKS_RECEIVE,
  payload,
});

export const createWidgetReceive = (payload) => ({
  type: types.CREATE_WIDGET_RECEIVE,
  payload,
});

export const removeWidgetReceive = (widgetId) => ({
  type: types.REMOVE_WIDGET_RECEIVE,
  widgetId,
});

export const updateWidgetReceive = (payload) => ({
  type: types.UPDATE_WIDGET_RECEIVE,
  payload,
});

export const sortStickersByLikeReceive = (payload) => ({
  type: types.SORT_STICKER_BY_LIKE_RECEIVE,
  payload,
});

export const removeDrawingReceive = (payload) => ({
  type: types.REMOVE_DRAWING_RECEIVE,
  payload,
});

export const createSheetReceive = (payload) => ({
  type: types.CREATE_SHEET_RECEIVE,
  payload,
});

export const moveSheetReceive = (payload) => ({
  type: types.SORT_SHEETS_RECEIVE,
  payload,
});

export const createContentReceive = (payload) => ({
  type: types.CREATE_USERS_CONTENT_RECEIVE,
  payload,
});

export const createContentSuccess = (payload, meta) => ({
  type: types.CREATE_USERS_CONTENT_SUCCESS,
  payload,
  meta,
});

export const updateContentSuccess = (payload) => ({
  type: types.UPDATE_USERS_CONTENT_SUCCESS,
  payload,
});

export const updateContentReceive = (payload) => ({
  type: types.UPDATE_USERS_CONTENT_RECEIVE,
  payload,
});

export const removeContentReceive = (contentId) => ({
  type: types.REMOVE_USERS_CONTENT_RECEIVE,
  contentId,
});

export const removeAllContentReceive = (contentIds) => ({
  type: types.REMOVE_ALL_USER_CONTENT_RECEIVE,
  contentIds,
});

export const moveContent = (contentId, widgetId, blockId) => ({
  type: types.MOVE_USERS_CONTENT_REQUEST,
  contentId,
  widgetId,
  blockId,
});

export const moveContentReceive = (contentId, widgetId) => ({
  type: types.MOVE_USERS_CONTENT_RECEIVE,
  contentId,
  widgetId,
});

export const renameTeamReceive = (payload) => ({
  type: types.RENAME_TEAM_RECEIVE,
  payload,
});

export const unfollow = () => ({ type: types.UNFOLLOW });

export const pinnedJoinReceive = (payload) => ({
  type: types.JOIN_PINNED_USER_RECEIVE,
  payload,
});

export const pinnedLeaveReceive = (pinnedId, isSpeaker) => ({
  type: types.LEAVE_PINNED_USER_RECEIVE,
  pinnedId,
  isSpeaker,
});

export const speakerJoinReceive = (payload) => ({
  type: types.JOIN_SPEAKER_RECEIVE,
  payload,
});

export const speakerLeaveReceive = (speakerId, isPinned) => ({
  type: types.LEAVE_SPEAKER_RECEIVE,
  speakerId,
  isPinned,
});

export const removeThemeReceive = (id) => ({
  type: types.REMOVE_THEME_RECEIVE,
  id,
});

export const createFontPairsReceive = (pair) => ({
  type: types.CREATE_FONT_PAIRS_RECEIVE,
  pair,
});

export const removeFontPairsReceive = (id) => ({
  type: types.REMOVE_FONT_PAIRS_RECEIVE,
  id,
});

export const bulkDeletedReceive = (payload) => ({
  type: types.BULK_DELETE_CONTENT_RECEIVE,
  payload,
});

export const createTeamsSetReceive = (payload) => ({
  type: types.CREATE_TEAMS_SET_RECEIVE,
  payload,
});

export const updateTeamsSetReceive = (id, payload) => ({
  type: types.UPDATE_TEAMS_SET_RECEIVE,
  id,
  payload,
});

export const removeTeamsSetReceive = (teamsSetId) => ({
  type: types.REMOVE_TEAMS_SET_RECEIVE,
  teamsSetId,
});

export const changeUserOnline = (userId, online) => ({
  type: types.CHANGE_USER_ONLINE,
  userId,
  online,
});

export const updateRemoteUserReceive = (payload) => ({
  type: types.UPDATE_REMOTE_USER_RECEIVE,
  payload,
});

export const createTimerReceive = (parentId, payload) => ({
  type: types.CREATE_TIMER_RECEIVE,
  parentId,
  payload,
});

export const updateTimerReceive = (parentId, payload) => ({
  type: types.UPDATE_TIMER_RECEIVE,
  parentId,
  payload,
});

export const setVideoPanelOpen = (open) => ({
  type: types.SET_VIDEO_CHAT_OPEN,
  open,
});

export const changeBlockLayoutReceive = (blockId, layouts) => ({
  type: types.CHANGE_BLOCK_LAYOUT_RECEIVE,
  blockId,
  layouts,
});

export const changeWidgetLayout = (blockId, widgetId, layout) => ({
  type: types.CHANGE_WIDGET_LAYOUT,
  blockId,
  widgetId,
  layout,
});

/**
 * Изменить тип выбора команд: выбиратем все команды, либо какую-то одну
 * @param {boolean} selectAllTeams
 * @returns {{selectAllTeams: boolean, type: string}}
 */
export const changeAllTeamsSelection = (selectAllTeams) => ({
  type: types.CHANGE_ALL_TEAMS_SELECTION,
  selectAllTeams,
});

export const getTeamsSetsSuccess = (teamsSets) => ({
  type: types.GET_TEAMS_SETS_SUCCESS,
  teamsSets,
});

export const addLike = (payload) => ({
  type: types.ADD_LIKE_REQUEST,
  payload,
});

export const changeContentEdited = (contentId, edited) => ({
  type: types.CHANGE_CONTENT_EDITED_REQUEST,
  contentId,
  payload: {
    edited,
  },
});

export const updateContent = (contentId, payload) => ({
  type: types.UPDATE_USERS_CONTENT_REQUEST,
  contentId,
  payload,
});

export const createContent = (containerId, type) => ({
  type: types.CREATE_USERS_CONTENT_REQUEST,
  payload: {
    containerId,
    type,
  },
  meta: { thunk: true },
});

export const sortStickersByLike = (payload) => ({
  type: types.SORT_STICKER_BY_LIKE_REQUEST,
  payload,
});

export const peersToggle = () => ({
  type: types.PEERS_TOGGLE,
});

export const setMoveRemoveStickerId = (id = null) => ({
  type: types.SET_MOVE_REMOVE_STICKER_ID,
  id,
});

export const removeContent = (contentId) => ({
  type: types.REMOVE_USERS_CONTENT_REQUEST,
  contentId,
});
