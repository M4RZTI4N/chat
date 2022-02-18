const socket = io();
const message = document.getElementById('message');
const button = document.getElementById('send');
function send(){
    socket.emit('send',message.value);
    message.value = '';
}
button.addEventListener('click',()=>{
    send();
})
document.addEventListener('keypress',(e)=>{
    if(e.key.toLowerCase() == 'enter'){
        send();
    }
})