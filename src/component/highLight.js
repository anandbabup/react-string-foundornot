import React, { Component } from 'react';
const fetch = require('node-fetch');

class HighLight extends Component {


    render() {
        console.log('child',this.props);
        return (
            <div>
               
                <div id="a" dangerouslySetInnerHTML={this.props.inputStringHtml}>
                </div>
            </div>
        );
    }
}

export default HighLight;