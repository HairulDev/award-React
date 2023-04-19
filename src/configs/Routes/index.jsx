import React from 'react'

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Auth from "pages/Auth/Auth";

// import viewItem from "pages/Admin/Item/viewItem";
// import createCategory from "pages/Admin/Category/createCategory";
// import createItem from "pages/Admin/Item/createItem";

import Dashboard from 'pages/Dashboard';
import User from 'pages/User';
import Logout from 'components/molecules/Logout';
import { NotFound } from 'components';
import AuthVerify from 'pages/Auth/AuthVerify';
import Category from 'pages/Admin/Category';
import CategoryFormPage from 'components/templates/CategoryFormPage';
import Item from 'pages/Admin/Item';
import ItemFormPage from 'components/templates/ItemFormPage';


const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
});

const Routes = () => {
    return (
        <>
            <Router history={history} basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/search" exact component={Dashboard} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/auth" exact component={Auth} />


                    <Route path="/authVerify/:token" component={AuthVerify} />
                    <Route path="/account/:currentId?" component={User} />

                    {/* admin */}
                    <Route path="/admin" exact component={() => <Redirect to="/admin/viewCategory" />} />
                    <Route path="/admin/viewCategory" component={Category} />
                    <Route exact path="/admin/createCategory/:currentId?" component={CategoryFormPage} />
                    <Route exact path="/admin/viewItem" component={Item} />
                    <Route exact path="/admin/createItem/:currentId?" component={ItemFormPage} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>

            <ToastContainer></ToastContainer>
        </>
    )
}

export default Routes;
