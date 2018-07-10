const React = require('react');

class LoginForm extends React.Component {
    render() {
        return (
            <form action="/users/login" method="POST">
                <label htmlFor="email">Email: </label><input name="email" type="text" /><br/>
                <label htmlFor="password">Password: </label><input name="password" type="password" /><br/>
                <input type="submit" value="Login" /><br />
                <a href="/users/new">Register</a>
            </form>
        )
    }
}

module.exports = LoginForm;