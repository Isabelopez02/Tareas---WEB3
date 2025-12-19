App = {
  contract: {},
  init: () => {
    console.log("cargando");
    App.loadEthereum();
    App.loadContract();
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      web3 = new web3(window.web3.currentProvider);
      console.log("Esto no es Ethereum");
    } else {
      console.log("no Instalado etherum");
    }
  },

  loadContract: async () => {
    const res = await fetch("TaskContract.json?v=" + Date.now());
    const taskContractJSON = await res.json();

    // LOG 1: Ver si el JSON tiene la red 5777
    console.log("Redes en el JSON:", taskContractJSON.networks);

    App.contract.taskContract = await TruffleContract(taskContractJSON);
    App.contract.taskContract.setProvider(App.web3Provider);

    // LOG 2: Ver en qué red está MetaMask según el navegador
    const networkId = await window.ethereum.request({ method: "net_version" });
    console.log("MetaMask está en la red:", networkId);

    try {
      App.taskContract = await App.contract.taskContract.deployed();
      console.log("¡Contrato cargado con éxito!", App.taskContract.address);
    } catch (error) {
      console.error(
        "Error de mismatch: El ID " + networkId + " no está en el JSON o el contrato no se migró."
      );
    }
  },
};

App.init();
