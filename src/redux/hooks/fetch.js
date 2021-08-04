import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import get from 'redux/actionCreators/fetch';

export function useDispatchGet() {
  const dispatch = useDispatch();
  return useCallback(
    (url) => dispatch(get(url)),
    [dispatch],
  );
}
