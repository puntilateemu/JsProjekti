
//haetaan rest Apista kaikki varaukseen liittyvä data
fetch("https://puntilachain.com/hotelli/varaus/admin", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  
    
   
  })
  .then(response=>response.json())
  .then(data=>{
     //loopilla näytetään response data apista
     // leiki console.log(data) jos haluut nähä mitä api palauttaa
     for (let user of data) {
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        td1.textContent =  user.etunimi;
        tr.appendChild(td1);
        
        let td2 = document.createElement('td');
        td2.textContent = user.sukunimi;
        tr.appendChild(td2);
        
        let td3 = document.createElement('td');
        td3.textContent = user.varausnumero;
        tr.appendChild(td3);

        let td10 = document.createElement('td');
        td10.textContent = user.id;
        tr.appendChild(td10);

        let td4 = document.createElement('td');
        td4.textContent = user.puhelin;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = user.sposti;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = user.saapuminen;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.textContent = user.lähtö;
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        td8.textContent = user.huone;
        tr.appendChild(td8);

        let td9 = document.createElement('td');
        td9.textContent = user.hlömäärä;
        tr.appendChild(td9);

        let td11 = document.createElement('td');
        td11.textContent = user.retket;
        tr.appendChild(td11);

        let td12 = document.createElement('td');
        td12.textContent = user.lisäpalvelut;
        tr.appendChild(td12);
        
        table.appendChild(tr);
    }
    })