

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
    
   //HUOM async funktio kantsii lukee mitä tekee
    try{
    fetch("https://puntilachain.com/hotelli/varaus", { //yhdistetään apiin
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            
            body: JSON.stringify({ // heitetään form data apiin
              fname: fname,
              lname: lname,
              späivä: späivä,
              lpäivä:lpäivä,
              sposti: sposti,
              puhelin: puhelin,
              hlö: hlö,
            }),
            cors:'no-cors'
          })
          .then(response=>response.json()) //ootetaan vastaus
          .then(data=>{ console.log('success'); }) // console logataan vastaus toistaseks
    }catch(e){
        console.log(e) // console logataa error
    }
    
}

