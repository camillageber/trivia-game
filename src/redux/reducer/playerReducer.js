const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 'número de acertos',
  score: 0,
  gravatarEmail: 'email' };

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_INFO':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
