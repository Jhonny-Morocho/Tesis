export const estilosTablaResumenLayaut=
{
    defaultBorder: false,
    hLineWidth: function(i, node) {
      return 1;
    },
    vLineWidth: function(i, node) {
      return 1;
    },
    hLineColor: function(i, node) {
      if (i === 1 || i === 0) {
        return '#bfdde8';
      }
      return '#eaeaea';
    },
    vLineColor: function(i, node) {
      return '#eaeaea';
    },
    hLineStyle: function(i, node) {
      // if (i === 0 || i === node.table.body.length) {
      return null;
      //}
    },
    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    paddingLeft: function(i, node) {
      return 5;
    },
    paddingRight: function(i, node) {
      return 5;
    },
    paddingTop: function(i, node) {
      return 2;
    },
    paddingBottom: function(i, node) {
      return 2;
    },
    fillColor: function(rowIndex, node, columnIndex) {
      return '#fff';
    }
  };
