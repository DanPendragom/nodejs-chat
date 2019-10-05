const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'public')));
app.set('views',(path.join(__dirname,'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');


app.use('/',(req, res) =>{
    res.render('index.html');
});


http.listen(3000, function(){
    console.log('ouvindo *: 3000');
})

let myMsg = [];    
io.on('connection', socket => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('send', data =>{
        console.log(data);
        myMsg.push(data);

        // Emitir mensagem para todos os sockets conectados na aplicação
        socket.broadcast.emit('msgReceive',data);
    })
});