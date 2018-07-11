# Debugging with the Node Inspector Manager

This is a simple application that has the following features.

1. User registration
2. User login/logout
3. Displaying of user's tasks
4. Task creation for a user

## Instructions

1. Clone this repository onto your system.
2. Run `npm install`
3. Update `db.js` with your configuration
4. Run `node dbSetup`
5. For non-VSCode users, install the Node Inspector Manager for Chrome at https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en
6. Run the app with `node --inspect index.js`.

Your mission here is to hunt down the bugs in this app using either the NIM or the VSCode debugger, and eliminate them.
