const { addonBuilder } = require("stremio-addon-sdk")

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
	return Promise.resolve({ metas: [
		{
			id: "tt1254207",
			type: "movie",
			name: "The Big Buck Bunny",
			poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg"
		},
		{
			id: "tt9411866",
			type: "movie",
			name: "The Roads Not Taken",
			poster: "https://m.media-amazon.com/images/M/MV5BZDI0YmUzZTctNmQwNi00ZDk3LWExY2MtZGMyMmQ1Mjc5OGE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,677,1000_AL_.jpg"
		}



	] })
})

builder.defineStreamHandler(({type, id}) => {
	console.log("request for streams: "+type+" "+id)
	// Docs: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/requests/defineStreamHandler.md
	if (type === "movie" && id === "tt1254207") {
		// serve one stream to big buck bunny
		const stream = { url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" }
		return Promise.resolve({ streams: [stream] })
	}
	if (type === "movie" && id === "tt9411866") {
		// serve one stream to big buck bunny
		const stream = { infoHash:"3b33f13f7f7a89794ae286f139b6eff776c90267",
		title:"torrent"}
		return Promise.resolve({ streams: [stream] })
	}

	// otherwise return no streams
	return Promise.resolve({ streams: [] })
})

module.exports = builder.getInterface()