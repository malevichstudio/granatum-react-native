/**
 * The session state selectors
 */

import { createSelector } from 'reselect';
import memoize from 'memoize-state';
import { initialState } from './reducers';
import { injectionKeys } from '../../config';

import {
  IMAGE_TYPE,
  TEXT_TYPE,
  PRESENTATION_TYPE,
  VIDEO_TYPE,
  BUTTON_TYPE,
  GOOGLE_DRIVE_TYPE,
  STICKERS_CONTAINER_TYPE,
  SHEET_TYPE_TEAM,
  RESULTS_BLOCK_TYPE,
} from '../../constants';

const selectSessionDomain = (state) =>
  state[injectionKeys.session] || initialState;

export const selectSessionRoot = (state) => state.session || initialState;

export const selectSession = createSelector(
  [selectSessionRoot],
  (session) => session.session,
);

export const selectActiveBreakpoint = createSelector(
  [selectSessionRoot],
  (session) => session.activeBreakpoint,
);

export const selectCourseType = createSelector(
  selectSession,
  (session) => session.courseType,
);

export const selectSessionTimeToStart = createSelector(
  selectSession,
  (session) => session.timeToStart,
);

export const selectMoveRemoveStickerId = createSelector(
  [selectSessionRoot],
  (session) => session.moveRemoveStickerId,
);

export const selectSessionFinished = createSelector(
  selectSession,
  (session) => session.finished,
);

export const selectSessionStarted = createSelector(
  selectSession,
  (session) => session.started,
);

export const makeSelectBlockWidgets = (blockId) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.filter((widget) => widget.blockId === blockId),
  );

export const selectWidgetContent = memoize(
  (content, widgetId, resultsFilter, ancestorType, blockType) =>
    content.filter((c) => {
      if (c.containerId === widgetId) {
        if (c.showOnlyResult && blockType !== RESULTS_BLOCK_TYPE) {
          return false;
        }

        if (
          resultsFilter &&
          resultsFilter.teamIds &&
          ancestorType === SHEET_TYPE_TEAM &&
          resultsFilter.teamIds.length > 0
        ) {
          return resultsFilter.teamIds.includes(c.teamId);
        }

        if (
          resultsFilter &&
          resultsFilter.userIds &&
          resultsFilter.userIds.length > 0
        ) {
          return resultsFilter.userIds.includes(c.author.id);
        }
        return true;
      }
      return false;
    }),
);

export const makeSelectTaskResultsBlockWidgets = (blockId, ancestor) =>
  createSelector(selectSessionDomain, (subState) =>
    subState.widgets.filter(
      (widget) =>
        widget.blockId === blockId ||
        (widget.blockId === (ancestor && ancestor.id) &&
          !ancestor.deleted &&
          widget.type === STICKERS_CONTAINER_TYPE),
    ),
  );

export const makeSelectImageWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === IMAGE_TYPE && widget.id === id,
    ),
  );

export const makeSelectTextWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === TEXT_TYPE && widget.id === id,
    ),
  );

export const makeSelectPresentaionWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === PRESENTATION_TYPE && widget.id === id,
    ),
  );

export const makeSelectYoutubeWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === VIDEO_TYPE && widget.id === id,
    ),
  );

export const makeSelectGoogleDriveWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === GOOGLE_DRIVE_TYPE && widget.id === id,
    ),
  );

export const makeSelectButtonWidget = (id) =>
  createSelector([selectSessionDomain], (subState) =>
    subState.widgets.find(
      (widget) => widget.type === BUTTON_TYPE && widget.id === id,
    ),
  );

export const selectBlocks = createSelector(
  [selectSessionRoot],
  (session) => session.blocks,
);

export const selectWidgets = createSelector(
  [selectSessionRoot],
  (session) => session.widgets,
);

export const selectPassing = createSelector(
  [selectSessionRoot],
  (session) => session.passing,
);

export const selectActiveSheetId = createSelector(
  [selectSessionRoot],
  (session) => session.activeSheetId,
);

export const selectProjectId = createSelector(
  [selectSession],
  (session) => session.projectId,
);

export const selectCourseId = createSelector(
  [selectSession],
  (session) => session.courseId,
);

export const selectIsVideoChatOpen = createSelector(
  [selectSessionRoot],
  (session) => session.isVideoChatOpen,
);

export const selectSheetLoading = createSelector(
  [selectSessionRoot],
  (session) => session.sheetLoading,
);

export const selectTeamsSets = createSelector(
  selectSessionDomain,
  (subState) => subState.teamsSets,
);

export const selectSheets = createSelector(
  [selectSessionRoot],
  (session) => session.sheets,
);

export const selectActiveSheetIndex = createSelector(
  [selectSheets, selectActiveSheetId],
  (sheets, activeSheetId) =>
    sheets.findIndex((sheet) => sheet.id === activeSheetId),
);

/**
 * Select active sheet object
 */
export const selectActiveSheet = createSelector(
  [selectSheets, selectActiveSheetId],
  (sheets, activeSheetId) =>
    sheets.find((sheet) => sheet && sheet.id === activeSheetId),
);

export const selectActiveSheetTeamsSetId = createSelector(
  selectActiveSheet,
  (activeSheet) => (activeSheet ? activeSheet.teamsetId : null),
);

export const selectActiveSheetType = createSelector(
  selectActiveSheet,
  (activeSheet) => (activeSheet ? activeSheet.type : null),
);

export const selectSessionId = createSelector(
  selectSession,
  (session) => session.id,
);

export const selectActiveSessionThemeId = createSelector(
  selectSession,
  (session) => session.activeThemeId || 'default',
);

export const selectCustomThemes = createSelector(
  selectSession,
  (session) => session.customThemes,
);

export const selectCustomTheme = createSelector(
  [selectCustomThemes, selectActiveSessionThemeId],
  (customThemes, activeThemeId) =>
    customThemes.find((theme) => theme.id === activeThemeId) || {},
);

export const selectSessionRole = createSelector(
  selectSession,
  (session) => session.role,
);

export const selectTeam = createSelector(
  selectSessionDomain,
  (subState) => subState.team,
);

export const selectTeamName = createSelector(
  selectSessionDomain,
  (subState) => subState.team?.name,
);

export const selectAllCourseUsers = createSelector(
  selectSessionDomain,
  (session) => session.allUsers,
);

export const selectSpeaker = createSelector(
  selectSession,
  (session) => session.speaker,
);

export const selectWorkspaceHeight = createSelector(
  selectSessionDomain,
  (subState) => subState.height,
);

export const selectTeamId = createSelector(selectTeam, (team) =>
  team ? team.id : null,
);

export const selectDisableBroadcastCam = createSelector(
  selectSession,
  (session) => session.disableBroadcastCam,
);

export const selectDisableBroadcastMic = createSelector(
  selectSession,
  (session) => session.disableBroadcastMic,
);

export const selectInitiator = createSelector(
  selectSession,
  (session) => session.initiator,
);

export const selectAllowUsersToShareScreen = createSelector(
  selectSession,
  (session) => session.allowUsersToShareScreen,
);

export const selectSpeakerId = createSelector(
  selectSpeaker,
  (speaker) => speaker?.id,
);

export const selectPinned = createSelector(
  selectSession,
  (session) => session.pinned,
);

export const selectActiveSheetTeams = createSelector(
  [selectActiveSheetTeamsSetId, selectTeamsSets],
  (teamsSetId, teamsSets) => {
    if (teamsSetId) {
      const teamsSet = teamsSets.find((ts) => ts.id === teamsSetId);
      if (teamsSet) {
        return teamsSet.teams;
      }
    }
    return [];
  },
);

export const makeSelectIsMeSpeaker = (userId) =>
  createSelector(
    selectSpeakerId,
    (speakerId) => typeof speakerId === 'string' && userId === speakerId,
  );

export const makeSelectIsMePinned = (userId) =>
  createSelector(selectPinned, (pinned) =>
    pinned ? pinned.some((user) => user.id === userId) : false,
  );

export const makeSelectIsUserPinned = (userId) =>
  createSelector(selectPinned, (pinned) =>
    pinned.some((user) => userId && user.id === userId),
  );

export const selectActiveThemeId = createSelector(
  [selectSessionRoot],
  (session) => session.session.activeThemeId,
);

export const makeSelectBlock = (id) =>
  createSelector(selectBlocks, (blocksState) =>
    blocksState.find((block) => block.id === id),
  );

export const makeSelectBlockBackgroundColor = (blockId) =>
  createSelector(
    [makeSelectBlock(blockId)],
    (block) => block && block.backgroundColor,
  );

export const makeSelectBlockBackgroundType = (blockId) =>
  createSelector(
    [makeSelectBlock(blockId)],
    (block) => block && block.backgroundType,
  );

export const selectActiveSheetBackgroundColor = createSelector(
  selectActiveSheet,
  (activeSheet) =>
    activeSheet ? activeSheet.decoration.backgroundColor : null,
);

export const selectSelectedTeamIds = createSelector(
  selectSessionDomain,
  (subState) => subState.selectedTeamIds,
);

export const selectTimers = createSelector(
  selectSessionDomain,
  (subState) => subState.timers,
);

export const makeSelectTimer = (parentId) =>
  // Такого не должно быть, что таймера нет, но на всякий случай даём фоллбек
  createSelector(
    selectTimers,
    (timers) => timers[parentId] || { defaultDuration: '0500' },
  );

export const makeSelectSheet = (id) =>
  createSelector(selectSheets, (sheets) =>
    sheets.find((sheet) => sheet.id === id),
  );

export const makeSelectTeamsSet = (teamsSetId) =>
  createSelector(selectTeamsSets, (teamsSets) =>
    teamsSets.find(({ id }) => id === teamsSetId),
  );

export const makeSelectTeamsSetTeams = (teamsSetId) =>
  createSelector(
    makeSelectTeamsSet(teamsSetId),
    (teamsSet) => teamsSet?.teams || [],
  );
export const selectTeamsManagement = createSelector(
  selectSessionDomain,
  (subState) => subState.teamsManagement,
);
export const selectTeamsManagementSheetId = createSelector(
  selectTeamsManagement,
  (teamsManagement) => teamsManagement.sheetId,
);

export const selectActiveTeamsSetId = createSelector(
  [selectTeamsManagementSheetId, selectSheets],
  (sheetId, sheets) => {
    const sheet = sheets.find((s) => s.id === sheetId);
    if (sheet) {
      return sheet.teamsetId;
    }
    return null;
  },
);

export const selectSelectedChatsTeamId = createSelector(
  selectSessionDomain,
  (subState) => subState.selectedChatsTeamId,
);

export const selectSessionFollowMode = createSelector(
  selectSession,
  (session) => session.followMode,
);

export const selectUserIsUnassigned = createSelector(
  [selectTeam, selectActiveSheetType],
  (team, sheetType) =>
    team?.id === 'unassigned' && sheetType === SHEET_TYPE_TEAM,
);

export const selectIsPeersOpen = createSelector(
  [selectSessionRoot],
  (session) => session.isPeersOpen,
);

export const selectSessionBroadcastingType = createSelector(
  selectSession,
  (session) => session.broadcastingType,
);
