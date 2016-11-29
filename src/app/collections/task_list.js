import Task from 'app/models/task';

var TaskList = Backbone.Collection.extend({
  model: Task
});

export default TaskList;
