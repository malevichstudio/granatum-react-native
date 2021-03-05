import { select } from 'redux-saga/effects';
import { navigate } from '../../../utils/RootNavigation';

export default function* follow(nextSheetId) {
  const userId = yield select((state) => state.user.id);
  const session = yield select((state) => state.session.session);

  // Здесь небольшой хак: если объекта leader ещё нет, то это обычно означает,
  // что этот ивент пришёл самому ведущему, когда он обновлил страницу и
  // соответственно, нам не нужно его никуда перекидывать
  if (!session.leader || userId === session.leader.id) {
    return;
  }

  const activeSheetId = yield select((state) => state.session.activeSheetId);

  // Если админ просто обновил страницу в тот момент когда все следующие за ним
  // и так находятся на текущем листе, нет нужды редиректить людей
  if (activeSheetId === nextSheetId) {
    return;
  }
  navigate('Session', {
    sessionId: session.id,
    sheetId: nextSheetId,
  });
}
