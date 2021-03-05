import produce from 'immer';
import DeviceInfo from 'react-native-device-info';
import * as types from '../constants';
import { TEST_BLOCK_TYPE, SURVEY_BLOCK_TYPE } from '../../../constants';
import { layoutCorrect } from '../../../utils/blocks/blocks';

// The initial state of the App
export const initialState = {
  sheetLoading: false,
  session: {
    activeThemeId: 'default',
    activeFontsId: 'fontPair1',
    fontPairs: [],
    customThemes: [],
    pinned: [],
  },
  isVideoChatOpen: true,
  isPeersOpen: false,
  activeSheetId: undefined,

  /**
   * This is current sheet blocks grid-layout active breakpoint
   * @type {'lg'|'md'|'sm'|'xs'|'xxs'|null}
   */
  activeBreakpoint: DeviceInfo.isTablet() ? 'sm' : 'xs',

  /**
   * id выбранной команды/индивида
   * Эта переменная только для админа и она локальная. В ней находится id той
   * команды/человека на командном/индивидуальном листе, которую в данный момент
   * админ выбрал как в коммуникационной панели
   *
   * Также возможно это поле будет использоваться для id команды текущего
   * пользователя
   * @type {string}
   */
  selectedChatsTeamId: undefined,

  /**
   * Список пользователей курса (без админов курса)
   *
   */
  users: {},

  /**
   * Список всех пользователей курса, включая админов курса
   */
  allUsers: [],

  /**
   * Активная тема сессии
   * @type {string[]}
   * @details кейс 2.19
   */
  fonts: [],

  /**
   * Сначала мы работали просто с массивом `selectedTeamIds`, и понимали, что
   * если в массиве один элемент, то это выбрана одна команда, если больше одного,
   * то должны быть выбраны все.
   *
   * Но тут есть баг: а что если у нас выбрана одна команда, но она пока что
   * единственная команда и если будет создана следующая, то как мы должны её
   * обрабатывать? как ту, что должна попасть в список всех команд, или наоборот
   * админ не хочет её видить сейчас?
   *
   * Таким образом, приходится усложнять логику. Поэтому мы добавляем этот boolean,
   * который отдельно будет давать нам знать, хочет ли админ видить все команды
   * или только одну.
   *
   * И ещё один момент: мы не можем вынести эту логику на сторону бека, т.к. для
   * каждого админа эта настройка индивидуальна
   *
   * @since 2.8.4
   */
  selectAllTeams: true,

  /**
   * Тоже самое что и `selectedChatsTeamId`, только на этот раз той команды,
   * которую админ выбрал в меню листа. Плюс команды может быть выбрано несколько
   * (все), либо одна
   *
   * @type {string[]}
   */
  selectedTeamIds: [],

  /**
   * Команда, в которой состоит пользователь на командном/индивидуальном листе
   *
   * Админ тоже использует этот объект для подключения к чату какой-то из команд.
   * Для него объект не обязательно будет синхронизирован с текущей командой. Это
   * может быть в случае, если он только зашёл и ещё не выбрал коману в чате,
   * либо выбрал другую команду не в чате. Выбор команды в чате и на листе не
   * синхронизируется
   */
  team: {},

  sheets: [],

  /**
   * Block has the following fields:
   * @field {string} backgroundColor
   * @field {string} backgroundImage
   */
  blocks: [],
  /**
   * Используется для отображения заглушки при отсутствии блоков на листе
   * Используем именно loaded, а не loading, т.к при использование второго проходит много времени до начала загрузки.
   */
  isBlocksLoaded: true,

  widgets: [],

  content: [],

  /**
   * Таймеры в блоках
   * структура объекта следующая:
   *
   * {
   *   [blockId]: { ...timer },
   *   [block2Id]: { ...timer2 },
   * }
   */
  timers: {},

  onlineUsers: [],

  sizes: {},

  /**
   * Наборы команд
   * Эти данные интересны только для админов, пользователи их не получат
   */
  teamsSets: [],

  teamsSettingsDialog: {
    /**
     * Поле, которое указывает, отображать или нет, диалог перенастройки команд.
     * Диалог доступен только для ведущему, входящему на командный лист в режиме
     * следования
     *
     * null нужен для того, чтобы показывать, что ведущий зашёл на лист, но состояние
     * ещё не просчиталось
     *
     * @type {boolean|null}
     */
    open: null,
  },

  /**
   * Управление командами
   */
  teamsManagement: {
    /**
     * Состояние модалки: открыта/закрыта
     */
    open: false,
    /**
     * Id текущего листа, на котором идёт настройка команд. Первый раз мы заполняем
     * это поле в момент первого открытия модалки
     */
    sheetId: null,
    /**
     * Список выделенных пользователей. Выделенных пользователей можно перетаскивать
     * между командами
     *
     * Структура: { userId: teamId }
     */
    selected: {},
    /**
     * Операция, которая совершается по отношению к командам. Это может быть "ничего",
     * создание новой команды, редактирование названия текущей команды
     * @type {'create' | string | null}
     */
    teamOperation: null,
    /**
     * Состояние драга.  Нам это нужно, чтобы везде удалять чип пользователя из DOM
     * из любой команды, где бы он не был выделен при массовом драге.
     * В данном случае мы передаём id того пользователя, которого начинают драгать
     * это нужно для того, чтобы в его компоненте, игнорировать эту логику
     */
    draggedUserId: null,
    /**
     * Фильтр по пользователям. Может принимать два значения: отображать всех
     * пользователей, либо только тех, кто онлайн
     * @type {'all' | 'online'}
     */
    filter: 'all',
    /**
     * Список связей пользователей с командой в которую они входит в рамках
     * активного набора
     *
     * Данные хранятся в виде связки `userId: teamId`
     */
    usersToTeams: {},
    /**
     * Это чисто фронтовая структура, которая нам нужна для оптимизации работы
     * с командами. При этом нам нужна и `usersToTeams`, без которой эта структура
     * только замедлит работу.
     *
     * В ней мы просто складываем пользователей подругому:
     * {
     *   team1Id: [user1Id, user2Id],
     *   team2Id: [user3Id, user4Id, user5Id],
     * }
     */
    teamsWithUsers: { unassigned: [] },
  },

  /**
   * Собираем сюда все локальные изменения лейаутов блоков, а потом пушим из по
   * блочно по дэбаунсу. Таким образом уменьшаем количество ререндеров и в идеале
   * это должно помочь избавиться от потерь в изменениях
   */
  layoutsChanges: {},

  /**
   * Этот флаг нужен в качестве хака из-за того, что мы не всегда можем в нужный
   * момент отловить изменение размеров некоторых виджетов. В первую очередь
   * это касается виджета Презентация
   * @type {boolean}
   */
  widgetHasBeenResized: false,
  checkedBlocks: [],

  /**
   * Массив юсеров для фильтра в блоке ответов
   */
  usersForFilter: [],

  /**
   * Массив команд для фильтра в блоке ответов
   */
  teamsForFilter: {},

  questions: [],

  answers: [],

  statistics: {},
  moveRemoveStickerId: null,
};

// сортируем блоки по возрастанию индекса
function compareBlocks(a, b) {
  return a.orderIndex - b.orderIndex;
}

/* eslint-disable default-case, no-param-reassign */
const sessionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_SESSION_SUCCESS:
        draft.session = {
          ...action.payload,
          customThemes: action.payload.customThemes.map((theme) => ({
            id: theme.id,
            palette: {
              colorOne: theme.colorOne,
              colorTwo: theme.colorTwo,
              colorThree: theme.colorThree,
              colorFour: theme.colorFour,
              colorFive: theme.colorFive,
            },
          })),
        };
        break;

      case types.SET_ACTIVE_SHEET_ID:
        draft.activeSheetId = action.sheetId;
        break;

      case types.GET_SHEETS_SUCCESS:
        draft.sheets = action.payload;
        break;

      case types.GET_SHEET_SUCCESS:
        if (state.sheets.length) {
          draft.sheets = state.sheets.map((sheet) => {
            if (sheet.id === action.payload.id) {
              return action.payload;
            }
            return sheet;
          });
        } else {
          // это первый лист, загруженный при заходе на сессию. При этом где-то
          // одновременно с этим запросом выполняется запрос getSheets и в даль-
          // нейшем он перезапишет sheets
          draft.sheets = [action.payload];
        }
        break;
      case types.LEAVE_SESSION:
        Object.keys(initialState).forEach((field) => {
          draft[field] = initialState[field];
        });
        break;
      case types.LEAVE_SHEET_COMPLETE:
        draft.selectAllTeams = initialState.selectAllTeams;
        draft.selectedTeamIds = initialState.selectedTeamIds;
        // Мы не можем очищать команду при смене листа, потому что тогда у нас
        // постоянно перезагружается комната в видео-чате при переходе между
        // КЛ с одной командой
        // draft.team = initialState.team;
        draft.blocks = initialState.blocks;
        draft.widgets = initialState.widgets;
        draft.content = initialState.content;
        draft.sizes = initialState.sizes;
        draft.layoutsChanges = initialState.layoutsChanges;
        draft.questions = initialState.questions;
        draft.questionsPagination = initialState.questions;
        draft.answers = initialState.answers;
        draft.statistics = initialState.statistics;
        draft.checkedBlocks = initialState.checkedBlocks;
        draft.isBlocksLoaded = initialState.isBlocksLoaded;
        draft.teamsSettingsDialog = initialState.teamsSettingsDialog;
        break;
      case types.GET_SHEET_WIDGETS_SUCCESS:
        draft.widgets = state.widgets.concat(
          action.payload.filter(
            ({ id }) => !state.widgets.some((widget) => widget.id === id),
          ),
        );
        break;
      case types.ENTER_SHEET:
        draft.sheetLoading = true;
        break;
      case types.ENTER_SHEET_COMPLETE:
        draft.sheetLoading = false;
        break;
      case types.GET_BLOCKS_SUCCESS: {
        // Накапливаем все виджеты в пачку, чтобы сохранить их один раз
        const allWidgets = [...state.widgets];
        let allContent = [...state.content];
        let answers = [...state.answers];
        draft.blocks = action.payload.map(
          ({ widgets, activeQuestion, ...block }) => {
            if (widgets) {
              widgets.map(({ stickers, ...widget }) => {
                if (!allWidgets.some(({ id }) => id === widget.id)) {
                  allWidgets.push(widget);
                }

                if (stickers) {
                  allContent = allContent.concat(
                    stickers
                      .filter(
                        (sticker) =>
                          !allContent.find((c) => c.id === sticker.id),
                      )
                      .map((sticker) => ({ ...sticker, showOnlyResult: true })),
                  );
                }

                return null;
              });
            }

            if (activeQuestion) {
              draft.questions[activeQuestion.question.id] = {
                ...activeQuestion.question,
                statistics:
                  activeQuestion.statistics || activeQuestion.adminStatistics,
                description: '',
              };

              /* eslint-disable indent */
              answers = answers.concat(
                activeQuestion.answers
                  // Здесь фильтр нужен для того что бы не дублировались одинаковые ответы.
                  .filter(({ id }) => !answers.some((a) => a.id === id))
                  .map((answer) => ({
                    ...answer,
                    description:
                      typeof answer.description !== 'string' &&
                      answer.description
                        ? ''
                        : answer.description,
                  })),
              );
              /* eslint-enable indent */
              return {
                ...block,
                totalElements: activeQuestion.totalElements,
                activeQuestionIndex: activeQuestion.question.orderIndex,
                activeQuestionId: activeQuestion.question.id,
                title: '',
              };
            }

            if (block.title) {
              return {
                ...block,
                title: '',
              };
            }

            return block;
          },
        );

        draft.answers = answers;

        // Если есть новые виджеты, добавляем в draft
        if (allWidgets.length !== state.widgets.length) {
          draft.widgets = allWidgets;
        }

        // Если есть новый контент, добавляем в draft
        if (allContent.length !== state.content.length) {
          draft.content = allContent;
        }

        draft.isBlocksLoaded = false;
        break;
      }
      case types.GET_SHEET_USERS_CONTENT_SUCCESS:
        // эти данные в большем приоритете перед теми, которые уже есть (те,
        // которые пришли внутри блоков ответов), поэтому мы их перезаписываем
        //
        // TODO: а вообще это всё кривая логика и её нужно переделать в рамках
        //  https://granatum.atlassian.net/browse/TASK-2203
        draft.content = state.content
          .filter((c) => !action.payload.some((content) => content.id === c.id))
          .concat(action.payload);
        break;
      case types.FLUSH_SELECTED_TEAM:
        draft.team = initialState.team;
        break;
      case types.GET_TIMERS_SUCCESS:
        draft.timers = action.timers;
        break;
      case types.UPDATE_TEAM_RECEIVE:
        draft.team = {
          ...state.team,
          ...action.payload,
        };
        break;
      case types.CHANGE_DRAWING_REQUEST:
      case types.CHANGE_DRAWING_RECEIVE:
        if (action.payload.line) {
          let currentLines = [];
          let widgetIndex;
          let isNew = true;

          for (let i = 0; i < state.widgets.length; i += 1) {
            if (action.id === state.widgets[i].id) {
              widgetIndex = i;
              // state нельзя модифицировать
              currentLines = [...state.widgets[i].lines];
              break;
            }
          }

          // сдесь мы идём от последней линии. Это нужно для оптимизации
          // последняя линия эта как раз та с которой мы сейчас работаем
          for (let i = currentLines.length - 1; i >= 0; i -= 1) {
            if (
              action.payload.line &&
              currentLines[i].id === action.payload.line.id
            ) {
              currentLines[i] = action.payload.line;
              isNew = false;
              break;
            }
          }

          if (!currentLines.length || isNew) {
            currentLines.push(action.payload.line);
          }

          if (draft.widgets[widgetIndex]) {
            draft.widgets[widgetIndex].lines = currentLines;
          }
        } else if (action.payload.image) {
          for (let i = 0; i < state.widgets.length; i += 1) {
            if (action.id === state.widgets[i].id) {
              draft.widgets[i].image = action.payload.image;
              break;
            }
          }
        }
        break;
      case types.CREATE_BLOCK_RECEIVE: {
        const { widgets, activeQuestion, ...rest } = action.payload;

        if (rest.type === TEST_BLOCK_TYPE || rest.type === SURVEY_BLOCK_TYPE) {
          draft.blocks.push({
            ...rest,
            totalElements: activeQuestion?.totalElements,
            activeQuestionIndex: activeQuestion?.question?.orderIndex,
            // title: EditorState.push(
            //   EditorState.createEmpty(decorator),
            //   convertFromRaw(rest.title),
            // ),
            title: '',
          });

          if (activeQuestion) {
            draft.questions.push({
              ...activeQuestion.question,
              // description: EditorState.push(
              //   EditorState.createEmpty(decorator),
              //   convertFromRaw(activeQuestion.question.description),
              // ),
              description: '',
              statistics: activeQuestion.adminStatistics,
            });
            /* eslint-disable indent */
            draft.answers = state.answers.concat(
              activeQuestion.answers.map((answer) => ({
                ...answer,
                // description:
                //   typeof answer.description !== 'string' && answer.description
                //     ? EditorState.push(
                //         EditorState.createEmpty(decorator),
                //         convertFromRaw(answer.description),
                //       )
                //     : answer.description,
                description: '',
              })),
            );
          }
          /* eslint-enable indent */
        } else {
          // Нам пришлось прибегнуть к сортировки из-за случая, когда админ
          // меняет пользователю вариант и тогда пользователю приходит новый
          // блок с этим вариантом. При этом блок может располагаться где угодно
          // среди блоков. Таким образом, мы должны поставить его на нужное место
          const unsorted = [...state.blocks, rest];
          draft.blocks = unsorted.sort(compareBlocks);
        }

        if (widgets) {
          draft.widgets = state.widgets.concat(
            // widgets.map(convertContentIfExist),
            widgets,
          );
        }
        break;
      }

      case types.BULK_CREATE_WIDGET_RECEIVE:
        draft.widgets = state.widgets.concat(
          action.payload.filter(
            ({ id }) => !state.widgets.some((widget) => widget.id === id),
          ),
        );
        break;

      case types.UPDATE_BLOCK_RECEIVE:
        /* eslint-disable indent */
        draft.blocks = state.blocks.map((block) =>
          block.id === action.payload.id
            ? {
                ...block,
                ...action.payload,
                ...('title' in action.payload
                  ? {
                      // title: action.payload.title
                      //   ? EditorState.push(
                      //       EditorState.createEmpty(decorator),
                      //       convertFromRaw(action.payload.title),
                      //     )
                      //   : null,
                      title: '',
                    }
                  : {}),
              }
            : block,
        );
        /* eslint-enable indent */
        break;

      case types.CLONE_USERS_CONTENT_RECEIVE:
        draft.content = state.content.concat(action.content);
        break;
      case types.CLONE_WIDGETS_RECEIVE:
        draft.widgets = state.widgets.concat(action.widgets);
        break;
      case types.LINKED_BLOCK_RECEIVE: {
        const { widgets, header, universal, ...rest } = action.payload;
        draft.widgets = state.widgets.map((widget) => {
          if (widget.id === header.id) {
            return {
              ...widget,
              ...header,
            };
          }

          return widget;
        });
        // стоит после ^^^, чтобы не перезаписалось
        draft.widgets.push(universal);

        // На проде был баг, что widgets был неопределён
        if (Array.isArray(widgets)) {
          let allContent = [...state.content];

          widgets.map(({ stickers, ...widget }) => {
            if (!state.widgets.some(({ id }) => id === widget.id)) {
              draft.widgets.push(widget);
              if (Array.isArray(stickers)) {
                allContent = allContent.concat(stickers);
              }
            } else if (Array.isArray(stickers)) {
              stickers.map((s) => {
                if (!state.content.some(({ id }) => id === s.id)) {
                  allContent.push(s);
                }
                return null;
              });
            }

            return null;
          });

          // есть новые?
          if (allContent.length !== state.content.length) {
            // сохраняем все стикеры за раз
            draft.content = allContent;
          }
        }

        draft.blocks = state.blocks.map((block) => {
          if (block.id === action.payload.id) {
            return {
              ...block,
              ...rest,
            };
          }

          return block;
        });
        break;
      }
      case types.REMOVE_SHEET_RECEIVE: {
        const index = state.sheets.findIndex(
          (sheet) => sheet.id === action.sheetId,
        );
        if (index !== -1) {
          draft.sheets.splice(index, 1);
        }
        break;
      }
      case types.UPDATE_SESSION_RECEIVE:
        draft.session = {
          ...state.session,
          ...action.payload,

          leader: {
            ...(state.session.leader ? state.session.leader : {}),
            ...(action.payload.leader ? action.payload.leader : {}),
          },
        };
        break;
      case types.CREATE_THEME_RECEIVE:
        draft.session.customThemes.push(action.theme);
        break;
      case types.UPDATE_THEME_RECEIVE:
        draft.session.customThemes = state.session.customThemes.map((theme) =>
          theme.id === action.id
            ? { ...theme, palette: { ...theme.palette, ...action.palette } }
            : theme,
        );
        break;
      case types.UPDATE_FONT_PAIRS_RECEIVE:
        draft.session.fontPairs = state.session.fontPairs.map((pair) =>
          pair.id === action.pair.id ? { ...pair, ...action.pair } : pair,
        );
        break;
      case types.FLUSH_TEAM_RELATED_BLOCKS: {
        const removedBlocks = [];
        const removedWidgets = [];
        draft.blocks = state.blocks.filter((block) => {
          if (block.teamId !== action.teamId) {
            return true;
          }
          removedBlocks.push(block.id);
          return false;
        });
        draft.widgets = state.widgets.filter((widget) => {
          if (removedBlocks.includes(widget.blockId)) {
            removedWidgets.push(widget.id);
            return false;
          }
          return true;
        });
        draft.content = state.content.filter(
          (content) => !removedWidgets.includes(content.containerId),
        );
        break;
      }
      case types.UPDATE_SHEET_RECEIVE:
        draft.sheets = state.sheets.map((sheet) =>
          sheet.id === action.payload.id
            ? { ...sheet, ...action.payload }
            : sheet,
        );
        break;
      case types.FLUSH_USERS_CONTENT:
        draft.content = state.content.filter(({ isResults }) => isResults);
        break;
      case types.SELECT_CHATS_WITH_TEAM: {
        draft.selectedChatsTeamId = action.id;
        // админ не может состоять в команде и ему неприходит объект команды,
        // однако, для того, чтобы видео-чат мог подключить админо к чату команды
        // лучше всего, чтобы он КАК БЫ был в команде. Поэтому мы добавляем
        // выбранный объект из sheet.teams в team
        const index = state.sheets.findIndex(
          (sheet) => sheet.id === state.activeSheetId,
        );
        const activeSheet = state.sheets[index];
        if (activeSheet.teamsetId) {
          const teamsSet = state.teamsSets.find(
            ({ id }) => id === activeSheet.teamsetId,
          );
          if (teamsSet) {
            draft.team = teamsSet.teams.find((team) => team.id === action.id);
          }
        }
        break;
      }
      case types.GET_USERS_TO_TEAMS_SUCCESS:
      case types.UPDATE_USERS_TO_TEAMS_RECEIVE: {
        const teams = {
          ...initialState.teamsManagement.teamsWithUsers,
        };
        Object.keys(action.payload).forEach((userId) => {
          // Смотри, добавлена ли команда в объект
          if (teams[action.payload[userId]]) {
            teams[action.payload[userId]] = [
              ...teams[action.payload[userId]],
              userId,
            ];
          } else {
            teams[action.payload[userId]] = [userId];
          }
        });
        draft.teamsManagement.usersToTeams = action.payload;
        draft.teamsManagement.teamsWithUsers = teams;
        break;
      }
      case types.ADD_USERS_TO_TEAMS_RECEIVE: {
        Object.keys(action.usersToTeams).forEach((userId) => {
          const prevTeamId = state.teamsManagement.usersToTeams[userId];
          const teamId = action.usersToTeams[userId];
          if (draft.teamsManagement.teamsWithUsers[teamId]) {
            draft.teamsManagement.teamsWithUsers[teamId].push(userId);
          } else {
            draft.teamsManagement.teamsWithUsers[teamId] = [userId];
          }

          // Удаляем этого юзера из предыдущей команды
          // Тут должен быть именно draft, потому что мы циклом проходимся и
          // изменяем сам draft ниже и поэтому если тут будет state, то
          // консистентность будет нарушена
          const index = draft.teamsManagement.teamsWithUsers[
            prevTeamId
          ].indexOf(userId);
          if (index !== -1) {
            draft.teamsManagement.teamsWithUsers[prevTeamId].splice(index, 1);
          }
        });

        draft.teamsManagement.usersToTeams = {
          ...state.teamsManagement.usersToTeams,
          ...action.usersToTeams,
        };
        break;
      }

      case types.JOIN_TO_COURSE_USER_RECEIVE: {
        draft.allUsers = state.allUsers.concat(action.payload);

        action.payload.forEach((user) => {
          draft.users[user.id] = user;

          if (user.online) {
            draft.onlineUsers.push(user);
          }
          // мы добавляем пользователя в оба места
          draft.teamsManagement.usersToTeams = {
            ...state.teamsManagement.usersToTeams,
            [user.id]: 'unassigned',
          };
          draft.teamsManagement.teamsWithUsers.unassigned.push(user.id);
        });

        // добавляем нового юзера в нулевой набор для инд. листов
        const index = state.teamsSets.findIndex((teamsSet) => teamsSet.hidden);

        if (index !== -1) {
          draft.teamsSets[index] = {
            ...state.teamsSets[index],

            teams: state.teamsSets[index].teams.concat(
              action.payload.map((user) => ({
                id: user.id,
                name: user.name,
                color: user.color,
                avatar: user.avatar,
              })),
            ),
          };
        }

        break;
      }

      case types.LEAVE_FROM_COURSE_USER_RECEIVE: {
        draft.onlineUsers = state.onlineUsers.filter(
          (user) => !action.payload.includes(user.id),
        );
        draft.allUsers = state.allUsers.filter(
          (user) => !action.payload.includes(user.id),
        );
        action.payload.forEach((id) => {
          const teamId = state.teamsManagement.usersToTeams[id];
          delete draft.teamsManagement.usersToTeams[id];
          delete draft.users[id];

          if (state.teamsManagement.teamsWithUsers[teamId]) {
            const index = state.teamsManagement.teamsWithUsers[teamId].indexOf(
              id,
            );
            if (index !== -1) {
              draft.teamsManagement.teamsWithUsers[teamId].splice(index, 1);
            }
          }
        });
        // нужно удалить пользователей из нулевого набора (инд. листы)
        const index = state.teamsSets.findIndex((teamsSet) => teamsSet.hidden);

        if (index !== -1) {
          draft.teamsSets[index] = {
            ...state.teamsSets[index],

            teams: state.teamsSets[index].teams.filter(
              (userTeam) => !action.payload.includes(userTeam.id),
            ),
          };
        }

        break;
      }

      case types.TOOGLE_WAIT_USER_BY_ADMIN:
        draft.onlineUsers = state.onlineUsers.map((user) =>
          user.id === action.payload.id
            ? { ...user, wait: action.payload.wait }
            : user,
        );
        break;
      case types.FLUSH_BLOCKS:
        draft.blocks = initialState.blocks;
        draft.questions = initialState.questions;
        draft.questionsPagination = initialState.questions;
        draft.answers = initialState.answers;
        break;
      case types.CREATE_TEAM_RECEIVE:
        draft.teamsSets = state.teamsSets.map((teamsSet) =>
          teamsSet.id === action.teamsSetId
            ? { ...teamsSet, teams: [...teamsSet.teams, action.payload] }
            : teamsSet,
        );
        break;
      case types.REMOVE_TEAM_RECEIVE: {
        draft.teamsSets.forEach((teamsSet) => {
          if (teamsSet.id === action.teamsSetId) {
            teamsSet.teams.splice(
              teamsSet.teams.findIndex((team) => team.id === action.teamId),
              1,
            );
          }
        });
        // Если эта команда была в списке выбранных, удаляем её оттуда
        const index = state.selectedTeamIds.indexOf(action.teamId);
        if (index !== -1) {
          draft.selectedTeamIds.splice(index, 1);
        }
        // а также проверяем видео-чат на тоже самое
        if (state.selectedChatsTeamId === action.teamId) {
          draft.selectedChatsTeamId = undefined;
        }

        if (state.team.id === action.teamId) {
          draft.team.name = '';
        }
        break;
      }

      case types.REMOVE_BLOCK_RECEIVE: {
        const index = state.blocks.findIndex(
          (block) => block.id === action.blockId,
        );
        // @since 2.6
        // Теперь, с добалвением вариантов, блока может не быть на листе у
        // конкретного пользоваля, если он в команде и удалён не его вариант
        if (index !== -1) {
          draft.blocks.splice(index, 1);
          // additionally we must clean all widgets and content which belongs to
          // the removed block
          draft.widgets = state.widgets.filter(
            (widget) => widget.blockId !== action.blockId,
          );

          draft.questions = state.questions.filter(
            (question) => question.surveyBlockId !== action.blockId,
          );
        }
        // TODO: remove content too

        break;
      }

      case types.SORT_BLOCKS_RECEIVE: {
        const { blocks } = state;
        draft.blocks = [];
        action.payload.forEach((blockId) => {
          const existentBlock = blocks.find((block) => block.id === blockId);
          // @since 2.7
          // Если админ перемещает блоки, и при этом на листе есть варианты,
          // которых нет у текущего пользователя, то не все блоки удатся найти
          // поэтому пришлось добавить проверку для пользователей
          if (existentBlock) {
            draft.blocks.push(existentBlock);
          }
        });
        break;
      }

      case types.CREATE_WIDGET_RECEIVE:
        draft.widgets.push(action.payload);
        break;
      case types.REMOVE_WIDGET_RECEIVE:
        draft.widgets = state.widgets.filter(
          (widget) => widget.id !== action.widgetId,
        );
        break;
      case types.UPDATE_WIDGET_RECEIVE:
        draft.widgets = state.widgets.map((widget) => {
          if (widget.id === action.payload.id) {
            return {
              ...widget,
              ...action.payload,
              decoration: {
                ...widget.decoration,
                ...(action.payload.decoration ? action.payload.decoration : {}),
              },
            };
          }
          return widget;
        });
        break;
      case types.SORT_STICKER_BY_LIKE_RECEIVE: {
        // достаем id стикеров
        const contentIds = action.payload.map((item) => item.id);
        // убираем сортируемые стикеры
        const stickers = state.content.filter(
          (content) => !contentIds.includes(content.id),
        );
        // вставляем отсортированные на сервере стикеры
        draft.content = stickers.concat(action.payload);
        break;
      }

      case types.REMOVE_DRAWING_RECEIVE: {
        for (let i = 0; i < state.widgets.length; i += 1) {
          if (action.payload === state.widgets[i].id) {
            draft.widgets[i].lines = [];
            draft.widgets[i].image = null;
            break;
          }
        }
        break;
      }
      case types.CREATE_SHEET_RECEIVE:
        draft.sheets.push(action.payload);
        break;
      case types.SORT_SHEETS_RECEIVE: {
        draft.sheets.sort(
          (a, b) =>
            action.payload.value.findIndex((sheetId) => sheetId === a.id) -
            action.payload.value.findIndex((sheetId) => sheetId === b.id),
        );
        const index = state.sheets.findIndex(
          (sheet) => state.activeSheetId === sheet.id,
        );
        if (index !== -1) {
          draft.currentSheetIndex = index;
        }
        break;
      }
      case types.UPDATE_USERS_CONTENT_SUCCESS:
        draft.content = state.content.map((content) =>
          content.id === action.payload.id
            ? { ...content, ...action.payload }
            : content,
        );
        break;
      case types.REMOVE_USERS_CONTENT_RECEIVE:
        draft.content = state.content.filter(
          ({ id }) => id !== action.contentId,
        );
        break;
      case types.REMOVE_ALL_USER_CONTENT_RECEIVE:
        // Оставляем только те, что не в переданном массиве `contentIds`. Это
        // могут быть админские стикеры
        draft.content = state.content.filter(
          (content) => !action.contentIds.includes(content.id),
        );
        break;
      case types.MOVE_USERS_CONTENT_RECEIVE: {
        const index = state.content.findIndex(
          ({ id }) => id === action.contentId,
        );
        if (index !== -1) {
          draft.content[index].containerId = action.widgetId;
        }
        break;
      }
      case types.RENAME_TEAM_RECEIVE: {
        // Это увидят только админы
        draft.teamsSets = state.teamsSets.map((teamsSet) => {
          if (teamsSet.id === action.payload.teamSetId) {
            const teams = teamsSet.teams.map((team) =>
              team.id === action.payload.id
                ? { ...team, ...action.payload }
                : team,
            );

            return { ...teamsSet, teams };
          }

          return teamsSet;
        });

        // Если пользователь находится в команде, то переименовываем его команду
        if (state.team?.id === action.payload.id) {
          draft.team.name = action.payload.name;
        }

        // Если у команды есть стикеры, то их тоже нужно переименовать
        draft.content = state.content.map((content) => {
          if (content.team?.id === action.payload.id) {
            return {
              ...content,
              team: {
                ...content.team,
                name: action.payload.name,
              },
            };
          }
          return content;
        });

        break;
      }
      case types.UNFOLLOW:
        draft.session.followMode = false;
        draft.session.leader = {};
        break;

      case types.JOIN_PINNED_USER_RECEIVE:
        // если пользователь является спикером, мы никуда его не пушим
        if (!action.payload.isSpeaker) {
          draft.session.pinned.push(action.payload);
        } else {
          // мы просто меняем флаг
          draft.session.speaker.isPinned = true;
        }
        break;
      case types.LEAVE_PINNED_USER_RECEIVE: {
        if (action.isSpeaker) {
          draft.session.speaker.isPinned = false;
        } else {
          const index = state.session.pinned.findIndex(
            (user) => user.id === action.pinnedId,
          );
          if (index !== -1) {
            draft.session.pinned.splice(index, 1);
          }
        }
        break;
      }
      case types.JOIN_SPEAKER_RECEIVE:
        // Если спикер до этого был закреплённым, то мы должны удалить его из
        // списка запреплённых, чтобы он не дублировался
        if (action.payload.isPinned) {
          const index = state.session.pinned.findIndex(
            (user) => user.id === action.payload.id,
          );
          if (index !== -1) {
            draft.session.pinned.splice(index, 1);
          }
        }
        draft.session.speaker = action.payload;
        break;
      case types.LEAVE_SPEAKER_RECEIVE:
        if (action.isPinned) {
          if (Array.isArray(state.session.pinned)) {
            draft.session.pinned.push({
              ...state.session.speaker,
              isSpeaker: false,
            });
          } else {
            draft.session.pinned = [state.session.speaker];
          }
        }
        draft.session.speaker = undefined;
        break;
      case types.REMOVE_THEME_RECEIVE: {
        const index = state.session.customThemes.findIndex(
          (theme) => theme.id === action.id,
        );
        if (index !== -1) {
          draft.session.customThemes.splice(index, 1);
        }
        break;
      }
      case types.CREATE_FONT_PAIRS_RECEIVE:
        draft.session.fontPairs.push(action.pair);
        break;
      case types.REMOVE_FONT_PAIRS_RECEIVE: {
        const index = state.session.fontPairs.findIndex(
          (pair) => pair.id === action.id,
        );
        if (index !== -1) {
          draft.session.fontPairs.splice(index, 1);
        }
        break;
      }
      case types.BULK_DELETE_CONTENT_RECEIVE:
        draft.content = state.content.filter(
          (content) => !action.payload.includes(content.id),
        );
        break;
      case types.CREATE_TEAMS_SET_RECEIVE:
        draft.selectedTeamIds = [];
        draft.teamsSets.push(action.payload);
        break;
      case types.UPDATE_TEAMS_SET_RECEIVE:
        draft.teamsSets = state.teamsSets.map((teamsSet) =>
          teamsSet.id === action.id
            ? { ...teamsSet, ...action.payload }
            : teamsSet,
        );
        break;
      case types.REMOVE_TEAMS_SET_RECEIVE: {
        const index = state.teamsSets.findIndex(
          (teamsSet) => teamsSet.id === action.teamsSetId,
        );
        if (index !== -1) {
          draft.teamsSets.splice(index, 1);
        }
        break;
      }

      case types.CHANGE_USER_ONLINE:
        if (state.users[action.userId]) {
          draft.users[action.userId].online = action.online;
        }
        draft.allUsers = state.allUsers.map((user) =>
          user.id === action.userId ? { ...user, online: action.online } : user,
        );
        break;
      case types.UPDATE_REMOTE_USER_RECEIVE: {
        const { id, ...rest } = action.payload;
        const allUsersIndex = state.allUsers.findIndex(
          (user) => user.id === id,
        );

        if (state.users[id]) {
          draft.users[id] = {
            ...state.users[id],
            ...rest,
          };
        }
        if (allUsersIndex !== -1) {
          draft.allUsers[allUsersIndex] = {
            ...state.allUsers[allUsersIndex],
            ...rest,
          };
        }

        break;
      }
      case types.CREATE_TIMER_RECEIVE:
        draft.timers[action.parentId] = action.payload;
        break;
      case types.UPDATE_TIMER_RECEIVE:
        draft.timers[action.parentId] = {
          ...state.timers[action.parentId],
          ...action.payload,
        };
        break;
      case types.SET_VIDEO_CHAT_OPEN:
        draft.isVideoChatOpen = action.open;
        break;
      case types.CHANGE_BLOCK_LAYOUT_RECEIVE: {
        const index = state.blocks.findIndex(
          (block) => block.id === action.blockId,
        );
        Object.keys(action.layouts).forEach((breakpoint) => {
          draft.blocks[index].layout[breakpoint] = layoutCorrect(
            action.layouts[breakpoint],
            breakpoint,
          );
        });
        break;
      }

      case types.CHANGE_WIDGET_LAYOUT: {
        const blockIndex = state.blocks.findIndex(
          (block) => block.id === action.blockId,
        );
        draft.blocks[blockIndex].layout[state.activeBreakpoint] = layoutCorrect(
          draft.blocks[blockIndex].layout[state.activeBreakpoint].map((item) =>
            item.i === action.widgetId ? { ...item, ...action.layout } : item,
          ),
          state.activeBreakpoint,
        );
        break;
      }

      case types.CHANGE_ALL_TEAMS_SELECTION:
        draft.selectAllTeams = action.selectAllTeams;
        break;

      case types.GET_TEAMS_SETS_SUCCESS:
        draft.teamsSets = action.teamsSets;
        break;

      case types.SELECT_TEAMS:
        draft.selectedTeamIds = action.ids;
        break;
      case types.SET_MOVE_REMOVE_STICKER_ID:
        draft.moveRemoveStickerId = action.id;
        break;

      case types.CHANGE_CONTENT_EDITED_REQUEST:
        draft.content = state.content.map((content) => {
          if (content.id === action.id) {
            return {
              ...content,
              edited: action.edited,
            };
          }

          return content;
        });
        break;
      case types.CREATE_USERS_CONTENT_SUCCESS:
        if (!state.content.find(({ id }) => action.payload.id === id)) {
          draft.content.push(action.payload);
        }
        break;
      case types.PEERS_TOGGLE:
        draft.isPeersOpen = !state.isPeersOpen;
        break;
    }
  });

export default sessionReducer;
