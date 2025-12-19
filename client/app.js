App = {
    init: () => {
        console.log('cargando')
        App.loadEthereum()
    },

    loadEthereum: async() =>{
        if (window.ethereum){
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method:'eth_requestAccounts' })
        }else{
            console.log('Esto no es Ethereum')
        }
    },

    loadContract : async()=> {
        const res = await fetch(TaskContract.json)
        const contratos = await res.json

        console.log('No entherum')
    }
}

App.init()