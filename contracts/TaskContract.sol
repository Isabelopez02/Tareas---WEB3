// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


contract TaskContract {

    uint public contador = 0;

    constructor () {
        createTask("ejemplo de tarea", "tengo que hacer algo");
    }

    event TaskCreate(
        uint id,
        string tittle,
        string descripcion,
        bool done,
        uint createdAt
    );

    // Atributos de la tarea
    struct Task{
        uint256 id;
        string tittle;
        string descripcion;
        bool done;
        uint256 createdAt;
    }

    mapping (uint256 => Task) public tasks;
    
    // Crear Tarea
    function createTask(string memory _tittle, string memory _descripcion) public {
        contador++;
        tasks[contador] = Task(contador, _tittle, _descripcion, false, block.timestamp);
        emit TaskCreate(contador, _tittle, _descripcion, false, block.timestamp);
    }

    // Cambiar estado
    function estadoTask(uint _id) public {
        Task memory _tarea = tasks[_id];
        _tarea.done = !_tarea.done;
        tasks[_id] = _tarea;
    }
}
