const React = require('react');
const DefaultLayout = require('../layouts/default');

class UserTask extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div>Hey there {this.props.username}, your task is:</div>
                <div className="card">
                    <div className="card-title">{this.props.taskname}</div>
                    <div className="card-body">{this.props.description}</div>
                </div>
            </DefaultLayout>
        )
    }
}

module.exports = UserTask;
