export function setAppValue(key, value) {
  return {
    payload: {
      key,
      value,
    },
    type: 'SET_APP_VALUE',
  };
}
