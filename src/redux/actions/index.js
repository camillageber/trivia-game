const addInfo = (gravatarEmail, name) => ({
  type: 'ADD_INFO',
  payload: {
    gravatarEmail,
    name,
  },
});

export default addInfo;
