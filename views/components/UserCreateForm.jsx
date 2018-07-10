const React = require('react');

class UserCreateForm extends React.Component {
    render() {
        return (
            <form action="/users/create" method="POST">
                <label htmlFor="name">Name: </label><input name="name" type="text" value={this.props.name} /><br/>
                <label htmlFor="email">Email: </label><input name="email" type="email" value={this.props.email} /><br/>
                <label htmlFor="password">Password: </label><input name="password" type="password" /><br/>
                <label htmlFor="passwordConfirmation">Confirm Password: </label><input name="passwordConfirmation" type="password" /><br/>
                <input type="submit" value="Register" />
            </form>
        )
    }
}

module.exports = UserCreateForm;