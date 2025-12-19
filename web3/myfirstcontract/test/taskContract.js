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
})