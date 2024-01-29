
function atualizarUsuario(){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:3000/update');

    let jwt = returnTokenExt();

    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.setRequestHeader('Accept', 'application/json');
    xmlHttpRequest.setRequestHeader('Authorization', jwt);

    let id = localStorage.getItem('id');
    let nome = document.getElementById('nome').value;
    let cidade = document.getElementById('cidade').value;
    
    let data = "id="+id+"&name="+nome+"&city="+cidade;
    xmlHttpRequest.send(data);
    xmlHttpRequest.addEventListener('readystatechange', function(){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            console.log(json);
            top.opener.pesquisar();
            window.close();
        }
    })
}

function criarUsuario(nome, cidade){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:3000/create');

    let jwt = returnTokenExt();

    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.setRequestHeader('Accept', 'application/json');
    xmlHttpRequest.setRequestHeader('Authorization', jwt);

    let data = "name="+nome+"&city="+cidade;

    xmlHttpRequest.send(data);

    xmlHttpRequest.addEventListener('readystatechange', function(){
        if(xmlHttpRequest.readyState===4 && xmlHttpRequest.status==200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            console.log(json);
            top.opener.pesquisar();
            window.close();
        }
    })
}




function returnTokenExt(){
    // let ch1 = localStorage.getItem('sec');
    // let ch2 = top.opener.document.getElementById('n1').textContent;
    // let ch3 = top.opener.document.getElementById('n2').textContent;
    // return ch1+'.'+ch2+'.'+ch3;
    return localStorage.getItem('token');
}

function login(){
    let user = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    top.opener.getToken(user, password);
}