// import _ from 'underscore';
// import $ from 'jquery';
// import Backbone from 'backbone';

//First word is capitalized
var TaskView = Backbone.View.extend({
  //If you don't want a generic div
  // tagName: 'li',
  initialize: function(options) {
    // this.task = options.task;
    this.template = options.template;
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    // Enable chained calls
    // This is important enough that we'll leave it in, but
    // we wont talk about it until later.
    // var html = '<li class="task">';
    // html += '<h2>' + this.task.title + '</h2>';
    // html += '<p>' + this.task.description + '</p>';
    // html += '</li>';

    //reconnects DOM event handlers
    this.delegateEvents();

    var html = this.template({task: this.model.toJSON()});

    //OR THIS (but it bypasses validations/events)
    // var html = this.template({task: this.model.attributes});

    this.$el.html(html);

    // Enable chained calls
    return this;
  },
  events: {
    'click .complete-button': 'completeHandler',
    'click .delete-button': 'deleteTask'
  },
  completeHandler: function(event){
    this.model.toggleComplete();
    // this.render();
  },
  deleteTask: function(event){
    this.model.destroy();
  }
});

export default TaskView;
