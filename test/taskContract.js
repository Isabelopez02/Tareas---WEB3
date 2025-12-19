const TaskContract = artifacts.require("TaskContract")
contract("TaskContract", () =>{

    // Antes de todo
    before (async () => {
        this.taskContract = await TaskContract.deployed()
    })

    // Cndiciones a cumplir para que sea correcto
    it('depliegue correcto', async () => {
        const address = this.taskContract.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");

    })

    it('Obtener lista de tareas', async () => {
        const contador = await this.taskContract.contador();
        const tarea = await this.taskContract.tasks(contador);

        // Cndiciones a cumplir para que sea correcto
        assert.equal(tarea.id.toNumber(), contador);
    })

    it ('Funcion crear correcta', async () => {
        const crear = await this.taskContract.createTask(
            "tarea2",
            "Descripcion2"
        );
        const tareaEvento = crear.logs[0].args;
        const counter = await this.taskContract.contador();
        assert.equal(counter, 2);
        assert.equal(tareaEvento.id.toNumber(), 2);
        assert.equal(tareaEvento.tittle, "tarea2");
        assert.equal(tareaEvento.descripcion, "Descripcion2")

    })
})
