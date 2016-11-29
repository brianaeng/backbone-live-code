import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: "Default Title",
    description: "Default Description",
    //this isn't needed since undefined is falsey
    complete: false
  },
  initialize: function(options) {
    console.log("Task created - " + this.get("title"));
    // this.set("description", "new description"); //Example of using set
  },
  toggleComplete: function() {
    var complete = this.get("complete");
    this.set("complete", !complete);
  }
});

export default Task;
