const React = require('react');
const DefaultLayout = require('../layouts/default');
const TaskCreateForm = require('../components/TaskCreateForm');

class TaskCreationPage extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <TaskCreateForm userId={this.props.userId} />
            </DefaultLayout>
        )
    }
}

module.exports = TaskCreationPage;
