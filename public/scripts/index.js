let socket = io();
let el;
let user = '';
socket.on('time', (timeString) => {
el = document.getElementById('server-time');
el.innerHTML = 'Server time: ' + timeString;
});

socket.on('receiveMessage',message => {
    el = document.getElementById('messageBox')
    if(user === message.client){
        el.innerHTML += '<div class="sentSms" >Me : '+message.message+'</div>'
    } else {
        el.innerHTML += '<div class="receivedSms" >'+message.client+' : '+message.message+'</div>'
    }
})

function handleClick(){
    alert('clicked');
    //socket.emit('start','apple');
    //socket.emit('salutations','apple','pineapple','mango');
}

let sendButton = document.getElementById("sendButton")
let client = document.getElementById("client")

sendButton.addEventListener('click',() => {
    //alert('apple')
    user = client.value
    if(client.value.length<1){
        alert('please enter your name to send')
    } else {
        let input = document.getElementById('messageInput')
        if(input.length<1){
            alert('Enter a message')
        } else {
            socket.emit('sendMessage',{client : client.value, message : input.value})
            input.value = ''
        }
    }
})

