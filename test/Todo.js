const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Todo', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [user1, user2] = await ethers.getSigners()

    const Todo = await ethers.getContractFactory('Todo')
    const todo = await Todo.deploy()

    return { todo, user1, user2 }
  }

  async function helperCreateTask(todo, taskName) {
    const tx = await todo.addTask(taskName)
    await tx.wait()
  }

  describe('addTask', function () {
    it('Should create a new task', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Add a new task
      const taskName = 'task1'
      const tx = await todo.addTask(taskName)
      await tx.wait()

      // Check for the result
      const totalNumOfTasks = await todo.taskCount()
      const actualTask = await todo.tasks(0)

      expect(totalNumOfTasks).to.equal(1)
      expect(actualTask.name).to.equal(taskName)
      expect(actualTask.completed).to.be.false
    })
  })

  describe('completeTask', function () {
    it('Should complete the existing task', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Add a new task
      const taskName = 'task1'
      await helperCreateTask(todo, taskName)

      // Complete the task
      const tx = await todo.completeTask(0)
      await tx.wait()

      // Get the "completed" value
      const actualTask = await todo.tasks(0)

      expect(actualTask.completed).to.be.true
    })
  })

  describe('completeTask', function () {
    it('Should revert the tx when a user tries to complete a task that does not exist', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Try completing a task that doesn't exist
      const taskId = 0
      await expect(todo.completeTask(taskId)).to.be.revertedWith(
        'Task with that Id does not exist'
      )
    })
  })

  describe('editTask', function () {
    it('Should edit the existing task', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Add a new task
      const taskName = 'task1'
      await helperCreateTask(todo, taskName)

      // Edit the task
      const newTaskName = 'newTask1'
      const tx = await todo.editTask(0, newTaskName)
      await tx.wait()

      // Check for the result
      const actualTask = await todo.tasks(0)

      expect(actualTask.name).to.equal(newTaskName)
    })
  })

  describe('editTask', function () {
    it('Should revert the tx when a user tries to edit a task that does not exist', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Try editing a task that doesn't exist
      const taskId = 0
      const newTaskName = 'newTask1'
      await expect(todo.editTask(taskId, newTaskName)).to.be.revertedWith(
        'Task with that Id does not exist'
      )
    })
  })

  describe('deleteTask', function () {
    it('Should delete the existing task', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Add a new task
      const taskName = 'task1'
      await helperCreateTask(todo, taskName)

      // Check for the result before
      let totalNumOfTasks = await todo.taskCount()
      let actualTask = await todo.tasks(0)

      expect(totalNumOfTasks).to.equal(1)
      expect(actualTask.name).to.equal(taskName)
      expect(actualTask.completed).to.be.false

      // Delete the task
      const tx = await todo.deleteTask(0)
      await tx.wait()

      // Check for the result after
      totalNumOfTasks = await todo.taskCount()
      actualTask = await todo.tasks(0)

      expect(totalNumOfTasks).to.equal(0)
    })
  })

  describe('deleteTask', function () {
    it('Should revert the tx when a user tries to delete a task that does not exist', async function () {
      const { todo } = await loadFixture(deployFixture)

      // Try deleting a task that doesn't exist
      const taskId = 0
      await expect(todo.deleteTask(taskId)).to.be.revertedWith(
        'Task with that Id does not exist'
      )
    })
  })
})
