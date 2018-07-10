const React = require('react');
const DefaultLayout = require('../layouts/default');

class UserTasks extends React.Component {
    
    render() {
        let tasks = '', name = '', id = null;
        if (this.props.tasks.length > 0) {
            tasks = this.props.tasks.map((task) => {
                return(
                    <div className="card" key={task['taskid']}>
                        <div className="card-title"><a href={"/users/" + task['userid'] + "/tasks/" + task['taskid']}>{task['taskname']}</a></div>
                    </div>
            )});
        }

        name = this.props.name;
        id = this.props.id;

        return (
            <DefaultLayout>
                <div>Hey there {name}, your tasks are:</div>
                {tasks}
                <a href={"/users/" + id + "/tasks/new"}>Create a task</a><br/>
                <a href={"/users/" + id + "/logout"}>Logout</a>
            </DefaultLayout>
        )
    }
}

module.exports = UserTasks;
