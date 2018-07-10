const React = require('react');
const DefaultLayout = require('./layouts/default');
const LoginForm = require('./components/LoginForm');

class Home extends React.Component {
    render() {
        let loggedIn = this.props.loggedIn;
        let id = this.props.id;
        let name = '';
        if (this.props.name) {
            name = this.props.name;
        }
        return (
            <DefaultLayout>
                <div>Taskar</div>
                {loggedIn && (<a href={"/users/" + id} >Get Home</a>)}
                {!loggedIn && (<LoginForm />)}
            </DefaultLayout>
        )
    }
}

module.exports = Home;
