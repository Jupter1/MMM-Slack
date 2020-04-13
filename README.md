Forked from  grid-x.

- Edited CSS file.
- Removed Emoji support.
- Removed brackets '[]' from Username.
- Added Timestamp. It will display as username @hh:mm.
- Added variables for a refresh interval and a display-time: Module displays the last message of each user for a given amount of time. When the module updates, the message is updated to the next message wich is from a different author. If no message younger than the displayTime exists, the module will hide itself.
- added variable to prevent an immediate refresh when a new message arrives.
See table below for configuration options.


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
		<td>Which Slack channel you want to display messages from.</td>
		<td>test</td>
	</tr>
	<tr>
        	<td>maxUsers</td>
       	 	<td>Indicates how many different Slack-Users will be displayed and thus, how many messages can be cycled through at most. If set to 1, only the newest message will appear.</td>
        	<td>3</td>
    	</tr>
	<tr>
        	<td>showUserName</td>
       	 	<td>If true, the message sender's user name will be displayed with the message.</td>
        	<td>true</td>
    	</tr>
	<tr>
        	<td>showTime</td>
        	<td>If true, the timestamp of the message will be displayed after the username.</td>
        	<td>true</td>
    	</tr>
	<tr>
        	<td>showSeconds</td>
        	<td>If true, the timestamp includes the seconds. Only works, if showTime is true.</td>
        	<td>false</td>
    	</tr>
    	<tr>
	        <td>showLatestMessageOnStartup</td>
        	<td>If true, the latest message in the channel will be displayed on startup</td>
        	<td>false</td>
    	</tr>
	<tr>
        	<td>displayTime</td>
        	<td>The time in seconds the last message is displayed.</td>
        	<td>10 min = 600 s</td>
    	</tr>
	<tr>
        	<td>urgentRefresh</td>
        	<td>If true, the messages will be updated as soon as a new message arrives. If false, the cycle will be completed before the newest message will be shown.</td>
        	<td>false</td>
    	</tr>
	<tr>
        	<td>interval</td>
        	<td>The time-interval which defines how often the module is updated.</td>
        	<td>1 min = 60000 ms</td>
	</tr>
	<tr>
        	<td>animationSpeed</td>
        	<td>Speed of the update animation. The value is given in milliseconds.</td>
        	<td>1000 ms</td>
	</tr>
</table>
