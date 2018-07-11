const React = require('react');

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Taskar</title>
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" />
                </head>
                <body>{this.props.children}</body>
            </html>
        )
    }
}

module.exports = DefaultLayout;