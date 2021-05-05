export const dataTable=
  {
  pagingType: 'full_numbers',
  pageLength: 10,
  responsive: true,
    /* below is the relevant part, e.g. translated to spanish */
  language: {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ elementos",
    info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
    infoEmpty: "Mostrando ningún elemento.",
    infoFiltered: "(filtrado _MAX_ elementos total)",
    infoPostFix: "",
    loadingRecords: "Cargando registros...",
    zeroRecords: "No se encontraron registros",
    emptyTable: "No hay datos disponibles en la tabla",
    paginate: {
      first: "<i class='fas fa-chevron-left'></i>",
      previous: "<i class='fas fa-angle-double-left'></i>",
      next: "<i class='fas fa-angle-double-right'></i>",
      last: "<i class='fas fa-chevron-right'></i>"
    },
    aria: {
      sortAscending: ": Activar para ordenar la tabla en orden ascendente",
      sortDescending: ": Activar para ordenar la tabla en orden descendente"
    }
  }
};
