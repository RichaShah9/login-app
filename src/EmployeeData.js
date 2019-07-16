import React, { Component } from 'react';
// import {Route,Link} from 'react-router-dom';
import { Icon, Table, Button, Label } from 'semantic-ui-react'
import Service from './service';

export default class EmployeeData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            currentPage: 1,
            customerPerPage: 9,
        }
        this.service = new Service();
    }

    componentDidMount() {
        this.service.getData('com.axelor.apps.base.db.Partner').then(res =>
            res.json().then(result => {
                const { data } = result;
                // console.log("::::",data)
                this.setState((prevState) => {
                    return { customer: data };
                });
            })
        );
    }

    onUpdate(id) {
        this.service.getId('com.axelor.apps.base.db.Partner', id).then(res => {
            res.json().then(result => {
                const { data } = result;
                if (data && data.length) {
                    this.props.history.push('/editform', { data: data[0] });
                }
            })
        });
    }

    onDelete(id) {
        console.log(id)
        this.service.delete('com.axelor.apps.base.db.Partner', id).then(res => {
            console.log(res.status)
            if (res.status === 200) {
                alert('id deleted is: ' + id);
                this.service.getData('com.axelor.apps.base.db.Partner').then(res =>
                    res.json().then(result => {
                        const { data } = result;
                        this.setState((prevState) => {
                            return { customer: data };
                        });
                    })
                );
            } else {
                alert('Something went wrong...')
            }
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.props.history.push('/editform', { data: {} });
    }

    handlePagination(e) {
        this.setState({
            currentPage: Number(e.target.id)
        });
    }
    render() {
        const { customer, currentPage, customerPerPage } = this.state;
        const indexOfLastTodo = currentPage * customerPerPage;
        const indexOfFirstTodo = indexOfLastTodo - customerPerPage;
        const currentTodos = customer.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(customer.length / customerPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Label
                    color='teal'
                    size='huge'
                    key={number}
                    id={number}
                    onClick={(e) => this.handlePagination(e)}>
                    {number}
                </Label>
            );
        });

        return (
            <div style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}>
                <Table celled striped id='customerdata'>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell colSpan='4'><h2 style={{color : 'teal'}}>Customer Data</h2></Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>
                                <Button animated='vertical' color='teal' onClick={(e) => this.handleClick(e)}>
                                    <Button.Content hidden>Add Customer</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='add' size='big' />
                                    </Button.Content>
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Fixed Phone</Table.HeaderCell>
                            <Table.HeaderCell>Email Address</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            currentTodos.map((customer, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{customer.name}</Table.Cell>
                                    <Table.Cell>{customer.fixedPhone}</Table.Cell>
                                    <Table.Cell>{customer.emailAddress && customer.emailAddress.name}</Table.Cell>
                                    <Table.Cell>{customer.partnerCategory && customer.partnerCategory.name}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={() => this.onUpdate(customer.id)}>
                                            <Icon name='edit' color='blue' />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={() => this.onDelete(customer.id)}>
                                            <Icon name='delete' color='red' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                {renderPageNumbers}
            </div>
        )
    }
}

