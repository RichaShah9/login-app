import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'

const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

export default class Welcome extends Component {

    componentDidMount() {
        this.props.history.push('/welcome/todo');
    }

    handleEmployeeClick = (e, { name }) => this.props.history.push('/welcome/employeedata')
    handleTransitionClick = (e, { name }) => this.props.history.push('/welcome/transition')
    handleLogoutClick = (e, { name }) => this.props.history.push('/welcome/logout')
    handleSaleOrderClick = (e, { name }) => this.props.history.push('/welcome/saleorder')
    handleTodoClick = (e, { name }) => this.props.history.push('/welcome/todo')

    render() {
        return (
            <div style={{ marginTop: 20, marginLeft: 40, marginRight: 40 }}>
                <Menu icon='labeled' inverted color='teal'>
                    <Menu.Item name='customer' onClick={this.handleEmployeeClick}>
                        <Icon name='user circle' />
                        <b>Customer</b>
                    </Menu.Item>
                    <Menu.Item name='saleorder' onClick={this.handleSaleOrderClick} >
                        <Icon name='shop' />
                        <b>Sale Order</b>
                    </Menu.Item>
                    <Menu.Item name='transition' onClick={this.handleTransitionClick} >
                        <Icon name='snowflake outline' />
                        <b>Transition</b>
                    </Menu.Item>
                    <Menu.Item name='todo' onClick={this.handleTodoClick} >
                        <Icon name='tasks' />
                        <b>Todo List</b>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' onClick={this.handleLogoutClick} >
                            <Icon name='log out' />
                            <b>Logout</b>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </div>
        )
    }
}