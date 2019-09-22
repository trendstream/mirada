import { commands } from './commands'
import { State } from './state'
import { buildBuffers } from './imageUtil'

let state: State = null as any

export function getState() {
  return state;
}

export function _setState(s: State) {
  state = s;
}

export function setState(s: Partial<State>) {
  Object.assign(state, s || {});
}

export function getInitialState(): State {
  return {
    ...buildBuffers('test/assets/lenna.jpg'),
    time: 0,
    working: 'Processing...',
    options: {
      command: commands[0].name,
      onMouseMove: false,
      fields: [],
      commands: commands
    }
  };
}


