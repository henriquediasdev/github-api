import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAppValue,
} from 'redux/actionCreators/app';

export function useAppValue(key) {
  return useSelector((state) => state.app[key]);
}

export function useDispatchSetAppValue(key) {
  const dispatch = useDispatch();
  return useCallback(
    (value) => dispatch(setAppValue(key, value)),
    [dispatch, key], // TODO: checar
  );
}
