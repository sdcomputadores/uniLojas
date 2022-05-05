
     //IIFE Immediately Invoked Function Expression


  var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  };


 
  // aqui é pra alterar o nome da loja
  const nomeLoja = document.querySelector('.nome__da__loja'); 
const btn = document.querySelector('.btn')
   btn.addEventListener('click', function(e){
        e.preventDefault()
     const nome = document.querySelector('.nome__da__loja-upload')
     const value = nome.value
     
     nomeLoja.innerHTML = value
 })

 //aqui aniciamos novos produtos na loja

  

 var openFileP = function(event) {
   var input = event.target;

   var reader = new FileReader();
   reader.onload = function(){
     var dataURL = reader.result;
     var output = document.getElementById('img1_produto');
     output.src = dataURL;
   };
   reader.readAsDataURL(input.files[0]);
 };

