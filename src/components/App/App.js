import React, { Component } from 'react';
import Form from 'components/Form/';
import PopUp from 'components/PopUp/';
import { walletActions } from 'ducks/wallet';
import {
  addressSelector,
  statusSelector,
  resultSelector,
  errorSelector,
  fetchingSelector,
} from 'ducks/wallet';
import { connect } from 'react-redux';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpShow: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching !== null) this.setState({ popUpShow: true });
  }
  handleSubmit = address => {
    const { requestWallet } = this.props;
    requestWallet(address);
  };
  render() {
    const { result, error } = this.props,
      { popUpShow } = this.state;
    return (
      <div>
        <Form
          submitValue="Проверить"
          title="Проверка eth кошелька на валидность"
          handleSubmit={this.handleSubmit}
        />
        {popUpShow ? <PopUp error={error}>{result}</PopUp> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: addressSelector(state),
    status: statusSelector(state),
    result: resultSelector(state),
    error: errorSelector(state),
    fetching: fetchingSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  const { wallet } = walletActions;
  return {
    requestWallet: address => {
      dispatch(wallet.requestWallet(address));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
