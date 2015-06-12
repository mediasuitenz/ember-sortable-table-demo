import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import SortableColumnMixin from 'ember-sortable-table/mixins/sortable-column-mixin';

var SortableColumnController = Ember.Controller.extend({
  sortColumn: null,  // the column the rows are currently sorted by
  sortAscending: false,  // sort direction
  defaultSortKey: 'date',

  // TODO: figure out how to make the binding automatic so we can access columns regardless of the attribute used in the template
  columns: Ember.computed(function() {
    return this.get('tableColumns');
  }).property('tableColumns'),

  content: Ember.computed(function() {
    return this.get('tableContent');
  }).property('tableContent'),

  resetSortAscending: function() {
    this.set('sortAscending', false);
  },

  /**
   * Sorts the rows according to the selected sortColumn.
   */

  rowSortField: Ember.computed(function() {
    var signature = this.get('sortColumn.sortKey') || this.get('defaultSortKey');
    if (!this.get('sortAscending')) {
      signature += ':desc';
    }
    console.log('sorting by:', signature);
    return [signature];
  }).property('defaultSortKey', 'sortColumn.sortKey', 'sortAscending'),

  sortedRows: Ember.computed.sort('tableContent', 'rowSortField'),

  actions: {
    sort: function(column) {
      console.log('Controller.actions.sort', column.get('headerCellName'));

      if (!column.get('supportSort')) {
        // long hair, don't care about sort
        return;
      }

      if (this.get('sortColumn') !== column) {
        console.info('Sorting by new column', column.get('headerCellName'));
        this.get('columns').setEach('sorted', false);
        column.set('sorted', true);  // TODO: change this to function call on column - let the column figure out how to sort itself?
        this.resetSortAscending();
        this.set('sortColumn', column);
      } else {
        // Already sorted by this column. Switch the sort direction.
        // console.info('Change sort direction on column', column.get('headerCellName'));
        // if (this.get('sortAscending')) {
        //   console.log('');
        //   this.set('sortColumn', null);
        //   this.resetSortAscending();
        //   this.get('columns').setEach('sorted', false);
        //   column.set('sorted', false);
        // } else {
          console.log('Toggling sortAscending from ', this.get('sortAscending'), 'to', !this.get('sortAscending'));
          this.toggleProperty('sortAscending');
        // }
      }
    }

  }
});

export default SortableColumnController.extend({
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
