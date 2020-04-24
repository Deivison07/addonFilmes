const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./chinook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

var streams = function() {
    
 return {
    
    tt1254207:[
        { url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" }
    ],
    tt9411866:[

        {infoHash:"3b33f13f7f7a89794ae286f139b6eff776c90267",title:"torrent"}
    ]
}
}

module.exports = streams