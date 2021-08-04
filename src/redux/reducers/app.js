const initialState = {
  loading: false,
  search: "",
  language: "",
  user: "", // search by user/organization
  page: 0, // [1, 2..]
  totalPages: 0, // [1, 2..]
  perPage: 20, // [10, 20.., 100..]
  sort: 'best-match', // [created, updated, pushed, full_name]
  order: 'desc', // [asc, desc]
  repos: [], // [facebook/reactjs, ...]
};

function setAppValue(state, payload) {
  const {key, value} = payload;
  return {...state, [key]: value};
}

export default function reducer(state = initialState, action = '') {
  switch (action.type) {
    case 'SET_APP_VALUE':
      return setAppValue(state, action.payload);
    default:
      return state;
  }
}
