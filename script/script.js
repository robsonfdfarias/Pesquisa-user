function pesquisar(){
    let xmlHttpRequest = new XMLHttpRequest();
    let name = document.getElementById('nome').value;

    xmlHttpRequest.open("GET", "http://localhost:3000/name/"+name);

    let jwt = returnToken();
    // console.log(jwt)

    // xmlHttpRequest.setRequestHeader('Accept-Encoding', 'gzip, delate, br');
    // xmlHttpRequest.setRequestHeader('Connection', 'keep-alive');
    // xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xmlHttpRequest.setRequestHeader('Accept', 'application/json');
    // xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + jwt);
    xmlHttpRequest.setRequestHeader('Authorization', jwt);

    xmlHttpRequest.send();
    var pesquisa = document.getElementById('pesquisa');

    xmlHttpRequest.addEventListener('readystatechange', function (){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            let html = '<table class="tab"><tr>';
            html += '<td>Nome</td><td>Cidade</td><td>Ação</td></tr>';
            for(let i=0; i<json.length;i++){
                html+='<tr><td>'+json[i].name+'</td><td>'+json[i].city+'</td>';
                html+='<td><button onclick="editar('+json[i].id+')">Editar</button><button onclick="excluirConfirm('+json[i].id+')">Excluir</button></td></tr>';
            }
            html+='</table>';
            pesquisa.innerHTML = html;
        }
        // else{
        //     pesquisa.innerHTML = xmlHttpRequest.readyState+'<br>'+xmlHttpRequest.status;
        // }
    })
}

function pegarUsuarioPorId(id){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "http://localhost:3000/"+id);
    let jwt = returnToken();
    // console.log('--------------- '+id)
    // console.log('xxxxxxxxx '+jwt)
    xmlHttpRequest.setRequestHeader('Authorization', jwt);
    xmlHttpRequest.send();
    xmlHttpRequest.addEventListener('readystatechange', function (){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            // console.log(json)
            localStorage.setItem('id', json[0].id);
            localStorage.setItem('nome', json[0].name);
            localStorage.setItem('cidade', json[0].city);
        }
    })
}

function inserir(){
    window.open('views/formInsert.html', '_blank', 'fullscreen=no, height=350, width=450, location=0, menubar=no, resizable=0, scrollbars=0, status=no, titlebar=no, toolbar=no, top=10, left=10');
}

function editar(id){
    // alert("editar o id: "+id)
    pegarUsuarioPorId(id);
    window.open('views/formEdit.html', '_blank', 'fullscreen=no, height=350, width=450, location=0, menubar=no, resizable=0, scrollbars=0, status=no, titlebar=no, toolbar=no, top=10, left=10');
}

function excluirConfirm(id){
    let confirmation = confirm("Você tem certeza que deseja excluir esse Usuário?");
    if(confirmation){
        excluir(id);
    }else{
        alert('Operação cancelada!');
    }
}

function excluir(id){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:3000/delete');

    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let jwt = returnToken();
    // console.log('--------------- '+id)
    // console.log('xxxxxxxxx '+jwt)
    xmlHttpRequest.setRequestHeader('Authorization', jwt);

    let data = "id="+id;

    xmlHttpRequest.send(data);
    xmlHttpRequest.addEventListener('readystatechange', function(){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            console.log(json);
            pesquisar();
        }
    })
}

var jan = '';

function getToken(user, password){
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "http://localhost:3000/login");

    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.setRequestHeader('Accept', 'application/json');

    let data = "usuario="+user+"&senha="+password;
    // console.log(data)
    xmlHttpRequest.send(data);
    localStorage.clear();

    xmlHttpRequest.addEventListener('readystatechange', async function(){
        if(xmlHttpRequest.readyState===4 && xmlHttpRequest.status==200){
            let json = await JSON.parse(xmlHttpRequest.responseText);
            localStorage.setItem('token', json.token);
            // configToken(json.token);
            // console.log(json.token);
            // var pesquisa = document.getElementById('pesquisa');
            // pesquisa.innerHTML = json.token;
            removeDivLogin();
            jan.close()
        }
        if(xmlHttpRequest.status!=200&&xmlHttpRequest.readyState>3){
            jan.alert('falha no login')
        }
    })
}
function configToken(token){
    // console.log('------>>> '+token)
    let dados = token.split('.');
    // console.log(dados)
    // var pesquisa = document.getElementById('pesquisa');
    localStorage.setItem('sec', dados[0]);
    n1.innerHTML = dados[1];
    n2.innerHTML = dados[2];
    // pesquisa.innerHTML = dados;
    console.log('Aqui chegou')
}

function returnToken(){
    // let ch1 = localStorage.getItem('sec');
    // let ch2 = document.getElementById('n1').textContent;
    // let ch3 = document.getElementById('n2').textContent;
    // document.getElementById('pesquisa').innerHTML = 'TOKEN: '+ch1+'.'+ch2+'.'+ch3;
    // return ch1+'.'+ch2+'.'+ch3;
    return localStorage.getItem('token');
}

// getToken('marcelo', '123456');

function ex(){
    let xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.open("GET", "http://localhost:3000/user");

    let jwt = returnToken();
    // console.log(jwt)
    
    xmlHttpRequest.setRequestHeader('Authorization', jwt);

    xmlHttpRequest.send();
    var pesquisa = document.getElementById('pesquisa');

    xmlHttpRequest.addEventListener('readystatechange', function (){
        if(xmlHttpRequest.readyState === 4 && xmlHttpRequest.status == 200){
            let json = JSON.parse(xmlHttpRequest.responseText);
            
            pesquisa.innerHTML = json.nome;
        }
    })
}

// localStorage.clear();
function removeDivLogin(){
    document.getElementById('loginDiv').setAttribute('style', 'display:none;');
}

function openLogin(){
    if(localStorage.getItem('token')==null){
        document.getElementById('loginDiv').setAttribute('style', 'display:flex;');
        jan = window.open('views/login.html', '_blank', 'fullscreen=no, height=350, width=450, location=0, menubar=no, resizable=0, scrollbars=0, status=no, titlebar=no, toolbar=no, top=10, left=10');
    }
}
openLogin();

function deslogar(){
    localStorage.clear();
    window.location = "index.html"
}