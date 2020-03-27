Module.register('MMM-Slack',{
	defaults: {
        showLatestMessageOnStartup: false,
        showUserName: true,
	showTime: true,
	refreshTime: 60000,
	displayTime: 600
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
        	}, self.config.refreshTime);
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
			var timeUserElement = document.createElement('p');
			timeUserElement.className = 'timeAndUser';
			
			if(this.config.showTime) {
				'var timeElement = document.createElement('p');
				'timeElement.className = 'time';
				var date = new Date(this.slackMessages[0].messageId*1000);
				var hours = date.getHours();
				var minutes = "0" + date.getMinutes();
				
				timeUserElement.innerHTML = hours + ':' + minutes.substr(-2) + ' '
				//timeElement.innerHTML = this.slackMessages[0].messageId;

				//messageElement.appendChild(timeElement);
			}
            		if(this.config.showUserName) {
                		'var userElement = document.createElement('p');
                		'userElement.className = 'user';
                		'userElement.innerHTML = '@' + this.slackMessages[0].user;
				timeUserElement.innerHTML = timeUserElement.innerHTML + '@' + this.slackMessages[0].user;
			    	//messageElement.appendChild(userElement);
            		}
			
			messageElement.appendChild(timeUserElement);
		}
		var timeStamp = Math.floor(Date.now() / 1000);
		if((timeStamp - this.slackMessages[0].messageId) > this.config.displayTime)
		{
			this.hide();
		}
		else 
		{
			this.show();
		}
		return messageElement;
	}
});
