let socket = io();
let el;
let user = '';
socket.on('time', (timeString) => {
el = document.getElementById('server-time');
el.innerHTML = 'Server time: ' + timeString;
});
let sendButton = document.getElementById("sendButton")
let client = document.getElementById("client")
let messageBox = document.getElementById('messageBox')
let output = document.getElementById('output')
let typingBox = document.getElementById('typing')
socket.on('receiveMessage',message => {
    if(user === message.client){
        output.innerHTML += '<div class="sentSms" >Me : '+message.message+'</div>'
    } else {
        output.innerHTML += '<div class="receivedSms" >'+message.client+' : '+message.message+'</div>'
    }
    scrollMesageBox()
})

socket.on('userTyping', data => {
    
    //alert(typeof(user))
    if(data.name!==client.value){
        typingBox.innerHTML = `${data.name} : (${data.message})`
        setTimeout(() => {
            typingBox.innerHTML = ''
        }, 3000);
    }
})

function scrollMesageBox(){
    messageBox.scrollTop = messageBox.scrollHeight;
}

let input = document.getElementById('messageInput')
input.addEventListener('keypress',() => {
    if(client.value.length>0){
        socket.emit('typing',{
            name : client.value,
            message : input.value
        })
    }
})
sendButton.addEventListener('click',() => {
    //alert('apple')
    user = client.value
    if(client.value.length<1){
        alert('please enter your name to send')
    } else {
        if(input.value.length<1){
            alert('Enter a message')
        } else {
            socket.emit('sendMessage',{client : client.value, message : input.value})
            input.value = ''
        }
    }
})

