function PlayerService(url, callWhenDone) {

    if (typeof callWhenDone !== 'function') {
        console.log('Error: you must provide a function to call when done')
        return 'Error: you must provide a function to call when done'
    }

    var dataStore = this;
    var playerRoster = [];
    var myTeam = {};

    dataStore.getMyTeam = function (){
        return myTeam;
    }

    dataStore.getPlayerRoster = function(){
        return playerRoster.slice(0,50);
    }

    dataStore.getPlayersBySomeValue = function (value) {
        var team = [];
        for (var i = 0; i < playerRoster.length; i++) {
            var currentPlayer = playerRoster[i];
            var hasValue = false;
            for (var prop in currentPlayer) {
                if (typeof currentPlayer[prop] === 'string' && currentPlayer[prop].toLowerCase() === value.toLowerCase()) {
                    hasValue = true;
                }
            }
            if (hasValue) {
                team.push(currentPlayer)
            }
        }
        return team;
    }

    dataStore.addToTeam = function(id){
        for (var i = 0; i < playerRoster.length; i++) {
            var currentPlayer = playerRoster[i];

            if(currentPlayer.id == id) {
                myTeam[id] = currentPlayer;
                playerRoster.splice(i, 1);
            }
        }
    }

    dataStore.removePlayer = function(id) {

        var player = myTeam[id];
        playerRoster.push(player);
        delete myTeam[id];
    }

    function goGetData() {
        console.log('getting data')
        var BCWServer = "http://bcw-getter.herokuapp.com/?url=";
        var modifiedUrl = BCWServer + encodeURIComponent(url);
        var data = localStorage.getItem('playerRoster');

        if (data) {
            playerRoster = JSON.parse(data)
            return callWhenDone(dataStore);
        }

        $.get(modifiedUrl, function (response) {
            var data = JSON.parse(response)
            playerRoster = data.body.players.filter(function (player) {
                if (player.pro_status === 'A') {
                    return player
                }
            })
            localStorage.setItem('playerRoster', JSON.stringify(playerRoster))
            callWhenDone(dataStore)
        })
    }

    goGetData()

}

    
