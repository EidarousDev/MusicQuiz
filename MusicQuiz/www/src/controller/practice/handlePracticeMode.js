function getSongToPractice(callback) {
    var arr = [];
    // add new array of dataType
    for (i = 0; i < MQ.data.length; i++) {
        arr[i] = MQ.data[i];
    };
    // splice songChoiced Previous
    for (i = 0; i < MQ.indexSongChoiced.length; i++) {
        // if(MQ.indexSongChoiced[i])
        // console.log(arr[MQ.indexSongChoiced[i]]);
        arr.splice(MQ.indexSongChoiced[i], 1);
    };
    //get song to ask
    let random = Math.floor(Math.random() * (MQ.configs.SONG_NUMBER - MQ.indexSongChoiced.length));
    MQ.songChoiced = arr[random];
    MQ.indexSongChoiced.push(random);
    // arr.splice(random, 1);
    var arrNotRandom = [
        {
            "song": MQ.songChoiced.Song1,
            "singer": MQ.songChoiced.Singer1
        },
        {
            "song": MQ.songChoiced.Song2,
            "singer": MQ.songChoiced.Singer2
        },
        {
            "song": MQ.songChoiced.Song3,
            "singer": MQ.songChoiced.Singer3
        },
        {
            "song": MQ.songChoiced.Song4,
            "singer": MQ.songChoiced.Singer4
        }
    ];
    MQ.songRandomChoiced = [];
    for (i = 0; i < 3; i++) {
        let randomChoiced = Math.floor(Math.random() * arrNotRandom.length);
        let obj = arrNotRandom[randomChoiced];
        arrNotRandom.splice(randomChoiced, 1);
        MQ.songRandomChoiced[i] = obj;
        if (i == 2) {
            MQ.songRandomChoiced[3] = arrNotRandom[0];
        }
    }
    // console.log(MQ.songChoiced);
    // console.log(MQ.songRandomChoiced);
    // console.log(MQ.timeAnswerSaveToData);
    // MQ.songChoicedList.push(MQ.songChoiced);
    // MQ.songRandomChoicedList.push(MQ.songRandomChoiced);
    callback();
}
function updatePracticeMode(val) {
    $.ajax(
        {
            url: `https://api.mlab.com/api/1/databases/musicquizdb/collections/users/${MQ.oidUserData}?apiKey=2q6U8mj4cR8XJyuoS4TZkUy_lR5Lu14p`,
            data: JSON.stringify({
                "$set": { "practiceModeScore": val }
            }),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            }
        });
}