const React = require('react');
const DefaultLayout = require('../layouts/default');

class UserHome extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div>Hey there {this.props.name}</div>
                <a href={"/users/" + this.props.id + "/tasks"}>See your tasks</a><br/>
                <a href={"/users/" + this.props.id + "/tasks/new"}>Create a task</a><br/>
                <a href={"/users/" + this.props.id + "/logout"}>Logout</a>
            </DefaultLayout>
        )
    }
}

module.exports = UserHome;
