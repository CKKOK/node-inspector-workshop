const React = require('react');

class TaskCreateForm extends React.Component {
    render() {
        return (
            <form action="/tasks/create" method="POST">
                <label htmlFor="name">Title: </label><input name="name" type="text" /><br/>
                <label htmlFor="description">Description: </label><input name="description" type="text" /><br/>
                <input name="userId" type="hidden" value={this.props.userId} />
                <input type="submit" value="Create" />
            </form>
        )
    }
}

module.exports = TaskCreateForm;