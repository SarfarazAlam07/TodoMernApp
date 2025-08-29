const todoModel = require("../models/todoModel");

// Create  Todo
const createTodoController = async (req, res) => {
  try {
    const { title, discription, createdBy } = req.body;
    if (!title || !discription) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const todo = new todoModel({ title, discription, createdBy });
    const result = await todo.save();

    res.status(201).send({
      success: true,
      message: "Todo created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create todo api",
      error,
    });
  }
};

// get todo
const getTodoController = async (req, res) => {
  try {
    // get user id
    const { userId } = req.params;
    //validate
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "NO user Found with this user id",
      });
    }

    // find task
    const todos = await todoModel.find({ createdBy: userId });

    if (!todos || todos.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No todos found ",
      });
    }
    res.status(200).send({
      success: true,
      message: "your todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get todo api",
      error,
    });
  }
};

// delete api
const deleteTodoController = async (req, res) => {
  try {
    //find
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "No todo found with this id",
      });
    }
    // find and delete
    const todo = await todoModel.findByIdAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete todo api",
    });
  }
};
// update todo 
const updateTodoController = async (req, res) => {
  try {
    const {id}= req.params;
    if(!id){
      return res.status(400).send({
        success: false,
        message: "No todo found with this id",
      });
    }
    const data = req.body;
    // update todo
    const todo = await todoModel.findByIdAndUpdate(id,{$set:data},{returnOriginal:false})
    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      todo,
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update todo api",
      error,
    })
  }
}
module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController
};
