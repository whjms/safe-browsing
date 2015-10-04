 var tests = ["type", "tic-tac-toe"];

 function getRandomTest() {
 	return tests[Math.floor(Math.random() * tests.length)];
 }

 chrome.webNavigation.onDOMContentLoaded.addListener(
 	function(details) {
 		var test = getRandomTest();
 		setTimeout(function() {
 		chrome.tabs.sendMessage(details.tabId,
 			{"testName" : getRandomTest()});
 		}, 50);
 	});