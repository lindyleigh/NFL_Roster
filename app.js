new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)

function ready(dataStore) {
 var query = '';

    $('form').on('submit', function (event) {
    event.preventDefault();
    var form = this;
    query = form.infoInput.value;
    newInput = dataStore.getPlayersBySomeValue(query)
    update(newInput, '.player-roster');
})

    $('.player-roster').on('click', '.btn-success', function() {
        dataStore.addToTeam(this.id);
        restoreData();
    })

    $('.my-team').on('click', '.btn-danger', function () {
        dataStore.removePlayer(this.id);
        restoreData();
    
    })

    function restoreData(){
        newInput = dataStore.getPlayersBySomeValue(query)
        update(newInput, '.player-roster');
        update(dataStore.getMyTeam(), '.my-team');
    }

    function update(list, target) {
        var playersElem = $(target)
        playersElem.empty();

        for (var i in list) {
            console.log(list)
            var currentPlayer = list[i];
            console.log(currentPlayer);

            var nflTemplate = `
            <div class="player-card">
                <img src="${currentPlayer.photo}" width="140"/>
                <h5>Name: ${currentPlayer.fullname}</h5>
                <h5>Position: ${currentPlayer.position}</h5>
                <h5>Bye Week: ${currentPlayer.bye_week}</h5>
                <div>
                <button class="btn btn-success" id="${currentPlayer.id}">Add</button>
                </div>
            </div>
            `

            var myNflTemplate = `
            <div class="player-card">
                <img src="${currentPlayer.photo}" width="140"/>
                <h5>Name: ${currentPlayer.fullname}</h5>
                <h5>Position: ${currentPlayer.position}</h5>
                <h5>Bye Week: ${currentPlayer.bye_week}</h5>
                <div>
                <button class="btn btn-danger" id="${currentPlayer.id}">Remove</button>
                </div>
            </div>
            `
            playersElem.append(target == '.player-roster' ? nflTemplate : myNflTemplate)
        }
    }
}




