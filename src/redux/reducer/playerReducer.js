const INITIAL_STATE = {
  name: 'Daniel',
  assertions: 'número de acertos',
  score: 0,
  gravatarEmail: 'danielcavalcanti8000@gmail.com' };

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_INFO':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
