var collapsedSections = ['111', '222', '333', '444'];

$(document).ready(function () {
  $('.model-summary').DataTable({
    "stateSave": false,
    "lengthChange": false,
    "pageLength": 20,
    "order": []
  });
});
