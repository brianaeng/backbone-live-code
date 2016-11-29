import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TaskListView from 'app/views/task_list_view';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon'
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }
];

$(document).ready(function() {
  var application = new TaskListView({
    el: $('#application'), //setting the el as 'this' when 'this' is referenced in TaskListView
    taskData: taskData
  });
  application.render();
});
