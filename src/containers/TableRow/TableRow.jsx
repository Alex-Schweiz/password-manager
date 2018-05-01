import React from 'react';

import { Button, Tooltip } from 'reactstrap';

class tableRow extends React.Component {
  state = {
    hiddenItem: true,
    tooltipIsOpen: false
  };

  revealPassword = () => {
    this.setState({hiddenItem: false})
  };

  toggleTooltip = () => {
    this.setState({
      tooltipIsOpen: !this.state.tooltipIsOpen
    })
  };

  render() {
    const starPlacement = <div>
      <span onClick={this.revealPassword}>*</span>
      <Tooltip placement="top" isOpen={this.state.tooltipIsOpen} target={`tooltip-${this.props.number}`} toggle={this.toggleTooltip}>
        Click "*" to reveal a password
      </Tooltip>
    </div>;
    return (
      <tr>
        <th>{this.props.number + 1}</th>
        <td>{this.props.singlePassword.target}</td>
        <td>
          <p
            id={`tooltip-${this.props.number}`}>
            {this.state.hiddenItem ? starPlacement : this.props.singlePassword.password}
          </p>
        </td>
        <td>{this.props.singlePassword.description}</td>
        <td className="d-flex justify-content-around">
          <Button
            color="primary"
            onClick={() => this.props.handleEditMode(this.props.singlePassword)}
          >Edit</Button>{' '}
          <Button
            color="danger"
            onClick={() => this.props.handleDeletePassword(this.props.singlePassword.id)}
          >Delete</Button>
        </td>
      </tr>
    )
  }
};

export default tableRow;