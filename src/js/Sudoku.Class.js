(function (window, Sudoku) {
	'use strict';

	/**
	 *
	 * @class Solver
	 * @namespace Sudoku
	 * @constructor
	 *
	 * __classDescription__
	 */
	function Solver($element) {
		this.init($element);
	}

	Solver.prototype = {
		constructor : Solver,

		/**
		 *
		 * @method init
		 * called by constructor
		 */
		init: function () {

			console.log('init');

		},

		getFields: function () {

			var row,
				lenRows = 9,
				cell,
				lenCells = 9
			;

			for (row = 0; row < lenRows; row += 1) {
				for (cell = 0; cell < lenCells; cell += 1) {
					var id = row + "-" + cell,
						value = parseInt(document.getElementById(id).innerHTML);

					if (isNaN(value)) {
						value = 0;
					}

					console.log('cell[' + id + ']: ' + value);
				}
			}
		}



	};

	Sudoku.Solver = Solver;

}(window, window.Sudoku = window.Sudoku || {}));