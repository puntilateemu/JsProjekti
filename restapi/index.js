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
        const späivä = 02/12/22; // korjataan päivät
        const lpäivä = 03/12/22; //korjataan päivät
        const sposti = req.body.sposti;
        const puhelin = req.body.puhelin;
        const hlö = req.body.hlö;
        const huon = 'superiore'; // vaihetaan myöhemmin
        const resnumber = 10; //tähän joku rändöm numero
        let conn;
        try {
        conn = await pool.getConnection();

        var query = `INSERT INTO varausttjs (etunimi, sukunimi, varausnumero, puhelin, sposti, saapuminen, lähtö, huone, hlömäärä) VALUES (?,?,?,?,?,?,?,?,?)`;

        var posts = await conn.query(query, [fname, lname, resnumber, puhelin, sposti, späivä, lpäivä, huon, hlö]);
        res.send('success');
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
    res.send(testiquery);
    } catch (err) {
            throw err;
    } finally {
            if (conn) return conn.release();
    }
});











app.listen(port,hostname, () => console.log(`Listening on port ${port}`));
