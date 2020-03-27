Forked from  grid-x.

- Edited CSS file.
- Removed Emoji support.
- Removed brackets '[]' from Username.
- Added Timestamp in front of Username. It will display as username @hh:mm.
- added variables for the refresh-time and a display-timer: module displays only the last message for a given amount of time, and then hides itself until the next message is received.

Forked from stir.

- Changed the Random Message Display to Last Message only.
- <s>Removed '@' from Usernames</s>

# MagicMirror² Module: MMM-Slack
This is a module integrating Slack in [MagicMirror²](https://github.com/MichMich/MagicMirror). It displays messages from the a given Slack channel in config.js. The module also supports update and delete messages

## How to install

Remote into your MagicMirror box using a terminal software and go to the application folder:

    cd ~/MagicMirror

Clone the repository:

	git clone https://github.com/nrkno/MMM-Slack
	
Install dependencies:

`npm install`

Add the module to the modules array in the config/config.js file by adding the following section. You can change this configuration later when you see this works:

	{
		module: 'MMM-Slack',
		position: 'lower_third',
		config: {
			slackToken: 'YOUR_SLACK_TOKEN_GOES_HERE',
			slackChannel: 'THE_CHANNEL_YOU_WANT_MESSAGES_FROM'
		}
	},

## Configuration options

<table style="width:100%">
	<tr>
		<th>Option</th>
		<th>Comment</th>
		<th>Default</th>
	</tr>
	<tr>
		<td>slackToken</td>
		<td>You must create a test token for the [Slack API](https://api.slack.com/tokens) </td>
		<td>aaaa-bbbbb-ccccc-dddd-12344</td>
	</tr>
	<tr>
		<td>slackChannel</td>
		<td>Which Slack channel you want to display messages from</td>
		<td>test</td>
	</tr>
	<tr>
        <td>showTime</td>
        <td>If true, the timestamp of the message will be displayed in front of the username.</td>
        <td>true</td>
    </tr>
	<tr>
        <td>showSeconds</td>
        <td>If true, the timestamp includes the seconds. Only works, if showTime is true.</td>
        <td>false</td>
    </tr>
    <tr>
        <td>showUserName</td>
        <td>If true, the message sender's user name will be displayed with the message.</td>
        <td>true</td>
    </tr>
    <tr>
        <td>showLatestMessageOnStartup</td>
        <td>If true, the latest message in the channel will be displayed on startup</td>
        <td>false</td>
    </tr>
	<tr>
        <td>refreshTime</td>
        <td>The time-interval which defines how often the module is updated.</td>
        <td>1 min = 60000 ms</td>
    </tr>
	<tr>
        <td>displayTime</td>
        <td>The time in seconds the last message is displayed.</td>
        <td>10 min = 600 s</td>
    </tr>
</table>
