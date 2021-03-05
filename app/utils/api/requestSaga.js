import { apply, call, put } from 'redux-saga/effects';
import logger from '../../logger';
import {
  addNotification,
  pushLoading,
  popLoading,
} from '../../containers/App/actions';

import signOut from '../../containers/App/sagas/signOut';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const getErrorMessage = (status) => {
  switch (status) {
    case 204:
      // No Content
      return 'backendError.noContent';
    case 401:
      // Unauthorized
      return 'backendError.unauthorized';
    case 403:
      // Forbidden
      return 'backendError.forbidden';
    case 404:
      // Not found
      return 'backendError.notFound';
    case 500:
    default:
      // Internal server error
      return 'backendError.internalServerError';
  }
};

/**
 *
 * @param endpoint
 * @param {string} failureType - this should be a action request type. We use it to
 * return error when happens
 * @param payload
 * @param {object} meta - это для тех экшенов которые вызваны через Promise
 * @param {object} newOptions
 * @param {boolean} [newOptions.withNotify] - будет выводить уведомление с ошибкой
 * если запрос не прошел
 * @param {boolean} [newOptions.withLoader] - показывать прелоадер или нет
 * @param {number} [attempt] - номер попытки (будет иметь смысл, только если опция
 * `withRetry` передана
 * @return {IterableIterator<*>}
 */
export default function* requestSaga(
  endpoint,
  failureType,
  payload,
  meta,
  newOptions = {},
  attempt = 0,
) {
  const options = {
    withNotify: false,
    withLoader: true,
    /**
     * Если по какой-то причине запрос не будут выполнен, делать ли повторную
     * попытку? Это очень редкий кейс, когда OPTIONS запрос возвращает ошибку.
     * Такое случается, когда бек перезагружаетсяв процессе работы
     *
     * Если вы не ожидаете ответа с JSON'ом, не используйте эту опцию
     */
    withRetry: false,
    ...newOptions,
  };
  let jsonCopy = 'nothing';

  try {
    if (options.withLoader) {
      yield put(pushLoading());
    }

    const response = yield call(endpoint, payload);

    if (response.status === 401) {
      yield call(signOut);
    }

    // extract unparsed JSON string from the response
    const json = yield apply(response, response.text);

    // for some requests no json returned. It is literally "", so it will throw
    // on response.json(), so, we split this into two steps here
    if (typeof json !== 'string' || !json.length) {
      // TODO: we could receive not 200 response here. keep an eye at this block
      return null;
    }
    // если JSON невалидный, мы сможем его вывести в catch
    jsonCopy = json;
    const data = yield call(JSON.parse, json);

    if (typeof data?.error === 'string') {
      // sometimes data.message can be null
      logger.error(
        typeof data.message === 'string' ? data.message : data.error,
      );

      yield put({
        type: failureType,
        payload: data.errors
          ? data.errors.map(({ defaultMessage }) => defaultMessage)
          : [],
        error: { intl: true, message: getErrorMessage(data.status) },
        meta,
      });

      if (options.withNotify && data.message) {
        yield put(
          addNotification({ message: { id: data.message }, type: 'error' }),
        );
      }
    }

    return data;
  } catch (error) {
    logger.error('Request failed:', failureType);
    logger.error('Failed request returned:', jsonCopy);
    logger.error(error.stack);
    yield put({ type: failureType, error, meta });
    // bugsnagClient.notify(new Error(error), event => {
    //   event.addMetadata({
    //     where: failureType,
    //     json: jsonCopy,
    //   });
    // });
  } finally {
    if (options.withLoader) {
      yield put(popLoading());
    }
  }

  // Повтоярем запрос к API до тех пор, пока либо нам невернётся нужный результат,
  // либо кол-во попыток не закончится.
  if (options.withRetry && attempt <= 10) {
    logger.warn({ endpoint }, `An attempt #${attempt} failed`);
    // ждём пол секунды перед следующей попыткой
    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }
    const delay = (time) =>
      new Promise((resolve) => BackgroundTimer.setTimeout(resolve, time));
    yield call(delay, 500);
    if (Platform.OS === 'ios') {
      BackgroundTimer.stop();
    }
    return yield call(
      requestSaga,
      endpoint,
      failureType,
      payload,
      meta,
      newOptions,
      attempt + 1,
    );
  }

  return null;
}
