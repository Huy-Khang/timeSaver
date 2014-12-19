chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId,function(tab){
		var parser = document.createElement('a');
		parser.href = tab.url;
		
		
			chrome.storage.local.get('current',function(data){
				if(data.current != null){
					var start = moment(data.current[1]);
					var end = moment();
					var ms = end.diff(start);
					var s = moment.duration(ms);

					chrome.storage.local.get('timeArray',function(arr){
						var flag = false;
						arr.timeArray.forEach(function(item){
							if(item.domain == data.current[0]){
								flag = true;
								item.time += s.asSeconds();
							}
						});
						if(flag == false){
							arr.timeArray.push(
								{domain:data.current[0]
								,time:s.asSeconds()}
							);
							// chrome.storage.local.set({'timeArray':null},function(){
						}
						chrome.storage.local.set({'timeArray':arr.timeArray},null);
					});
				}
				if(parser.host != 'devtools' && parser.host != 'newtab'){
					chrome.storage.local.set({'current':[parser.host,Date().toString()]},null);	
				}else{
					chrome.storage.local.set({'current':null},null);	
				}
			});
	});
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if(changeInfo.status == 'complete'){
		var parser = document.createElement('a');
		parser.href = tab.url;
		
		
			chrome.storage.local.get('current',function(data){
				if(data.current != null){
					var start = moment(data.current[1]);
					var end = moment();
					var ms = end.diff(start);
					var s = moment.duration(ms);

					chrome.storage.local.get('timeArray',function(arr){
						var flag = false;
						arr.timeArray.forEach(function(item){
							if(item.domain == data.current[0]){
								flag = true;
								item.time += s.asSeconds();
							}
						});
						if(flag == false){
							arr.timeArray.push(
								{domain:data.current[0]
								,time:s.asSeconds()}
							);
							// chrome.storage.local.set({'timeArray':null},function(){
						}
						chrome.storage.local.set({'timeArray':arr.timeArray},null);
					});
				}
				if(parser.host != 'devtools' && parser.host != 'newtab'){
					chrome.storage.local.set({'current':[parser.host,Date().toString()]},null);	
				}else{
					chrome.storage.local.set({'current':null},null);	
				}
				
			});

	}
});


chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){
	if(removeInfo.isWindowClosing){
		chrome.storage.local.get('current',function(data){
				if(data.current != null){
					var start = moment(data.current[1]);
					var end = moment();
					var ms = end.diff(start);
					var s = moment.duration(ms);

					chrome.storage.local.get('timeArray',function(arr){
						var flag = false;
						arr.timeArray.forEach(function(item){
							if(item.domain == data.current[0]){
								flag = true;
								item.time += s.asSeconds();
							}
						});
						if(flag == false){
							arr.timeArray.push(
								{domain:data.current[0]
								,time:s.asSeconds()}
							);
						}
						chrome.storage.local.set({'timeArray':arr.timeArray},null);
					});
				}
				chrome.storage.local.set({'current':null},null);
			});
	}
});