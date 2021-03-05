import {
  USER_ROLE_GLOBAL_ADMIN,
  USER_ROLE_PROJECT_ADMIN,
  USER_ROLE_PROJECT_OWNER,
} from '../constants';

/**
 * Проверяем админ ли
 * @param {string} role
 * @return {boolean}
 */
export const isSessionAdmin = (role) =>
  role === USER_ROLE_GLOBAL_ADMIN ||
  role === USER_ROLE_PROJECT_ADMIN ||
  role === USER_ROLE_PROJECT_OWNER;
