// import _ from 'underscore';
// import $ from 'jquery';
// import Backbone from 'backbone';

//First word is capitalized
var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },

  render: function() {
    // Enable chained calls
    // This is important enough that we'll leave it in, but
    // we wont talk about it until later.
    // var html = '<li class="task">';
    // html += '<h2>' + this.task.title + '</h2>';
    // html += '<p>' + this.task.description + '</p>';
    // html += '</li>';
    var html = this.template({task: this.task});
    this.$el.html(html);

    // Enable chained calls
    return this;
  }
});

export default TaskView;
