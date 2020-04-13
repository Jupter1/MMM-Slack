Module.register('MMM-Slack',{
	defaults: {
        showLatestMessageOnStartup: false,
        showUserName: true,
	showTime: true,
	showSeconds: false,
	maxUserMessages: 3,
	refreshTime: 60000,
	displayTime: 600,
	urgentRefresh: false
	},
	
	getStyles: function() {
		return ['slack.css'];
	},

	start: function() {
		this.slackMessages = [];
		this.counter = 0;
		this.pointer = 0;
		this.authors = [];
		this.openSlackConnection();
		if (!this.config.urgentRefresh) {
			this.updateDom(1000);
		}
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
				if (this.config.urgentRefresh) {
					this.updateDom(1000);
					this.authors = [];
					this.counter = 0;
				}
			}
		}
	},

	getDom: function() {
		var messageElement = document.createElement('div');
		
		messageElement.className = 'message';
		if(this.slackMessages.length > 0) {
			var tooOld = false;
			var timeStamp = Math.floor(Date.now() / 1000);
			var boolAuthor = true;
			
			while (boolAuthor && (tooOld === false)) {
				if((timeStamp - this.slackMessages[this.counter].messageId) > this.config.displayTime) {
					tooOld = true;
				}
				else {	
					var newAuthor = 0;
					for (i=0; i<this.authors.length; i++) {
						if (this.authors[i] !== this.slackMessages[this.counter].user) {
							newAuthor = newAuthor + 1;
						}
					}
					
					if (newAuthor == this.authors.length) {
						boolAuthor = false;
					}
					else {
						this.counter = this.counter + 1;
					}
				}
			}
				
			if (tooOld && this.counter === 0) {
				this.hide();
			}
			else  {
				if (tooOld) {
					this.authors = [];
					this.counter = 0;
				}
				this.pointer = this.counter;
				this.authors.push(this.slackMessages[this.pointer].user);
				messageElement.innerHTML = this.slackMessages[this.pointer].message;
				var timeUserElement = document.createElement('p');
				timeUserElement.className = 'timeAndUser';
				var strUserTime = "";
				
				if(this.config.showUserName) {
                			//var userElement = document.createElement('p');
                			//userElement.className = 'user';
                			//userElement.innerHTML = '@' + this.slackMessages[0].user;
					//messageElement.appendChild(userElement);
					strUserTime = strUserTime + this.slackMessages[this.pointer].user;
				}
					
				if(this.config.showTime) {
					var date = new Date(this.slackMessages[this.pointer].messageId * 1000);
					var hours = date.getHours();
					var minutes = "0" + date.getMinutes();
					strUserTime = strUserTime + ' @' + hours + ':' + minutes.substr(-2);
					
					if(this.config.showSeconds) {
						var seconds = "0" + date.getSeconds();
						strUserTime = strUserTime + ':' + seconds.substr(-2);
					}
				}
				
				if(this.config.showTime || this.config.showUserName) {
					timeUserElement.innerHTML = strUserTime
					messageElement.appendChild(timeUserElement);
				}
				
				this.show();
				this.counter = this.counter + 1;
				if (this.authors.length === this.config.maxUserMessages) {
					this.authors = [];
					this.counter = 0;
				}
			}
		}
		
		return messageElement;
	}
});
