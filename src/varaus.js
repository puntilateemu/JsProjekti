
var today = new Date(); // haetaan päivä kk vuosi ym
var dd = String(today.getDate()).padStart(2, '0'); // haetaan päivä kk vuosi ym
var mm = String(today.getMonth() + 1).padStart(2, '0'); // haetaan päivä kk vuosi ym
var yyyy = today.getFullYear(); // haetaan päivä kk vuosi ym
today = yyyy + '-' + mm + '-' + dd //laietataan päivä oikeaan formattiin että html ymmärtää


//haetaan päivämäärä kalenteriin ettei voi valita vanhaa päivää huom window.onload
window.onload = function(){
  document.getElementById('späivä').min = today //laitetaan päivämäärä min valueksi input kenttään späivä
  document.getElementById('lpäivä').min = today //laitetaan päivämäärä min valueksi input kenttään lpäivä
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
  console.log(e)
  document.getElementById(`${e}`).remove()
  const retketLista = document.getElementById('retketLista')
  console.log(retketLista.childNodes.length)
  if(retketLista.childNodes.length == 3){
    retketLista.style.display = 'none'
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
    const lisäpalvelu = document.getElementsByName("lisäpalvelu")[0].value
    const retket = document.getElementsByName("retket")[0].value
    
   //HUOM async funktio kantsii lukee mitä tekee
    try{
    /*fetch("https://puntilachain.com/hotelli/varaus", { //yhdistetään apiin
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
              lisäpalvelu: lisäpalvelu,
              retket: retket
            }),
            cors:'no-cors'
          })
          .then(response=>response.json()) //ootetaan vastaus
          .then(data=>{ console.log('success'); }) //laitetaan vastaus eli varausnumero muuttujaan*/
    }catch(e){
        console.log(e) // console logataa error
    }finally{ //sitku pyyntö valmis ni redirectataan vahvistus.html missä urlin mukana vahvitus numero
      var testi = 4534
      const url = `/vahvistus.html?resNum=${testi}` // kyssärin jälkeen voidaan laittaa urliin kaikkee mukaan
      window.location.href = url;
    }
}

