import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact path="/login"
                        component={LoginScreen}
                    />
                    <Route
                        exact path="/"
                        component={CalendarScreen}
                    />
                </Switch>
            </div>
        </Router>

    )
}

export default AppRouter