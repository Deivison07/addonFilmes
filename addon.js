const { addonBuilder } = require("stremio-addon-sdk")
const sqlite3 = require('./aa-sqlite')
// open the database
sqlite3.open('./streams.db');

catal = require("./cat")
cat = catal()

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
	"id": "community.FilmesDublados",
	"version": "0.0.1",
	"catalogs": [
		{
			"type": "movie",
			"id": "coisas"
		},
		{
			"type": "movie",
			"id": "legal"
		}

	],
	"resources": [
		"catalog",
		"stream"
	],
	"types": [
		"movie",
		"series"
	],
	"name": "FilmesDublados",
	"description": "Dublados"
}
const builder = new addonBuilder(manifest)

builder.defineCatalogHandler(({type, id, extra}) => {
	console.log("request for catalogs: "+type+" "+id)
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineCatalogHandler.md
	
	//console.log(cat)
	return Promise.resolve({ metas:  cat })
})


builder.defineStreamHandler(async({type, id}) =>  {
	console.log(id) 
    // Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md
	
	var sql = "SELECT infoHash as infoHash, title as title FROM stream WHERE imdbId  = ? ";

	r = await sqlite3.all(sql, [id])

	return  Promise.resolve({ streams: [r[0]] })
	
})

module.exports = builder.getInterface()