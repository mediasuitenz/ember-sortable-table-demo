import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import SortableColumnMixin from 'ember-sortable-table/mixins/sortable-column-mixin';


export default Ember.Controller.extend({
  tableColumns: Ember.computed(function() {
    var dateColumn = ColumnDefinition.createWithMixins(SortableColumnMixin, {
      savedWidth: 150,
      textAlign: 'text-align-left',
      headerCellName: 'Date',
      sortKey: 'date',
      getCellContent: function(row) {
        return row.get('date').toDateString();
      }
    });
    var openColumn = ColumnDefinition.createWithMixins(SortableColumnMixin, {
      savedWidth: 100,
      headerCellName: 'Open',
      sortKey: 'open',
      getCellContent: function(row) {
        return row.get('open').toFixed(2);
      }
    });
    var highColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'High',
      getCellContent: function(row) {
        return row.get('high').toFixed(2);
      }
    });
    var lowColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'Low',
      getCellContent: function(row) {
        return row.get('low').toFixed(2);
      }
    });
    var closeColumn = ColumnDefinition.create({
      savedWidth: 100,
      headerCellName: 'Close',
      getCellContent: function(row) {
        return row.get('close').toFixed(2);
      }
    });
    return Ember.A([dateColumn, openColumn, highColumn, lowColumn, closeColumn]);
  }),

  tableContent: Ember.computed(function() {
    var content = Ember.A();
    var date;
    for (var i = 0; i < 100; i++) {
      date = new Date();
      date.setDate(date.getDate() + i);
      content.pushObject({
        date: date,
        open: Math.random() * 100 - 50,
        high: Math.random() * 100 - 50,
        low: Math.random() * 100 - 50,
        close: Math.random() * 100 - 50,
        volume: Math.random() * 1000000
      });
    }
    return Ember.A(content);
  }).property('filtervalue'),


});
