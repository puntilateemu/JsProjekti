
var today = new Date(); // haetaan päivä kk vuosi ym
var dd = String(today.getDate()).padStart(2, '0'); // haetaan päivä kk vuosi ym
var mm = String(today.getMonth() + 1).padStart(2, '0'); // haetaan päivä kk vuosi ym
var yyyy = today.getFullYear(); // haetaan päivä kk vuosi ym
today = yyyy + '-' + mm + '-' + dd //laietataan päivä oikeaan formattiin että html ymmärtää

let varausNum; // tähän laitetaan muuta varausta numero

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

//Muutetaan Varausta jutut

const changeRes = () =>{

  var custom = document.getElementById('muutavaraus') //haetaan customi div
  custom.style.display = 'flex'
  custom.style.bottom = '0'
  custom.style.top = '50%'
  custom.innerHTML =  //vedetään boxiin nää elementit
  `<div>
  <h1>Syötä varauksen numero</h1>
  <input style="color:white;border-color:white;" class="inputStyle" type="text" id="resnum" name="resnum">
  <div style="display: flex;flex-direction: row;">
  <button style='margin-left:25%; margin-top:4%;' onclick="muutavaraus.style.display = 'none'">Peruuta</button>
  <button style='margin-left:5%; margin-top:4%;' onclick="muutavaraus.style.display = 'none';getRes();">Hae Varaus</button>
  </div>
  </div>
  `
}

//haetaan varauksen tiedot lomakkeeseen
const getRes = () =>{
  const resNum = document.getElementsByName("resnum")[0].value //input value


  //haetaan apista varaus tiedot lomakkeeseen
  fetch("https://puntilachain.com/hotelli/varaus/muuta", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ // heitetään form data apiin bodyn mukana
      resnum: resNum
    }),
    cors:'cors'
   
  })
  .then(response=>response.json())
  .then(data=>{
    if(data.etunimi){
    //laitetaan inputteihin valuet
    varausNum = data.varausnumero
    document.getElementsByName("fname")[0].value = data.etunimi
    document.getElementsByName("lname")[0].value = data.sukunimi
    document.getElementsByName("späivä")[0].value = data.saapuminen
    document.getElementsByName("späivä")[0].readOnly =true
    document.getElementsByName("lpäivä")[0].value = data.lähtö
    document.getElementsByName("lpäivä")[0].readOnly =true
    document.getElementsByName("sposti")[0].value = data.sposti
    document.getElementsByName("puhelin")[0].value = data.puhelin
    document.getElementsByName("hlö")[0].value = data.hlömäärä
   
    if(data.lentokenttä !=='false'){
      document.getElementsByName('lisäpalvelut')[0].value = 'lentokenttä'
      showSelectedItems2()
    }
    if(data.kuntosali !=='false'){
      document.getElementsByName('lisäpalvelut')[0].value = 'kuntosali'
      showSelectedItems2()
    }
    if(data.aamiainen !=='false'){
      document.getElementsByName('lisäpalvelut')[0].value = 'aamiainen'
      showSelectedItems2()
    }
    if(data.veneretki !=='false'){
      document.getElementsByName('retket')[0].value = 'veneretki'
      showSelectedItems()
      document.getElementById("venepäivä").value = data.veneretki
    }
    if(data.museoretki !=='false'){
      document.getElementsByName('retket')[0].value = 'museoretki'
      showSelectedItems()
      document.getElementById("museopäivä").value = data.museoretki
    }
    if(data.kaupunkiretki !=='false'){
      document.getElementsByName('retket')[0].value = 'kaupunkiretki'
      showSelectedItems()
      document.getElementById("kaupunkipäivä").value = data.kaupunkiretki
    }
    if(data.huone =='standard'){
      document.getElementById("standard").checked =true
    }
    if(data.huone =='family'){
      document.getElementById("family").checked =true
    }
    if(data.huone =='deluxe'){
      document.getElementById("deluxe").checked =true
    }
}else{
  varausNum = ''
}
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

//Varmistetaan lisäpalvelut päivä valinnat
const addDaysExtra = (date) => {
  var result = new Date(date);
  result.setDate(result.getDate()); // lisätään yksi päivä
  var year = result.toLocaleString("default", { year: "numeric" });
  var month = result.toLocaleString("default", { month: "2-digit" });
  var day = result.toLocaleString("default", { day: "2-digit" });
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate //palautetaan yksi suurempi päivä kuin saapuminen
}

//Laitetaan min ja max päivät lisäpalveluihin ja retkiin
const onDateSelectExtra = (id) =>{
  var späivä = document.getElementById('späivä').value
  var lpäivä = document.getElementById('lpäivä').value
  var sPäivät = addDaysExtra(späivä)
  var lPäivät = addDaysExtra(lpäivä)
  document.getElementById(`${id}`).min = sPäivät //laitetaan uusi min value
  document.getElementById(`${id}`).max = lPäivät //laitetaan uusi max value
}

//Custom alertti kysytään että perutaanko vai varataanko
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
  `<p id="${retket}">${retket}
  <input class="palvelutPäivät" type="date" id="venepäivä" name="venepäivä">
  <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  onDateSelectExtra("venepäivä")
  }if( document.getElementById('kaupunkiretki') == null && retket == 'kaupunkiretki'){
    retketLista.innerHTML +=
  `<p id="${retket}">${retket}
  <input class="palvelutPäivät" type="date" id="kaupunkipäivä" name="kaupunkipäivä">
  <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  onDateSelectExtra("kaupunkipäivä")
  }if( document.getElementById('museoretki') == null && retket == 'museoretki'){
    retketLista.innerHTML +=
  `<p id="${retket}">${retket}
  <input class="palvelutPäivät" type="date" id="museopäivä" name="museopäivä">
  <button id="${retket}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
  onDateSelectExtra("museopäivä")
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
    `<p id="${lisäpalvelut}">${lisäpalvelut}                         
     <button id="${lisäpalvelut}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>
     `
      }if(document.getElementById('lentokenttä') == null && lisäpalvelut == 'lentokenttä'){
        lpLista.innerHTML +=
      `<p id="${lisäpalvelut}">${lisäpalvelut} <button id="${lisäpalvelut}" aria-label='delete item' onClick='removeItemsFromList(this.id)' type='button'>X</button></p>`
      }
}
}




//poistetaan valitut
const removeItemsFromList = (e) =>{
  document.getElementById(`${e}`).remove()
  
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
    const lisäpalvelu =
     {
      lentokenttä: document.getElementById("lentokenttä"),
      kuntosali: document.getElementById("kuntosali"),
      aamiainen: document.getElementById("aamiainen")
    }
    const retket = {
      museoretki: document.getElementById("museopäivä")? document.getElementById("museopäivä").value : 'false',
      kaupunkiretki: document.getElementById("kaupunkipäivä")? document.getElementById("kaupunkipäivä").value : 'false',
      veneretki: document.getElementById("venepäivä") ? document.getElementById("venepäivä").value : 'false'
    }
    const huone = handleCheckbox('hae')

    
    
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
              lentokenttä: lisäpalvelu.lentokenttä ? JSON.parse(JSON.stringify(`haku ${späivä} vienti ${lpäivä}`)) : false ,
              kuntosali: lisäpalvelu.kuntosali ? `alkaa ${späivä}, päättyy ${lpäivä}` : false ,
              aamiainen: lisäpalvelu.aamiainen ? `alkaa ${späivä}, päättyy ${lpäivä}` : false ,
              museoretki: retket.museoretki ? retket.museoretki : false,
              veneretki: retket.veneretki ? retket.veneretki : false,
              kaupunkiretki:  retket.kaupunkiretki ? retket.kaupunkiretki : false,
              huone: huone,
              resnum: varausNum
            }),
            cors:'cors'
          })
          .then(response=>response.json()) //ootetaan vastaus
          .then(data=>{ console.log(data.res); const url = `/vahvistus.html?resNum=${data.res}` ; window.location.href = url;}) //laitetaan vastaus eli varausnumero muuttujaan
    }catch(e){
        console.log(e) // console logataa error
    }
}

