import { combineReducers } from 'redux';
import room from './room';
import me from './me';
import producers from './producers';
import peers from './peers';
import consumers from './consumers';

const chatReducers = combineReducers({
  room,
  me,
  producers,
  peers,
  consumers,
});

export default chatReducers;
