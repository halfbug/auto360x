import React, { Component } from 'react'

class Public extends Component {
    render() {
        return (
            <div>
                the public site
                {this.props.children}
            </div>
        )
    }
}

export default Public