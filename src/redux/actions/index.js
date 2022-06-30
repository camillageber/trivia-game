export const addInfo = (gravatarEmail, name) => ({
  type: 'ADD_INFO',
  payload: {
    gravatarEmail,
    name,
  },
});

export const addScore = (score) => ({
  type: 'ADD_SCORE',
  payload: score,
});
