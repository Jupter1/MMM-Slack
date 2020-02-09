Module.register('MMM-Slack',{
	defaults: {
        showLatestMessageOnStartup: false,
        showUserName: true
	},
	
	getStyles: function() {
		return ['slack.css'];
	},

	start: function() {
		this.slackMessages = [];
		this.openSlackConnection();
        var self = this;
        setInterval(function() {
            self.updateDom(1000);
        }, 10000);
	},

	openSlackConnection: function() {
		this.sendSocketNotification('START_CONNECTION', {config: this.config});
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification === 'SLACK_DATA'){
			if(payload != null) {
				this.slackMessages = payload;
				this.updateDom(2.5 * 1000);
			}
		}
	},

	getDom: function() {
		var messageElement = document.createElement('div');
		
		messageElement.className = 'message';
		if(this.slackMessages.length > 0)
		{
			
            messageElement.innerHTML = this.slackMessages[0].message;
            if(this.config.showUserName) {
                var userElement = document.createElement('p');
                userElement.className = 'user';
                userElement.innerHTML = '[' + this.slackMessages[0].user + ']';
			    messageElement.appendChild(userElement);
            }
		}
		return messageElement;
	}
});
