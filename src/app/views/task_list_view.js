import Task from 'app/models/task';
import TaskView from 'app/views/task_view';
import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    // this.taskData = options.taskData;
    // this.modelList = [];

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element - this is using el indirectly
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.model.forEach(function(task) {
      this.addTask(task);
    }, this); // bind `this` so it's available inside forEach

    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

    this.listenTo(this.model, "update", this.render);
    this.listenTo(this.model, "add", this.addTask);
    this.listenTo(this.model, "remove", this.removeTask);
  },
  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  },
  events: {
    'click .clear-button': 'clearInput', //'event css-selector': 'function'
    'submit .new-task': 'createTask'
  },
  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  },
  createTask: function(event) {
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = new Task(this.getInput());

    // Add the new task to our list of tasks
    // this.addTask(task);
    this.model.add(task);

    // Re-render the whole list, now including the new card
    // this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
  },
  // Build a task from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  },
  addTask: function(task) {
    // var card = new Task(task);
    // this.modelList.push(task);
    //views know what to do with models built-in
    var card = new TaskView({model: task, template: this.taskTemplate});
    //Listening to the card, when it says "editMe" then call the editCard function on this card
    this.listenTo(card, "editMe", this.editCard);
    this.cardList.push(card);
  },
  removeTask: function(model, collection, options){
    var filteredList = [];
    for (var i = 0; i < this.cardList.length; i++){
      if (this.cardList[i].model == model){
        console.log("found " + model);
      }
      else {
        filteredList.push(this.cardList[i]);
      }
    }
    this.cardList = filteredList;
  },
  editCard: function(cardModel){
    this.input.title.val(cardModel.get("title"));
    this.input.description.val(cardModel.get("description"));

    //gets card list collection & removes the card
    this.model.remove(cardModel);
  }
});

export default TaskListView;


//OLD WAY
// $(document).ready(function() {
//   var taskTemplate = _.template($('#task-template').html());
//   var taskListElement = $('.task-list');
//
//   //Map is more efficient than forEach
//   var cardList = taskData.map(function(task){
//     var card = new TaskView({task: task, template: taskTemplate});
//     taskListElement.append(card.render().$el);
//   });
// });
