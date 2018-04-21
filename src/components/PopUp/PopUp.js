/**
 * Created by mike on 28.03.18.
 */
import React from 'react';

const PopUp = props => (
  <h2 style={{ color: props.error ? 'red' : '' }}>{props.children}</h2>
);

export default PopUp;
