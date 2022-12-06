const express = require('express');
const pool = require('./db');
const hostname = '127.0.0.1';
const app = express();
const port = 21289;
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//node api osoite https://puntilachain.com/hotelli/varaus
//Tähän tulee data clientin formista joka lähettää edelleen mariadb
//tähän myös saadaan haettua dataa mariadb ja lähetettyä takas clienttiin eli käyttäjälle
app.post('/varaus', async (req, res) => {

        const fname = req.body.fname;
	const lname = req.body.lname;
	const späivä = req.body.späivä;
	const lpäivä = req.body.lpäivä;
	const sposti = req.body.sposti;
	const puhelin = req.body.puhelin;
	const hlö = req.body.hlö;
	const hlöLapset = req.body.hlöLapset;
	const lentokenttä = req.body.lentokenttä;
	const aamiainen = req.body.aamiainen;
	const kuntosali = req.body.kuntosali;
	const museoretki = req.body.museoretki;
	const veneretki = req.body.veneretki;
	const kaupunkiretki = req.body.kaupunkiretki;
	const retket = req.body.retket;
	const huone = req.body.huone;
	const resNum = req.body.resnum;
        let conn;

        try {
        conn = await pool.getConnection();

	if(resNum){
		var updateQuery = `UPDATE varausttjs SET etunimi ='${fname}', sukunimi ='${lname}', puhelin = '${puhelin}', sposti ='${sposti}', huone ='${huone}', hlömäärä ='${hlö}' WHERE varausnumero ='${resNum}'`;
		await conn.query(updateQuery);

		var updateLisä = `UPDATE lisäpalvelu SET museoretki ='${museoretki}', veneretki ='${veneretki}', kaupunkiretki ='${kaupunkiretki}', aamiainen ='${aamiainen}', kuntosali ='${kuntosali}', lentokenttä ='${lentokenttä}' WHERE varaus ='${resNum}'`;
		await conn.query(updateLisä);

		var data ={
        	res: resNum
        	}
        	res.send(data);

	}else{
	const resnumber = Math.floor(Math.random() * 1000000) + 100;

        var query = `INSERT INTO varausttjs (etunimi, sukunimi, varausnumero, puhelin, sposti, saapuminen, lähtö, huone, hlömäärä) VALUES (?,?,?,?,?,?,?,?,?)`;

        await conn.query(query, [fname, lname, resnumber, puhelin, sposti, späivä, lpäivä, huone, hlö]);

	var varausQuery = `INSERT INTO lisäpalvelu (varaus, museoretki, veneretki, kaupunkiretki, aamiainen, kuntosali, lentokenttä) VALUES (?,?,?,?,?,?,?)`;

	await conn.query(varausQuery, [resnumber, museoretki, veneretki, kaupunkiretki, aamiainen, kuntosali, lentokenttä]);
	var data ={
	res: resnumber
	}
        res.send(data);
	}

        } catch (err) {
                throw err;
        } finally {
                if (conn) return conn.release();
        }
});

//haetaan vapaiden huoneiden määrä
app.post('/varaus/huone', async (req, res) => {
        let conn;
	let count ={
	standard: 20,
	family: 20,
	deluxe: 20,
	}
        try {
        conn = await pool.getConnection();

        var standard = 'SELECT huone FROM varausttjs where huone="standard" or huone="deluxe" or huone="family"';

        var huoneet = await conn.query(standard);
	for(let i = 0; i<huoneet.length;i++){
	if(huoneet[i].huone == 'standard'){
	count.standard--
	}if(huoneet[i].huone == 'family'){
	count.family--
	}if(huoneet[i].huone == 'deluxe'){
	count.deluxe--
	}
	}
        res.send(count);
        } catch (err) {
                throw err;
        } finally {
                if (conn) return conn.release();
        }
});

//haetaan olemassa oleva varaus
app.post('/varaus/muuta', async (req, res) => {
	const resNum = req.body.resnum;
        let conn;


        try {
        conn = await pool.getConnection();

        var testi = `SELECT * FROM varausttjs WHERE varausnumero ='${resNum}'`;

        var testiquery = await conn.query(testi);

        var query = `SELECT * FROM lisäpalvelu WHERE varaus ='${resNum}'`;

        var lisäQuery = await conn.query(query);

	var lähetys ={
		...testiquery[0],
		...lisäQuery[0]
	}


        res.send(lähetys);
        } catch (err) {
                throw err;
        } finally {
                if (conn) return conn.release();
        }
});



//haetaan dataa Admin sivulle
app.post('/varaus/admin', async (req, res) => {
        let conn;
        try {
        conn = await pool.getConnection();

        var testi = 'SELECT * FROM varausttjs';

        var testiquery = await conn.query(testi);

	var query = 'SELECT * FROM lisäpalvelu';

	var lisäQuery = await conn.query(query);

        res.send(testiquery);
        } catch (err) {
                throw err;
        } finally {
                if (conn) return conn.release();
        }
});











app.listen(port,hostname, () => console.log(`Listening on port ${port}`));
