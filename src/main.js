
const inputChange = document.querySelector('.search')
const submitForm = document.querySelector('.form-submit')
const playerContainer = document.querySelector('.player-container')
const playerFinder = document.querySelector('.player')
let idPlayer = ''


function findId(id){
    idPlayer = id
    sessionStorage.setItem("id", idPlayer)
    
    
    
    
    
}


submitForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const test = `<h1>Test</>`
    const players = inputChange.value.split(" ").join("_")
    let url = `https://www.balldontlie.io/api/v1/players?search=${players}`
    let results = null
    let playerNames = []

    try {
        results = await axios(url, {
            headers:{
                Accept: 'application/json'
            }
        })
        playerNames = results.data.data

        const tempPlayers = playerNames.map(player => {
           
            return `<div class = "player">
            <h2>${player.first_name} ${player.last_name}</h2>
            <a onclick = "findId('${player.id}')" href = "stats.html">See Stats</a>
            <div class = "stats"></div>
            </div>`
        })

        playerContainer.innerHTML = tempPlayers

        // playerNames.map(each => playerContainer.innerHTML += each.first_name)
        // playerContainer.innerHTML = playerNames
        
    } catch (error) {
        
    }
    
    

    
    
    console.log(idPlayer)
})



