//
// Socket.io channels
//

export const getSheetChannel = (sheetId) => `sheet.${sheetId}.event`;

export const getSessionChannel = (sessionId) => `session.${sessionId}.event`;

export const getProjectChannel = (projectId) => `project.${projectId}.event`;

export const getUserSessionChannel = (userId, sessionId) =>
  `user_in_session.${userId}.${sessionId}.event`;

export const getTeamInSheetChannel = (teamId, sheetId) =>
  `team_in_sheet.${teamId}.${sheetId}.event`;

export const getUserInTeamSetChannel = (userId, teamSetId) =>
  `user_in_teamset.${userId}.${teamSetId}.event`;

export const getUserChannel = (userId) => `user.${userId}.event`;

export const getCourseChannel = (courseId) => `course.${courseId}.event`;

export const getTeamChatChannel = (teamId, chatId) =>
  `team_chat.${teamId}.${chatId}.event`;

export const getGlobalAdminChannel = () => 'admin.event';

export const getUserSheetChannel = (userId, sheetId) =>
  `user_in_sheet.${userId}.${sheetId}.event`;

export const getRoleInTargetChannel = (id, role = 'admin') =>
  `role_in_target.${role}.${id}.event`;
