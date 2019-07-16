import React, { Component } from 'react'
import Service from './../service'

export default class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
        }
    }

    fetchRecords() {
        const service = new Service();
        service.getData(this.props.entity).then((body) => {
            body.json().then(result => {
                const { data } = result;
                this.setState({
                    children: data,
                });
            });
        })
    }

    handleChange(e) {
        if (this.props.manyToOne) {
            console.log(this.props.valueMember, e)
            this.props.handleChange({ [this.props.valueMember]: e });
        } else {
            this.props.handleChange(e);
        }
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value !== nextProps.value || this.state !== nextState) {
            return true;
        }
        return false;
    }

    getValue(r, text) {
        let objValue = r;
        const fields = text.split('.');
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            objValue = objValue[field];
        }
        return objValue;
    }

    render() {
        return (
            this.state.children &&
            <select
                onFocus={() => this.fetchRecords()}
                name={this.props.name}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={(e) => this.handleChange(e)}>
                {
                    this.state.children.map((r, index) => (
                        <option key={index} value={r[this.props.valueMember].toString()}>{this.getValue(r, this.props.displayMember)}</option>
                    ))
                }
            </select>
        );
    }
}