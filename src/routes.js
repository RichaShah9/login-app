import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Welcome from './Welcom';
import LoginForm from './LoginForm';
import SignIn from './SignIn';
import TransitionExampleTransitionExplorer from './TransitionExampleTransitionExplorer';
import Logout from './Logout';
import EmployeeData from './EmployeeData';
import EditForm from './EditForm';
import SaleOrder from './SaleOrder';
import TodoApp from './TodoApp';

const routes = [
    {
        path: '/loginform',
        component: LoginForm,
    },
    {
        path: '/signin',
        component: SignIn,
    },
    {
        path: '/editform',
        component: EditForm,
    },
    {
        path: '/welcome',
        component: Welcome,
        routes: [
            {
                path: '/welcome/employeedata',
                component: EmployeeData,
            },
            {
                path: '/welcome/transition',
                component: TransitionExampleTransitionExplorer
            },
            {
                path: '/welcome/saleorder',
                component: SaleOrder,
            },
            {
                path: '/welcome/logout',
                component: Logout,
            },
            {
                path: '/welcome/todo',
                component: TodoApp,
            },
        ]
    },
]

const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

const RouterConfig = () => (
    <main>
        <Switch>
            <Route exact path="/" component={App} />
            {
                routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))
            }
        </Switch>
    </main>
);

export default RouterConfig;