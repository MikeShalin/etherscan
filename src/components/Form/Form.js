/**
 * Created by mike on 28.03.18.
 */
import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit(this.state);
    this.setState({
      address: '',
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { address } = this.state,
      { submitValue, title } = this.props;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2 className="form__title">{title}</h2>
        <div className="form__container">
          <input
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
            placeholder="Введите адрес кошелька"
            required
          />
          <input type="submit" value={submitValue} className="form__submit" />
        </div>
      </form>
    );
  }
}

export default Form;
