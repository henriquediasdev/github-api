import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {resetState} from 'redux/actionCreators/index';

export function useResetState() {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(resetState()),
    [dispatch],
  );
}
