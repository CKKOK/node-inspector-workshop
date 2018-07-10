const React = require('react');
const DefaultLayout = require('../layouts/default');
const UserCreateForm = require('../components/UserCreateForm');

class UserRegistrationPage extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <UserCreateForm />
            </DefaultLayout>
        )
    }
}

module.exports = UserRegistrationPage;
