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
		constructor: Solver,

		/**
		 *
		 * @method init
		 * called by constructor
		 */
		init: function () {

			this.numbers = [];
			this.result = [];

		},

		getFields: function () {


			var lenRows = 9,
				lenCells = 9
				;

			for (var row = 0; row < lenRows; row += 1) {
				this.numbers[row] = [];

				for (var cell = 0; cell < lenCells; cell += 1) {
					var id = row + "-" + cell,
						value = parseInt(document.getElementById(id).innerHTML),
						newObj = {};
					newObj.coorditanes = {};

					if (isNaN(value)) {
						value = 0;
					}

					this.numbers[row].push(value)
				}
			}


			this.control();

		},


		control: function () {
			var x,
				y,
				somethingFound = false
			;


			for (x = 0; x < this.numbers.length; x = x + 1) {
				if (!somethingFound) {
					for (y = 0; y < this.numbers.length; y = y + 1){
						var currentNumber = this.numbers[x][y];
						if (currentNumber === 0) {
							var success = this.checkOnGrids(x, y);

							if (success) {

								somethingFound = true;
								break;
							}
						}
					}
				}

				if (somethingFound) {

					break;
				}
			}

			var that = this;
			setTimeout(function() {

				var again = false;
				for (var x = 0; x < 9; x++) {
					if (that.numbers[x].indexOf(0) !== 0) {
						again  = true;
						break;
					} else {
						again = false;
					}
				}

				if (again) {
					console.log('next try');
					that.control();
				} else {
					alert('done');
				}

			},300)

		},


		checkOnGrids : function(x, y) {
			var i, k, k, possibleNumbers, somethingFound = false;
			for (i = 0; i < 3; i = i + 1) {
				if(!somethingFound) {
					for (k = 0; k < 3; k = k + 1) {
						possibleNumbers = this.getPossibleNumbers(i, k);
						somethingFound = this.trying(possibleNumbers, x, y);

						if(somethingFound) {
							break;
						}
					}
				} else {
					break;
				}


			}

			return somethingFound;

		},

		trying : function(possibleNumbers, x, y) {
			var j,
				somethingFound = false
			;

			console.log(possibleNumbers);
			for (j = 0; j < possibleNumbers.length; j++) {
				var success = this.tryToFindNumber(possibleNumbers[j], x, y);
				if (success) {



					this.writeNumber(possibleNumbers[j], x, y);
					this.numbers[x][y] = possibleNumbers[j];
					somethingFound = true;
					break;
				}
			}

			return somethingFound;

		},


		tryToFindNumber: function(number, x, y) {
			var successHorizontally = this.controlHorizontally(number, x);
			if (successHorizontally) {
				var successVertically = this.controlVertically(number, y);
				if (successVertically) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		},



		writeNumber: function(number, x, y) {

			console.log('wrote number ' + number + ' in (' + x +',' + y + ')' );
			var id = ''+ x +'' + '-' + y;
			document.getElementById(id).innerHTML = number;
			document.getElementById(id).className += ' added';

			return true;
		},

		controlHorizontally: function (numberToControl, row) {
			if (this.numbers[row].indexOf(numberToControl) !== 0 && this.numbers[row].indexOf(numberToControl) === -1) {
				return true
			}

			return false;

		},

		controlVertically: function (numberToControl, cell) {

			var tmp = [];

			for (var x = 0; x < this.numbers.length; x++) {
				tmp.push(this.numbers[x][cell]);
			}



			if (tmp.indexOf(numberToControl) === -1) {
				return true;
			}
			return false;

		},

		getPossibleNumbers: function (gridX, gridY) {

			var startX = gridX * 3,
				startY = gridY * 3,
				tmp = [],
				tmp2 = []
			;

			tmp.push(this.numbers[startX][startY]);
			tmp.push(this.numbers[startX][startY + 1]);
			tmp.push(this.numbers[startX][startY + 2]);

			tmp.push(this.numbers[startX + 1][startY]);
			tmp.push(this.numbers[startX + 1][startY + 1]);
			tmp.push(this.numbers[startX + 1][startY + 2]);

			tmp.push(this.numbers[startX + 2][startY]);
			tmp.push(this.numbers[startX + 2][startY + 1]);
			tmp.push(this.numbers[startX + 2][startY + 2]);

			for (var x = 1; x <= 9; x++) {
				if (tmp.indexOf(x) === -1) {
					tmp2.push(x);
				}
			}


			return tmp2;


		}


	};

	Sudoku.Solver = Solver;

}(window, window.Sudoku = window.Sudoku || {}));