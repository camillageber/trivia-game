const getToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((raw) => raw.json())
  .then((data) => data.token);

export default getToken;
