const { addonBuilder } = require("stremio-addon-sdk")
st = require("./strm")
film = st()
cata = require("./cat")
cat = cata()

// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
const manifest = {
	"id": "community.Deivison",
	"version": "0.0.2",
	"catalogs": [
		{
			"type": "movie",
			"id": "top"
		}
	],
	"resources": [
		"catalog",
		"stream"
	],
	"types": [
		"movie"
	],
	"name": "Deivison",
	"description": "Filmes"
}
const builder = new addonBuilder(manifest)

builder.defineCatalogHandler(({type, id, extra}) => {
	console.log("request for catalogs: "+type+" "+id)

	
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineCatalogHandler.md
	return Promise.resolve({ metas: cat })
})


builder.defineStreamHandler(({type, id}) => {
    // Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md

	if (type === "movie"){
		const stream = film[id][0]
		return Promise.resolve({ streams: [stream] })
    }
})

module.exports = builder.getInterface()