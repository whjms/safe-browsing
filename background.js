 var tests = ["type"];

 function getRandomTest() {
 	return tests[Math.floor(Math.random() * tests.length)];
 }

 chrome.webNavigation.onDOMContentLoaded.addListener(
 	function(details) {
 		chrome.tabs.sendMessage(details.tabId,
 			{"testName" : getRandomTest()});
 	});