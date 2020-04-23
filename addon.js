const { addonBuilder } = require("stremio-addon-sdk")
st = require("./strm")
film = st()
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
		"movie"
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


builder.defineStreamHandler(({type, id}) => {
    // Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie"){
			
			const stream = film[id][0]
			return Promise.resolve({ streams: [stream] })
    }
})

module.exports = builder.getInterface()