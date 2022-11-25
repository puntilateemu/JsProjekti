
var today = new Date(); // haetaan päivä kk vuosi ym
var dd = String(today.getDate()).padStart(2, '0'); // haetaan päivä kk vuosi ym
var mm = String(today.getMonth() + 1).padStart(2, '0'); // haetaan päivä kk vuosi ym
var yyyy = today.getFullYear(); // haetaan päivä kk vuosi ym
today = yyyy + '-' + mm + '-' + dd //laietataan päivä oikeaan formattiin että html ymmärtää


//haetaan päivämäärä kalenteriin ettei voi valita vanhaa päivää huom window.onload
//haetaan vapaiden huoneiden määrä
window.onload = function(){
  document.getElementById('späivä').min = today //laitetaan päivämäärä min valueksi input kenttään späivä
  document.getElementById('lpäivä').min = today //laitetaan päivämäärä min valueksi input kenttään lpäivä

  //haetaan apista huoneiden jäljellä oleva määrä
  fetch("https://puntilachain.com/hotelli/varaus/huone", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
   
  })
  .then(response=>response.json())
  .then(data=>{
    //näytetään vapaat huoneet
   document.getElementById('standardVapaa').innerHTML = 'Vapaana ' + data.standard + ' Standard huonetta'
   document.getElementById('familyVapaa').innerHTML = 'Vapaana ' + data.family + ' Family huonetta'
   document.getElementById('deluxeVapaa').innerHTML = 'Vapaana ' + data.deluxe + ' Deluxe huonetta'
  })
} 

//varmistetaan ettei voi valita saapumispäivää pienempää
const addDays = (date) => {
  var result = new Date(date);
  result.setDate(result.getDate() + 1); // lisätään yksi päivä
  var year = result.toLocaleString("default", { year: "numeric" });
  var month = result.toLocaleString("default", { month: "2-digit" });
  var day = result.toLocaleString("default", { day: "2-digit" });
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate //palautetaan yksi suurempi päivä kuin saapuminen
}

//lisätään päivä onchange jälkeen
const onDateSelect = () =>{
  var späivä = document.getElementById('späivä').value
  var lpäivä = addDays(späivä)
  document.getElementById('lpäivä').min = lpäivä //laitetaan uusi min value lähtöpäivään
 
}


//Custom alertti kysytään että perutaanko vai varataanko
//onks tää pakollinen?? En usko että tätä tarvitsee
const customAlert = (e) =>{
  var custom = document.getElementById('custom') //haetaan customi div
  custom.style.display = 'flex'
  if(e=='cancel'){ //checkataan kumpi näytetään
  custom.innerHTML =  //vedetään boxiin nää elementit
  `<div>
  <h1>Olet peruuttammassa varauksen</h1>
  <p>Oletko varma että haluat peruuttaa?</P>
  <button onclick="window.location.href = '/index.html'">Peruuta varaus</button>
  <button style='margin-left:35%;' onclick="custom.style.display = 'none'">Jatka varausta</button>
  </div>
  `
  }
  if(e=='varaa'){ //checkataan kumpi näytetään
    custom.innerHTML =  //vedetään boxiin nää elementit
  `<div>
  <h1>Olet tekemässä varauksen</h1>
  <p>Vahvistetaanko varaus?</P>
  <button onclick="custom.style.display = 'none'">Takaisin</button>
  <button style='margin-left:35%;' onclick="submitForm()">Vahvista</button>
  </div>
  `
  }
}

// näytetään valitut itemit
const showSelectedItems = () =>{

  const retket = document.getElementsByName('retket')[0].value
  const retketLista = document.getElementById('retketLista')
  retketLista.style.display = ''
  if(retketLista.childNodes.length == 1){
  retketLista.innerHTML = //lisätään listaan
  `   <p>Retket</p>
  `}if(retketLista.childNodes.length > 1){
    if(retket == 'false'){

    }if( document.getElementById('veneretki') == null && retket == 'veneretki'){
    retketLista.innerHTML +=
  `<p id="${retket}">${retket} <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  }if( document.getElementById('kaupunkiretki') == null && retket == 'kaupunkiretki'){
    retketLista.innerHTML +=
  `<p id="${retket}">${retket} <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  }if( document.getElementById('museoretki') == null && retket == 'museoretki'){
    retketLista.innerHTML +=
  `<p id="${retket}">${retket} <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  }
  }
}

// näytetään valitut itemit
const showSelectedItems2 = () =>{

  const lisäpalvelut = document.getElementsByName('lisäpalvelut')[0].value
  const lpLista = document.getElementById('lisäpalvelutLista')
  lpLista.style.display = ''
  if(lpLista.childNodes.length == 1){
  lpLista.innerHTML = //lisätään listaan
  `   <p>Lisäpalvelut</p>
  `}if(lpLista.childNodes.length > 1){
    if(lisäpalvelut == 'false'){

    }if(document.getElementById('aamiainen') == null && lisäpalvelut == 'aamiainen'){
    lpLista.innerHTML +=
  `<p id="${lisäpalvelut}">${lisäpalvelut} <button id="${lisäpalvelut}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
    }if(document.getElementById('kuntosali') == null && lisäpalvelut == 'kuntosali'){
      lpLista.innerHTML +=
    `<p id="${lisäpalvelut}">${lisäpalvelut} <button id="${lisäpalvelut}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
      }if(document.getElementById('lentokenttä') == null && lisäpalvelut == 'lentokenttä'){
        lpLista.innerHTML +=
      `<p id="${lisäpalvelut}">${lisäpalvelut} <button id="${lisäpalvelut}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
      }
}
}

//poistetaan valitut
const removeItemsFromList = (e) =>{
  document.getElementById(`${e}`).remove()
  const retketLista = document.getElementById('retketLista')
  const lpLista = document.getElementById('lisäpalvelutLista')
  if(retketLista.childNodes.length == 3){
    retketLista.style.display = 'none'
    }
    if(lpLista.childNodes.length == 3){
      lpLista.style.display = 'none'
      }
}

//hoidetaan checkboxit niin että ei voi valita montaa
// tänne joku alertti jos ei huonetta valittu ollenkaan
const handleCheckbox = (e) =>{
  var checkBox1 = document.getElementById("standard")
  var checkBox2 = document.getElementById("family")
  var checkBox3 = document.getElementById("deluxe")
  //estetään monen valitseminen
  if(e == 'standard'){
    checkBox2.checked = false
    checkBox3.checked = false
  }
  if(e == 'family'){
    checkBox1.checked = false
    checkBox3.checked = false
  }
  if(e == 'deluxe'){
    checkBox2.checked = false
    checkBox1.checked = false
  }
  if(e == 'hae'){ //tää on apiin lähetystä varten
    if(checkBox1.checked){
      return checkBox1.id
    }
    if(checkBox2.checked){
      return checkBox2.id
    }
    if(checkBox3.checked){
      return checkBox3.id
    }
  }
}

//form submit heitetään form data apiin ja haetaan sieltä takasin dataa
const submitForm = async () =>{
    
    //haetaan formista input data
    const fname = document.getElementsByName("fname")[0].value
    const lname = document.getElementsByName("lname")[0].value
    const späivä = document.getElementsByName("späivä")[0].value
    const lpäivä = document.getElementsByName("lpäivä")[0].value
    const sposti = document.getElementsByName("sposti")[0].value
    const puhelin = document.getElementsByName("puhelin")[0].value
    const hlö = document.getElementsByName("hlö")[0].value
    const hlöLapset = document.getElementsByName("hlölapset")[0].value
    const lisäpalvelu = [document.getElementById("lentokenttä"), document.getElementById("kuntosali"), document.getElementById("aamiainen")]
    const retket = [document.getElementById("museoretki"), document.getElementById("kaupunkiretki"), document.getElementById("veneretki")]
    const huone = handleCheckbox('hae')
    let lisäpalvelutLista
    let retketLista

    //TÄHÄN VIELÄ PÄIVÄT RETKILLE / PALVELUILLE 

    let sendRes //tätä ei tarvii tapahtuu bäkin puolella
    //haetaan valitut palvelut
    for(let i = 0; i<lisäpalvelu.length; i++){
      if(lisäpalvelu[i] !== null){
        if(lisäpalvelutLista == null){
          lisäpalvelutLista = lisäpalvelu[i].id + '?'
        }else{
        lisäpalvelutLista = lisäpalvelutLista + lisäpalvelu[i].id + '?'
        }
      }
    }
    for(let i = 0; i<retket.length; i++){
      if(retket[i] !== null){
        if(retketLista == null){
          retketLista = retket[i].id + '?'
        }else{
        retketLista = retketLista + retket[i].id + '?'
        }
      }
    }
   //HUOM async funktio kantsii lukee mitä tekee
    try{
    fetch("https://puntilachain.com/hotelli/varaus", { //yhdistetään apiin
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            
            body: JSON.stringify({ // heitetään form data apiin bodyn mukana
              fname: fname,
              lname: lname,
              späivä: späivä,
              lpäivä:lpäivä,
              sposti: sposti,
              puhelin: puhelin,
              hlö: hlö,
              hlölapset: hlöLapset,
              lisäpalvelu: lisäpalvelutLista ? lisäpalvelutLista : false ,
              retket: retketLista ? retketLista : false,
              huone: huone
            }),
            cors:'cors'
          })
          .then(response=>response.json()) //ootetaan vastaus
          .then(data=>{ console.log(data.res); const url = `/vahvistus.html?resNum=${data.res}` ; window.location.href = url;}) //laitetaan vastaus eli varausnumero muuttujaan
    }catch(e){
        console.log(e) // console logataa error
    }
}

