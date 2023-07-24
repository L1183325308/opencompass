var collapsedSections = ['进阶教程', '工具', 'User Guides', 'Notes'];

$(document).ready(function () {
  $('.model-summary').DataTable({
    "stateSave": false,
    "lengthChange": false,
    "pageLength": 20,
    "order": []
  });
});
