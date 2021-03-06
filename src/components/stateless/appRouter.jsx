import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../../App";
import CreateAccountPage from "../pages/createaccountpage";
import RestoreAccountPage from "../pages/restoreaccountcomponent";
import AccountPage from "../pages/accountpage";
import TransactionPage from "../pages/transactionpage";

const AppRouter = () => {
    return (
      <Router>
        <App>
	<Route path="/create" component={CreateAccountPage} />
            <Route path="/restore" component={RestoreAccountPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/transaction" component={TransactionPage}/>
            <Route
                exact
                path="/"
                render={() =>
                    localStorage.getItem("address") !== null ? (
                    <Redirect to="/account" />
                    ) : (
                    <Redirect to="/create" />
                    )
                }
            />
        </App>
    </Router>
  );
};

export default AppRouter;