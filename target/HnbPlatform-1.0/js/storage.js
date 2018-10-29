  // Example Bootstrap Table Toolbar
  // -------------------------------
  (function() {
	
	//
    $('#exampleTableToolbar').bootstrapTable({
      url: "js/demo/bootstrap_table_test2.json",
      search: false,
      showRefresh: true,
      showToggle: false,
      showColumns: true,
      toolbar: '#exampleToolbar',
      iconSize: 'outline',
      icons: {
        refresh: 'glyphicon-repeat',
        toggle: 'glyphicon-list-alt',
        columns: 'glyphicon-list'
      },
	  onDblClickRow: function (row) {
			$('#myModal').modal('show');
	  }
    });

  })();