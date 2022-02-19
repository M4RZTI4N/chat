const socket = io();
const message = document.getElementById('message');
const button = document.getElementById('send');
const login = document.getElementById('loginButton');
login.addEventListener('click',()=>{
    document.getElementById('chat').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    socket.emit('login',document.getElementById('name').value);
})


function send(){
    if(message.value!=''){
        socket.emit('send',message.value);
        message.value = '';
    }
}
button.addEventListener('click',()=>{
    send();
})
document.addEventListener('keypress',(e)=>{
    if(e.key.toLowerCase() == 'enter'){
        send();
    }
})
socket.on('receive',(data)=>{
    console.log(`message ${data.message} from ${data.name}`);
    var messageDiv = document.createElement('div');
    var messageText = document.createElement('p');
    messageText.innerHTML = `${data.name}: ${data.message}`;
    messageDiv.classList.add('message');
    messageText.classList.add('messageText');
    messageDiv.appendChild(messageText)
    document.getElementById('chatbox').appendChild(messageDiv)
})
