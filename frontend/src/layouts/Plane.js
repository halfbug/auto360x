import React, { Component } from 'react'

export default class Plane extends Component {
    render() {
        return (
            <div>
            {this.props.children}
            </div>
        )
    }
}
