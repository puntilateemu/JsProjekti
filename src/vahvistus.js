
//haetaan vahvistus numero urlista jos ei numeroa redirect varaukseen
window.onload = function(){
   var resNum = window.location.href.split('=')[1] //splitataan urli ni saadaan varaus numero
   if(resNum == null){
    window.location.href = '/varaus.html' // heitetään takas varaukseen
   }
   console.log(resNum)
  } 