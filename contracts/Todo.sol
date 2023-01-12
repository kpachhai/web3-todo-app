// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Todo {
    struct Task {
        string name;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    function addTask(string memory _name) public {
        tasks[taskCount] = Task(_name, false);
        taskCount++;
    }

    function completeTask(uint _taskId) public doesTaskExist(_taskId) {
        tasks[_taskId].completed = true;
    }

    function editTask(
        uint _taskId,
        string memory _name
    ) public doesTaskExist(_taskId) {
        tasks[_taskId].name = _name;
    }

    function deleteTask(uint _taskId) public doesTaskExist(_taskId) {
        delete tasks[_taskId];
        taskCount--;
    }

    modifier doesTaskExist(uint _taskId) {
        bytes memory name = bytes(tasks[_taskId].name);
        require(name.length != 0, "Task with that Id does not exist");
        _;
    }
}
