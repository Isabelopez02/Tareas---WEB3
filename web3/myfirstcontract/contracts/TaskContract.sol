// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


contract TaskContract {

    uint public contador = 0;

    constructor () {
        createTask("ejemplo de tarea", "tengo que hacer algo");
    }

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
    function createTask(string memory _title, string memory _descipcion) public {
        contador++;
        tasks[contador] = Task(contador, _title, _descipcion, false, block.timestamp);
    }

    // Cambiar estado
    function estadoTask(uint _id) public {
        Task memory _tarea = tasks[_id];
        _tarea.done = !_tarea.done;
        tasks[_id] = _tarea;
    }
}