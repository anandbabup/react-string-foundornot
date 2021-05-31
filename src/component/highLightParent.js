import React, { Component } from 'react';
import HighLight from './highLight';
const fetch = require('node-fetch');


class HighLightParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //inputStringHtml: 'Hi',
            //searchString:''
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.timer = null;
        this.highlightedHtml = '';
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => {
                var newArray = json.map(post => post.title);
                this.setState({
                    inputStringHtml: { __html: newArray.toString() },
                    cachedData: newArray
                });
            });
    }

    onTextChange(e) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (e.target.value.length > 0) {
                let isMatchFound = !!this.state.cachedData.find(item => item.indexOf(e.target.value) > 0);
                if (isMatchFound) {
                    this.setState({
                        inputStringHtml: { __html: this.state.cachedData.toString() },
                    })
                }
                else {
                    this.setState({
                        inputStringHtml: { __html: '' },
                    })
                }
            }
            else {
                this.setState({
                    inputStringHtml: { __html: this.state.cachedData.toString() },
                });
            }

        }, 100);
    }

    render() {
        console.log('State', this.state);
        return (
            <div>
                <input type="text" onChange={this.onTextChange}></input>
                <HighLight inputStringHtml={this.state.inputStringHtml} />
            </div>
        );
    }
}

export default HighLightParent;