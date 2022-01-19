// replace these values with those generated in your TokBox Account
var apiKey = "";
var sessionId = "";
var token = "";
let btn = document.createElement("button");
//making publisher a global object
//mav stands for "My audio and Video"
var mav="on";
var publisher={};
// (optional) add server code here
initializeSession();
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });
  // Create a publisher
    publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
btn.innerHTML = "Toggle Video/Audio";
btn.onclick = function () {
if (mav=="on"){
  publisher.publishVideo(false);
  publisher.publishAudio(false);
  mav="off";
}
else {
  publisher.publishVideo(true);
  publisher.publishAudio(true);
  mav="on";
}
};
document.body.appendChild(btn);
