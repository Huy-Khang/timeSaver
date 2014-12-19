var PopupController = function () {
  this.test1Button = document.getElementById('test1Button');
  this.test2Button = document.getElementById('test2Button');
  this.addListeners_();
  this.init();
};

PopupController.prototype = {
  testButton : null,
  init: function(){
    
  },
  addListeners_: function () {
    this.test1Button.addEventListener('click',this.test1Button_Click.bind(this));
    this.test2Button.addEventListener('click',this.test2Button_Click.bind(this));
  },
  test1Button_Click: function(){
    chrome.storage.local.get('timeArray',function(data){
      console.log(data.timeArray);
    });
  },
  test2Button_Click: function(){
    chrome.storage.local.get('timeArray',function(data){
      data.timeArray.forEach(function(item){
        $('#list').append('<div>' + item.domain + ' : ' + item.time + '</div><br>');  
      });
    });
    // chrome.storage.local.set({'timeArray':[]},null);
    // var ctx = document.getElementById('pieChart').getContext('2d');
    // var myPieChart = new Chart(ctx).Pie([
    //     {
    //       value: 300,
    //       color:"#F7464A",
    //       highlight: "#FF5A5E",
    //       label: "Red"
    //     },
    //     {
    //       value: 50,
    //       color: "#46BFBD",
    //       highlight: "#5AD3D1",
    //       label: "Green"
    //     },
    //     {
    //       value: 100,
    //       color: "#FDB45C",
    //       highlight: "#FFC870",
    //       label: "Yellow"
    //     },
    //     {
    //       value: 40,
    //       color: "#949FB1",
    //       highlight: "#A8B3C5",
    //       label: "Grey"
    //     },
    //     {
    //       value: 120,
    //       color: "#4D5360",
    //       highlight: "#616774",
    //       label: "Dark Grey"
    //     }
    //   ]);
      
  }
};

document.addEventListener('DOMContentLoaded', function () {
	//chrome.browserAction.setIcon({path:"green.png"});
  	window.PC = new PopupController();
});
