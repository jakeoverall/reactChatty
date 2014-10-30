/** @jsx React.DOM */


/*
  use ajax to call parse 
*/
var getChats = function(){
  return $.ajax({
    url: 'https://www.parse.com/1/classes/chatty',
    beforeSend: function(request) {
      request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      request.setRequestHeader("Access-Control-Allow-Origin", "*");
      request.setRequestHeader("X-Parse-Application-Id", '9hTM0DTrB7v4ixcFJQqyp7M93FNpUoy7Qsg76eep');
      request.setRequestHeader("X-Parse-REST-API-Key", 'HNeUjzEzGqJ6288MzS5ck8BofzxEpjq2lKJTxuEi');
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Access-Control-Allow-Credentials", true);
    },
    crossDomain: true,
    type: 'GET',
    success: function(res){
      console.log(res)
      return res;
    },
    error: function(err){
      console.log(err);
    }
  })
}


/*
Chatroom 
component: a place to render chats
Componet: a form to write a new chat
 */
var React = require('react');

var Chatroom = React.createClass({
  getInitialState: function () {
    return getChats();
  },
  send: function(chat){
    this.state.chats.unshift(chat);
    this.setState({chats: this.state.chats});
  },
  render: function(){
    var chats = this.state.chats.map(function(chatObj, i){
      return (
          <Chat chat={chatObj} i={i} />
        )
    })
    return (
        <div class="chatroom">
          <div>
              <AddChatForm sendChat={this.send} />
           </div>
          <div class="chat">
            {chats}
          </div>
        </div>
      )
  }
});


var Chat = React.createClass({
  render: function(){
    return (
        <p> {this.props.chat.text}  - <i>{this.props.chat.timestamp}</i> </p>
      )
  }
});

var AddChatForm = React.createClass({
  addChat: function(e){
    e.preventDefault();

    var text = this.refs.text.getDOMNode().value;
    if(!text){
      return
    }
    this.props.sendChat({text: text, timestamp: new Date().toISOString()})

    this.refs.text.getDOMNode().value = '';    

  },
  render: function(){
    return (
        <form>
          <input ref="text"/>
          <button onClick={this.addChat} required>Send Chat</button>
        </form>
      )
  }
})


React.render(
  <Chatroom />,
  document.getElementById('chatroom')
)