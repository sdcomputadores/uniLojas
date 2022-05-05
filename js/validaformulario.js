
export function valida(input){
  const tipoDeInput = input.dataset.tipo

  if(validadores[tipoDeInput]){
  validadores[tipoDeInput](input)
}
  if (input.validity.valid){
    input.parentElement.classList.remove('.input-container--invalido')
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
  }else{
    input.parentElement.classList.add('input-container--invalido')
    input.parentElement.querySelector('input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
  }
console.log(input.validity.valid)
}
const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const mensagensDeErro = {
  nome:{
    valueMissing: ' O campo de nome não pode ser vasio.'
  },
 email: {
   valueMissing: ' O campo não pode estar vazio.',
   typeMismatch: ' O Email digitado não é valido'
 },
 senha: {
   valueMissing:' O campo  não pode estar vazio.',
   patternMismatch: ' A senha deve conter entre 6-8 caracteres, numeros de 0-9 , letras maiusculas e letras minuscaulas.'
 },
 dataNascimento: {
   valueMissing: ' O campo não pode estar vasio.',
   patternMismatch:'Você precisa ter mais que 18 anos'
 },
 cpf:{
  valueMissing: ' O campo não pode estar vasio.',
  patternMismatch:'O CPF digitado não é valido.'
},
 cep:{
  valueMissing: ' O campo não pode estar vasio.',
  patternMismatch:'O CEP digitado não é valido.',
  customError:'Não foi possivel encontrar o CEP.'
 },
 logradouro:{
  valueMissing: ' O campo não pode estar vasio.'
 },
 cidade:{
  valueMissing: ' O campo não pode estar vasio.'
 },
 estado:{
  valueMissing: ' O campo não pode estar vasio.'
 },
  nome:{
  valueMissing: ' O campo não pode estar vasio.'
 },
  preco:{
  valueMissing: ' O campo não pode estar vasio.'
 }
}

const validadores ={
  dataNascimento: input => validaNascimento(input),
  cpf: input => validaCPF(input),
  cep: input => buscarCEP(input)
}

function mostraMensagemDeErro(tipoDeInput,input){
  let mensagem = ''
  tiposDeErro.forEach(erro => {
    if(input.validity[erro]){
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })
  return mensagem
}

function validaNascimento(input){
  const dataRecebida = new Date(input.value)

  let mensagem = ''
//aqui chama a função
 if( !maiorQue18(dataRecebida)){
    mensagem = "Você deve ter mais que 18 anos"
   
 }


  input.setCustomValidity(mensagem)
}
function maiorQue18(data){
 
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
   
}

function validaCPF(input){
  const  cpfFormatado = input.value.replace(/\D/g,'')
  let mensagem = ''

  if(!checaCPFRepetido(cpfFormatado)|| !checaEstruturaCPF(cpfFormatado)){
    mensagem = 'O CPF digitado não é valido.'

  }

  input.setCustomValidity(mensagem)
console.log(cpf)
}
function checaCPFRepetido(cpf){
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  let cpfValido = true

valoresRepetidos.forEach(valor => {
  if(valor == cpf){
    cpfValido = false
  }
})

    return cpfValido
}

function checaEstruturaCPF(cpf){
  const   multiplicador = 10
  return checaDigitoVerificador(cpf,multiplicador)
}

function checaDigitoVerificador(cpf,multiplicador){
  if ( multiplicador >=12){
      return true
  }
  let multiplicadorInicail = multiplicador
  let soma = 0
  const cpfSemDigito = cpf.substr(0,multiplicador-1).split('')
  const digitoVerificador = cpf.charAt(multiplicador - 1)
  for(let contador = 0; multiplicadorInicail > 1 ; multiplicadorInicail--){
    soma = soma + cpfSemDigito[contador] * multiplicadorInicail
    contador++
  }
  if(digitoVerificador == confirmaDigito(soma)){
    return checaDigitoVerificador(cpf,multiplicador + 1)
  }
  return false
}

 function confirmaDigito(soma){
    return 11  - (soma % 11)
 }
//aqui começa o codigo do cep

 function buscarCEP(input){
  
  const cep = input.value.replace(/\D/g,'')
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const options = {
      method: 'GET',
      mode: 'cors',
      headers:{
        'content-type': 'application/json;charset=utf-8'
        
      }

  }
if(!input.validity.patternMismatch && !input.validity.valueMissing){
  fetch(url,options).then(
    response => response.json()
   ).then(
    data => {
      if(data.erro){
        input.setCustomValidity('CEP não encontrado.')
        return
      }
      input.setCustomValidity('')
      preencheCamposViaCep(data)
      return
    }
   )
  }
 }
 
function preencheCamposViaCep(data){
 
  const bairro = document.querySelector('#bairro')
  const rua = document.querySelector('#logradouro')
const cidade = document.querySelector('#cidade')  
const estado = document.querySelector('#estado')




bairro.value = data.bairro
rua.value = data.logradouro
cidade.value = data.localidade
estado.value = data.uf



}


    
