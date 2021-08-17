import React, { Component } from "react";
import './ToggleSwitch.scss';

class ToggleSwitch extends Component {
    render() {
        return (
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name="toggleSwitch"
                    id="toggleSwitch"
                />
                <label className="toggle-switch-label" htmlFor={this.props.Name}>
                    <span className="toggle-switch-inner" data-yes="Ja" data-no="Nein" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
        );
    }
}

export default ToggleSwitch;
