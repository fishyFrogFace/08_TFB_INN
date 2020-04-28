import { connect } from 'react-redux';

export const connectDispatch = mapToDispatch => {
  return connect(null, mapToDispatch);
};
