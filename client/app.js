
App = {
  contract: {},
  init: async () => {
    console.log("cargando");
    await App.loadEthereum();
    await App.loadContract();
    await App.loadCuenta();
    await App.render();
    await App.renderTask();
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

  loadCuenta: async () => {
    const cuenta = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.cuenta = cuenta[0];
    console.log("Cuenta conectada:", App.cuenta);
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
        "Error de mismatch: El ID " +
          networkId +
          " no está en el JSON o el contrato no se migró."
      );
    }
  },

  // Mostrar la cuenta en el html
  render: () => {
    document.getElementById("account").innerText = App.cuenta;
  },

  renderTask: async () => {
    const contarTarea = await App.taskContract.contador();
    const numeroTarea = contarTarea.toNumber();
    console.log(numeroTarea);

    let html = "";

    for (let i = 1; i <= numeroTarea; i++) {
      const task = await App.taskContract.tasks(i);
      const tareaId = task[0].toNumber();
      const tareaTitle = task[1];
      const tareaDescripcion = task[2];
      const tareaHecha = task[3];
      const tareaCreada = task[4].toNumber();

      let taskElement = `
      <div class="task-card">
  <div class="task-card-header">
    <span class="task-card-title">${tareaTitle}</span>
    <div class="form-check form-switch task-card-switch">
      <input class="form-check-input" type="checkbox" data-id="${tareaId}" 
        ${tareaHecha && "checked"} 
        onchange="App.toggleDone(this)"
      />
    </div>
  </div>
  <div class="task-card-body">
    <p>${tareaDescripcion}</p>
    <small>Creado: ${new Date(tareaCreada * 1000).toLocaleString()}</small>
  </div>
</div>

    `;
    html += taskElement;
  }

    document.querySelector('#taskList').innerHTML = html;
  },

  createTask: async (tittle, descripcion) => {
    try {
      const resultado = await App.taskContract.createTask(tittle, descripcion, {
        from: App.cuenta,
      });

      console.log("Tarea creada:", resultado.logs[0].args);
    } catch (error) {
      // Si sale un error de "out of gas", intenta agregar un límite manual:
      console.error("Error detallado:", error);
    }
  },

  toggleDone: async(element) => {
    const tareaId = element.dataset.id;

    await App.taskContract.estadoTask(tareaId, {
        from: App.cuenta
    });

    window.location.reload();
  }
};

