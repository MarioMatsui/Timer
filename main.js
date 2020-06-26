//const e variáveis.
const display = document.getElementById('display');

const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

const edit = document.getElementById('edit');
const reset = document.getElementById('reset');
const comecar = document.getElementById('comecar');
const stop = document.getElementById('stop');

const alarme = document.getElementById("som");

var cronometroSeg;

var horaAtual = 0;
var minutoAtual = 0;
var segundoAtual = 0;

var interval;

var i;

//programando os botões que configuram o timer.
for(i = 0; i <= 99; i++){
    horas.innerHTML+='<option value="'+i+'">'+i+'</option>';
}
for(i = 0; i <= 60; i++){
    minutos.innerHTML+='<option value="'+i+'">'+i+'</option>';
}
for(i = 0; i <= 60; i++){
    segundos.innerHTML+='<option value="'+i+'">'+i+'</option>';
}
//Evento que programa o timer. Hora, minuto e segundo.
comecar.addEventListener('click',function(){
    horaAtual = horas.value;
    minutoAtual = minutos.value;
    segundoAtual = segundos.value;

    display.childNodes[1].innerHTML = horaAtual + ":"+ minutoAtual + ":"+segundoAtual;

    interval = setInterval(function(){
        segundoAtual--;
        if(segundoAtual < 0){
            minutoAtual--;
            segundoAtual = 59;
            if(minutoAtual == 0){
                horaAtual--;
                minutoAtual = 0;
                if(horaAtual == 0){
                    minutoAtual = 59;      
                }
            }
        }
        if(horaAtual == 0 && minutoAtual == 0 && segundoAtual == 0){
            alarme.play();
            clearInterval(interval);
            StopTimer();
        }

        display.childNodes[1].innerHTML = horaAtual + ":"+ minutoAtual + ":"+segundoAtual;
    },1000);

})
//Função q inicia o pop-up para editar o timer.
function iniciaModal(modalID){
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener('click', function(e){
        if(e.target.id == modalID || e.target.className == 'close-pop'){
            modal.classList.remove('mostrar');
        }
    });
}
//Função que cria o botão de stop.
function StopTimer(){
    stop.style.display = 'inline-block';
}
//Evento que programa o botão stop.
stop.addEventListener('click',function(){
    alarme.pause();
    stop.style.display = 'none';
})
reset.addEventListener('click', () => location.reload());
edit.addEventListener('click', () => iniciaModal('modal-config'));
