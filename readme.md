# Hautausmaakierros-frontend

Projekti on tehty syventävien opintojen harjoitustyönä. Frontending lisäksi on olemassa backend sovellus (https://github.com/ropm/fmprojbackend).

## Frontendin kuvaus:

- React
- React router
- Context API
- Maplibre-gl
- Netlify

Sovellus on tehty Reactilla, ilman TypeScriptiä. App.jsx sisältää React routerin reitit sekä contextien providerit, joiden avulla data liikkuu sovelluksessa.

### JWT auth yleisesti

authInterceptor() tarkistaa jokaista backend-kutsua ennen jwt-tokenin luotettavuuden ja keston, jos kesto on loppumassa, interceptor ottaa automaattisesti uuden yhteyden backendiin ja hakee refresh-tokenilla uuden access-tokenin.

Tokenit tallennetaan localstorageen ja lähetetään jokaisen http-pyynnön Authorization-headerissa backendille.

### API-kutsut

API-kutsut lähetetään backendille axios-kirjaston avulla asynkronisesti.

### Karttakirjasto

Karttakirjastona käytettiin Maplibre-gl open source kirjastoa, joka pohjautuu Mapboxiin. Tämän integroiminen Reactiin ei ollutkaan ihan helppoa, koska React renderöi aina uuden Map-komponentin, kun tietoja muutettiin sovelluksessa, jonka takia MapPage.jsx osiossa on liian monta useEffect-hookkia ja osa sovelluksen statesta on paikallisina muuttujina (let currents, let pts), mikä ei ole hyvä asia.

### Kehitysympäristö

Kehitysympäristön saa käyntiin ajamalla <code>npm install</code> joka asentaa projektin komponentit.

Sitten täytyy jokaiseen axios-kutsuun vaihtaa oman backendin osoite, localhost tai ulkoinen osoite, kunhan se deploymentin yhteydessä on ulkoinen osoite. Tämä ei ole hyvä tapa toteuttaa tämä, vaan kannattaisi olla yksi yleinen axios-instanssi, jolle on asetettuna baseURL, johon http-pyynnöt lähtevät.

Tämän jälkeen ympäristö käynnistyy <code>npm run dev</code> komennolla. Sovellus avautuu oletuksena localhost:3000 osoitteeseen.

### Deployment

Sovelluksen "tuotantoversio" on deployattu Netlify-palveluun. Deploymentti on automaattinen kun github-repositoryyn pushataan uusia muutoksia. Deploymentti on helppo luoda, se onnistuu luomalla käyttäjätunnuksen sivulle ja tekemällä ohjeiden mukaisen helpon github-hookin (Add new site -> Import existing project -> Github).

Osoite: https://joyful-mousse-646cb7.netlify.app/

### Jatkokehitys

- Axios instanssi (https://rapidapi.com/guides/custom-axios-instance)
- Pisteiden poisto
- Pisteiden tietojen syöttö niitä luodessa
- Toinen karttakirjasto (tai olemassa olevien ongelmien korjaus tälle)
