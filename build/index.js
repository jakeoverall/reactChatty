/** @jsx React.DOM */


/*
  use ajax to call parse 
*/
Parse.initialize("9hTM0DTrB7v4ixcFJQqyp7M93FNpUoy7Qsg76eep", "Cs9AdtTPOFWycN7wx8aeDzwmC8aLHS6l6iYQ1HS1");
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

// var ParseChats = Parse.Object.extend('chatty');
// var parseChats = new ParseChats();
// parseChats.save({text: 'Hip'}).then(function(res){
//   console.log(res);
// })


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
    type: 'JSONP',
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

var Chatroom = React.createClass({displayName: 'Chatroom',
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
          Chat({chat: chatObj, i: i})
        )
    })
    return (
        React.DOM.div({class: "chatroom"}, 
          React.DOM.div(null, 
              AddChatForm({sendChat: this.send})
           ), 
          React.DOM.div({class: "chat"}, 
            chats
          )
        )
      )
  }
});


var Chat = React.createClass({displayName: 'Chat',
  render: function(){
    return (
        React.DOM.p(null, " ", this.props.chat.text, "  - ", React.DOM.i(null, this.props.chat.timestamp), " ")
      )
  }
});

var AddChatForm = React.createClass({displayName: 'AddChatForm',
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
        React.DOM.form(null, 
          React.DOM.input({ref: "text"}), 
          React.DOM.button({onClick: this.addChat, required: true}, "Send Chat")
        )
      )
  }
})


React.render(
  Chatroom(null),
  document.getElementById('chatroom')
)