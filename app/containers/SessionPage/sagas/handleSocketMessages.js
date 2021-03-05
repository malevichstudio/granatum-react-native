import { all, call, put, fork } from 'redux-saga/effects';

// import { convertContentIfExist } from 'utils/editor';
import * as sessionActions from '../actions';
import { onlineUserReceive, disconnectUserReceive } from '../actions/user';
import joinTeam from './joinTeam';
import changeDrawingReceiveWithoutUserId from './changeDrawingReceiveWithoutUserId';
import createBlockReceive from './createBlockReceive';
import clonedBlockReceive from './clonedBlockReceive';
import linkedBlockReceive from './linkedBlockReceive';
import removeSheetReceive from './removeSheetReceive';
import toggleFollowModeReceive from './toggleFollowModeReceive';
import deleteCourseReceive from './deleteCourseReceive';
import follow from './follow';
import leaderDisconnected from './leaderDisconnected';
import handleLeaderReturn from './handleLeaderReturn';
import refreshUserPageReceive from './refreshUserPageReceive';
import createThemeReceive from './createThemeReceive';
import updateThemeReceive from './updateThemeReceive';
import updateFontPairReceive from './updateFontPairReceive';
import updateSessionReceive from './updateSessionReceive';
import removeSessionReceive from './removeSessionReceive';
import updateSheetTypeReceive from './updateSheetTypeReceive';
import updateSheetTeamsSetReceive from './updateSheetTeamsSetReceive';
import updateUsersToTeamsReceive from './updateUsersToTeamsReceive';
import userJoinedTeamReceive from './userJoinedTeamReceive';
import joinToCourseUserReceive from './joinToCourseUserReceive';
import leaveFromCourseUserReceive from './leaveFromCourseUserReceive';
import adminInvokedUser from './adminInvokedUser';
import refreshBlocks from './refreshBlocks';
import createTeamReceive from './createTeamReceive';
import removeTeamReceive from './removeTeamReceive';
import updateResultsBlockReceive from './updateResultsBlockReceive';
import sessionStartedReceive from './sessionStartedReceive';
import passingStartedReceive from './passingStartedReceive';

function* handleBlockMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield createBlockReceive(payload.value);
      break;
    case 'deleted':
      yield put(sessionActions.removeBlockReceive(payload.targetId));
      break;
    case 'updated':
      yield put(sessionActions.updateBlockReceive(payload.value));
      break;
    case 'cloned':
      yield clonedBlockReceive(payload.value);
      break;
    case 'moved':
      yield put(sessionActions.sortBlocksReceive(payload.value));
      break;
    case 'layout_updated': {
      const { blockId, ...layouts } = payload.value;
      yield put(sessionActions.changeBlockLayoutReceive(blockId, layouts));
      break;
    }
    case 'linked':
      yield fork(linkedBlockReceive, payload.value);
      break;
    case 'refresh_blocks':
      yield call(refreshBlocks);
      break;
    default:
      break;
  }
}

/**
 * Можно было эту сагу присовокупить к `handleBlockMessages`, но вполне возможно,
 * что в будущем эта логика будет переработана и тогда нам легче будет это
 * отрефакторить. Сейчас виджеты приходят внутри данных по блоку
 * @returns {Generator<*, void, *>}
 */
function* handleResultsBlockMessages(payload) {
  switch (payload.event) {
    case 'updated':
      yield all(
        payload.value.map((value) => fork(updateResultsBlockReceive, value)),
      );
      break;
    default:
      break;
  }
}

function* handleWidgetMessages(payload) {
  switch (payload.event) {
    /**
     * @deprecated
     */
    case 'created': {
      // if we have a `text` widget, we must convert its contentState to
      // Immutable object
      // const widget = convertContentIfExist(payload.value);
      yield put(sessionActions.createWidgetReceive(payload.value));
      break;
    }
    case 'bulk_created': {
      // if we have a `text` widget, we must convert its contentState to
      // Immutable object
      // const widgets = payload.value.map((item) => convertContentIfExist(item));
      yield put(sessionActions.bulkCreateWidgetReceive(payload.value));
      break;
    }
    case 'deleted':
      yield put(sessionActions.removeWidgetReceive(payload.targetId));
      break;
    case 'updated': {
      // const widget = convertContentIfExist(payload.value);
      yield put(sessionActions.updateWidgetReceive(payload.value));
      break;
    }
    case 'likes_updated':
      yield put(sessionActions.sortStickersByLikeReceive(payload.value));
      break;
    // добавление линии в виджет рисовалка
    case 'drawing_updated':
      yield changeDrawingReceiveWithoutUserId(payload.targetId, payload.value);
      break;
    // очистка холста в виджете рисовалка
    case 'drawing_cleared':
      yield put(sessionActions.removeDrawingReceive(payload.targetId));
      break;
    default:
      break;
  }
}

function* handleSheetMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield put(sessionActions.createSheetReceive(payload.value));
      break;
    case 'deleted':
      yield removeSheetReceive(payload.targetId);
      break;
    case 'updated':
      yield put(sessionActions.updateSheetReceive(payload.value));
      break;
    case 'moved':
      yield put(sessionActions.moveSheetReceive(payload));
      break;
    // Тип листа изменён
    case 'sheet_type_updated':
      yield updateSheetTypeReceive(payload.targetId, payload.value);
      break;
    case 'updated_sheet_teamset':
      yield updateSheetTeamsSetReceive(payload.value);
      break;
    // Ведущий переходит на лист, все должны следовать за ним
    case 'come_here':
      yield follow(payload.targetId);
      break;
    default:
      break;
  }
}

function* handleUserContentMessages(payload) {
  switch (payload.event) {
    case 'created':
      // мы обрабатываем этот экшен в вотчере watchCreateContentReceive
      // замедляем его до нескольких одновременных срабатываний
      yield put(sessionActions.createContentReceive(payload.value));
      break;
    case 'updated':
      // мы обрабатываем этот экшен в вотчере watchCreateContentReceive
      // замедляем его до нескольких одновременных срабатываний
      yield put(sessionActions.updateContentReceive(payload.value));
      break;
    case 'deleted':
      yield put(sessionActions.removeContentReceive(payload.targetId));
      break;
    case 'bulk_deleted':
      yield put(sessionActions.removeAllContentReceive(payload.value));
      break;
    case 'moved':
      yield put(
        sessionActions.moveContentReceive(
          payload.targetId,
          payload.value.containerId,
        ),
      );
      break;
    default:
      break;
  }
}

/**
 * Изменения по объекту team внутри сессии. В нём содержатся данные команды
 * пользователя
 * @param payload
 */
function* handleTeamMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield createTeamReceive(payload.value);
      break;
    // переименование команды. В дальнейшем может ещё что-то
    case 'renamed':
      yield put(sessionActions.renameTeamReceive(payload.value));
      break;
    // удаление команды. Приходит только админам
    case 'deleted':
      yield removeTeamReceive(payload.value);
      break;
    // пользователь добавлен в команду. Ивент приходит только админам
    case 'user_join':
      yield userJoinedTeamReceive(
        payload.value.usersToTeams,
        payload.value.teamsetId,
      );
      break;
    // пользователь добавляется в команду. Приходит пользователю
    case 'join':
      yield joinTeam(payload.value);
      break;
    // пользователь отключается от команды. Приходит пользователю
    case 'leave':
      yield put(sessionActions.leaveTeams([payload.targetId]));
      break;
    default:
      break;
  }
}

function* handleSessionMessages(payload) {
  switch (payload.event) {
    case 'updated':
      yield updateSessionReceive(payload.value);
      break;
    // сессия была удалена
    case 'deleted':
      yield fork(removeSessionReceive);
      break;
    // Ведущий включает режим следования
    case 'follow':
      yield toggleFollowModeReceive(payload.value.leader);
      break;
    // Ведущий выключает режим следования
    case 'unfollow':
      yield put(sessionActions.unfollow());
      break;
    // Ведущий каким-то образом ушёл со страницы (закрыл вкладку и т.д.)
    case 'leader_disconnected':
      yield leaderDisconnected();
      break;
    // Ведущий вернулся на страницу (заново открыл браузер или ещё что-то)
    case 'leader_is_back':
      yield handleLeaderReturn();
      break;
    case 'session_start_notification':
      yield fork(sessionStartedReceive, payload.value);
      break;
    // Админ изменил основной тип вещания в сессии
    case 'broadcast_type_changed':
      yield put(
        sessionActions.updateSessionReceive({
          broadcastingType: payload.value.broadcastingType,
        }),
      );
      break;
    // Админ закрепил пользователя в свободном вещании
    case 'pinned_join':
      yield put(sessionActions.pinnedJoinReceive(payload.value));
      break;
    // Админ открепил пользователя в свободном вещании
    case 'pinned_leave':
      yield put(
        sessionActions.pinnedLeaveReceive(
          payload.value.pinnedId,
          payload.value.isSpeaker,
        ),
      );
      break;
    // Ведущего добавили в свободное вещание
    case 'speaker_join':
      yield put(sessionActions.speakerJoinReceive(payload.value));
      break;
    // ведущего отключили от вещания, либо он сам отключился
    case 'speaker_leave':
      yield put(
        sessionActions.speakerLeaveReceive(
          payload.value.speakerId,
          payload.value.isPinned,
        ),
      );
      break;
    case 'passing_started':
      yield fork(passingStartedReceive);
      break;
    default:
      break;
  }
}

/**
 * Ивенты по кастомным темам
 * @param payload
 * @return {IterableIterator<*>}
 */
function* handleSessionThemeMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield createThemeReceive(payload.value);
      break;
    case 'updated':
      yield updateThemeReceive(payload.value);
      break;
    case 'deleted':
      yield put(sessionActions.removeThemeReceive(payload.targetId));
      break;
    default:
      break;
  }
}

function* handleSessionFontPair(payload) {
  switch (payload.event) {
    case 'created':
      yield put(sessionActions.createFontPairsReceive(payload.value));
      break;
    case 'updated':
      yield updateFontPairReceive(payload.value);
      break;
    case 'deleted':
      yield put(sessionActions.removeFontPairsReceive(payload.targetId));
      break;
    default:
      break;
  }
}

function* handleContentsInBlockMessages(payload) {
  switch (payload.event) {
    case 'bulk_deleted':
      yield put(sessionActions.bulkDeletedReceive(payload.value));
      break;
    default:
      break;
  }
}

function* handleCourseMessages(payload) {
  switch (payload.event) {
    case 'deleted':
      yield deleteCourseReceive(payload.targetId);
      break;
    case 'join':
      yield fork(joinToCourseUserReceive, payload.value);
      break;
    case 'leave':
      yield fork(leaveFromCourseUserReceive, payload.value);
      break;
    default:
      break;
  }
}

function* handleTeamSetMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield put(sessionActions.createTeamsSetReceive(payload.value));
      break;
    case 'updated':
      yield put(
        sessionActions.updateTeamsSetReceive(payload.targetId, payload.value),
      );
      break;
    case 'deleted':
      yield put(sessionActions.removeTeamsSetReceive(payload.targetId));
      break;
    default:
      break;
  }
}

function* handleUsersToTeamsMessages(payload) {
  switch (payload.event) {
    case 'updated':
      yield fork(updateUsersToTeamsReceive, payload.targetId, payload.value);
      break;
    default:
      break;
  }
}

function* handleUserMessages(payload) {
  switch (payload.event) {
    case 'refresh':
      yield refreshUserPageReceive();
      break;
    case 'online_in_session':
      yield put(
        sessionActions.changeUserOnline(payload.targetId, payload.value.online),
      );
      break;
    case 'online':
      yield put(onlineUserReceive({ id: payload.targetId, ...payload.value }));
      break;
    case 'disconnect':
      yield put(disconnectUserReceive(payload.value));
      break;
    case 'join':
      yield put(joinToCourseUserReceive(payload.value));
      break;
    case 'leave':
      yield put(leaveFromCourseUserReceive(payload.value));
      break;

    case 'updated':
      yield put(sessionActions.updateRemoteUserReceive(payload.value));
      break;
    default:
      break;
  }
}

function* handleAdminMessages(payload) {
  switch (payload.event) {
    case 'invoked':
      yield adminInvokedUser(payload);
      break;

    default:
      break;
  }
}

function* handleTimerMessages(payload) {
  switch (payload.event) {
    case 'created':
      yield put(
        sessionActions.createTimerReceive(payload.targetId, payload.value),
      );
      break;
    case 'updated':
      yield put(
        sessionActions.updateTimerReceive(payload.targetId, payload.value),
      );
      break;

    default:
      break;
  }
}

export default function* handleSocketMessages({ payload }) {
  switch (payload.target) {
    case 'taskBlock':
    case 'block':
      yield handleBlockMessages(payload);
      break;
    case 'results':
      yield handleResultsBlockMessages(payload);
      break;
    case 'widget':
      yield handleWidgetMessages(payload);
      break;
    case 'sheet':
      yield handleSheetMessages(payload);
      break;
    case 'team':
      yield handleTeamMessages(payload);
      break;
    case 'content':
    case 'sticker':
      yield handleUserContentMessages(payload);
      break;
    case 'session':
      yield handleSessionMessages(payload);
      break;
    case 'sessionTheme':
      yield handleSessionThemeMessages(payload);
      break;
    case 'sessionFontPair':
      yield handleSessionFontPair(payload);
      break;
    case 'content_in_blocks':
      yield handleContentsInBlockMessages(payload);
      break;
    case 'course':
      yield handleCourseMessages(payload);
      break;
    case 'teamSet':
      yield handleTeamSetMessages(payload);
      break;
    case 'users_to_teams':
      yield handleUsersToTeamsMessages(payload);
      break;
    case 'user':
      yield handleUserMessages(payload);
      break;
    case 'admin':
      yield handleAdminMessages(payload);
      break;
    case 'timer':
      yield call(handleTimerMessages, payload);
      break;
    default:
      break;
  }
}
