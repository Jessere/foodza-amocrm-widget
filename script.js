define(['jquery'], function($){
    var CustomWidget = function () {
        var self = this,
            system = self.system;
        this.callbacks = {
            render: function(){
                //console.log('render');
                return true;
            },
            init: function(){
            	var objToday = new Date();
	            	objToday.setDate(objToday.getDate() - 1);

				var	weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
					dayOfWeek = weekday[objToday.getDay()],
					dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate(),
					months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
					curMonth = months[objToday.getMonth()],
						curYear = objToday.getFullYear();
				var today = dayOfWeek + ", " + dayOfMonth + " " + curMonth + " " + curYear + " 00:00:00 GMT";

				console.log(today);

				var arrayName = 0;

                $.get('https://foodza.amocrm.ru/api/v2/account?with=users')

                    .success(function(data){

                    

                        for (var user in data._embedded.users){
                            var userName = data._embedded.users[user].name;
                            var userId = data._embedded.users[user].id;
                            var leadsCount = 0;

                            var resultTable = [new Array(data._embedded.users.length), new Array(data._embedded.users.length)];

                            $.ajax({
                                type : 'GET',
                                url : 'https://foodza.amocrm.ru/api/v2/leads',
                                ajaxLeadsCount : leadsCount,
                                ajaxUserName : userName,
                                ajaxUserId : userId,
                                beforeSend : function(xhr){
                                    xhr.setRequestHeader("If-Modified-Since", today);
                                },
                                success : function(data){

                                    userName = this.ajaxUserName;
                                    userId = this.ajaxUserId;

                                    leadsCount = this.ajaxLeadsCount;

                                    for (var lead in data._embedded.items){
                                        if (data._embedded.items[lead].responsible_user_id == userId){
                                            leadsCount += 1;
                                        };
                                    };	
                                    alert('resultTable is getting arguments!');

                                    resultTable[arrayName][0].push(userName);
                                    resultTable[arrayName][1].push(leadsCount);
                                },
                            });
                            arrayName += 1;
                        };

                        console.table(resultTable);
                    });

                return true;
            },
            bind_actions: function(){
                //console.log('bind_actions');
                return true;
            },
            settings: function(){
                return true;
            },
            onSave: function(){
                //alert('click');
                return true;
            },
            destroy: function(){

            },
            contacts: {
                    //select contacts in list and clicked on widget name
                    selected: function(){
                        console.log('contacts');
                    }
                },
            leads: {
                    //select leads in list and clicked on widget name
                    selected: function(){
                        console.log('leads');
                    }
                },
            tasks: {
                    //select taks in list and clicked on widget name
                    selected: function(){
                        console.log('tasks');
                    }
                }
        };
        return this;
    };

return CustomWidget;
});

