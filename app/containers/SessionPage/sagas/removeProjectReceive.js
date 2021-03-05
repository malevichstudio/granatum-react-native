import { select } from 'redux-saga/effects';
import messages from '../messages';
import { addNotification } from '../../App/actions';
import { navigate } from '../../../utils/RootNavigation';

export default function* removeProjectReceive(projectId) {
  // берём id проекта из сессии
  const activeProjectId = yield select(
    (state) => state.session.session.projectId,
  );

  // если человек сейчас внутри проекта, нужно переместить его на страницу проектов
  if (activeProjectId === projectId) {
    addNotification({
      message: messages.projectHasBeenDeleted,
      type: 'warning',
    });
    navigate('Projects');
  }
}
