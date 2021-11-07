const state = {
  all: true,
  active: false,
  completed: false,
};

const setState = (value) => {
  Object.keys(state).forEach(key => {
    state[key] = (key == value) ? true : false;
  })
  return state;
}

const getState = () => {
  return state
}

const getStateValue = () => {
  const [key, value] = Object.entries(state).find(([key, value]) => value);
  return key
}

export {getState, setState, getStateValue}
