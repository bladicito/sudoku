(function (window, Sudoku) {
	'use strict';

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
			this.currentX = 0;
			this.currentY = 0;
			this.currentGridx3X = 0;
			this.currentGridx3Y = 0;

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
			var x, y, some = false;


			for (x = 0; x < this.numbers.length; x = x + 1) {
				if (!some) {
					for (y = 0; y < this.numbers.length; y = y + 1){
						this.currentX = x;
						this.currentY = y;


						if (this.numbers[x][y] === 0) {

							this.setCurrent9x9Grid ();
							if (this.checkNumber(x, y)) {
								some = true;
								break;
							}
						}
					}
				} else {
					break;
				}

			}


			var that = this;



			setTimeout(function() {
				var cont = false;
				for (x = 0; x < 9; x++) {
					if (that.numbers[x].indexOf(0) !== -1) {
						cont = true;
						break;
					} ;
				}

				if(cont) {

					that.control();
				};
			}, 100)




		},

		setCurrent9x9Grid: function() {


				if (this.currentX < 3) {
					this.currentGridx3X  =  0;
				} else if (this.currentX >= 3  && this.currentX < 6) {
					this.currentGridx3X = 1;
				} else if (this.currentX >= 6 && this.currentX < 9) {
					this.currentGridx3X  = 2;
				}



				if (this.currentY < 3) {
					this.currentGridx3Y =  0;
				} else if (this.currentY >= 3  && this.currentY < 6) {
					this.currentGridx3Y =  1;
				} else if (this.currentY >= 6 && this.currentY < 9) {
					this.currentGridx3Y =  2;
				}

			return this;
		},

		checkNumber: function(x, y) {
			var possibleNumbers,
				isPossible
			;

			possibleNumbers = this.getPossibleNumbers();



			isPossible =  this.checkPossibilities(possibleNumbers, x,y);


			return isPossible;


		},

		checkPossibilities: function(possibleNumbers, x, y) {
			var k,
				results
			;



			for (k = 0; k < possibleNumbers.length; k = k+1) {
				results = this.tryToFindNumber(possibleNumbers[k]);



				if (results.length === 1) {
					this.writeNumber(possibleNumbers[k], results[0].x, results[0].y );
					this.numbers[results[0].x][results[0].y] = possibleNumbers[k];
					return true;
				}



			}

			return false;


		},



		controlHorizontally: function (numberToControl, row) {


			if (this.numbers[row].indexOf(numberToControl) === -1) {
				return true
			} else {
				return false;
			}


		},

		tryToFindNumber: function(number) {

			var startX = parseInt(this.currentGridx3X * 3, 10),
				startY = parseInt(this.currentGridx3Y * 3, 10),
				results = [];
			;




			if (this.numbers[startX][startY] === 0) {
				if (this.controlHorizontally(number, startX)) {
					if (this.controlVertically(number, (startY + 1))) {
						results.push({x:startX, y: startY });
					}
				}
			}

			if (this.numbers[startX][(startY + 1)] === 0) {
				if (this.controlHorizontally(number, startX)) {
					if (this.controlVertically(number, (startY + 1))) {
						results.push({x:startX, y: (startY + 1) });
					}
				}
			}

			if (this.numbers[startX][(startY + 2)] === 0) {
				if (this.controlHorizontally(number, startX)) {
					if (this.controlVertically(number, (startY + 2))) {
						results.push({x:startX, y: (startY + 2) });
					}
				}
			}




			if (this.numbers[(startX + 1)][startY] === 0) {
				if (this.controlHorizontally(number, startX + 1)) {
					if (this.controlVertically(number, startY)) {
						results.push({x:(startX + 1), y: startY });
					}
				}
			}




			if (this.numbers[(startX + 1)][(startY + 1)] === 0) {
				if (this.controlHorizontally(number, (startX + 1))) {
					if (this.controlVertically(number, (startY + 1))) {
						results.push({x:(startX + 1), y: (startY + 1) });
					}
				}
			}

			if (this.numbers[(startX + 1)][(startY + 2)] === 0) {
				if (this.controlHorizontally(number, (startX + 1))) {
					if (this.controlVertically(number, (startY + 2))) {
						results.push({x:(startX + 1), y: (startY + 2) });
					}
				}
			}


			if (this.numbers[(startX + 2)][startY] === 0) {
				if (this.controlHorizontally(number, (startX + 2))) {
					if (this.controlVertically(number, startY)) {
						results.push({x:(startX + 2), y: startY });
					}
				}
			}

			if (this.numbers[(startX + 2)][(startY + 1)] === 0) {
				if (this.controlHorizontally(number, (startX + 2))) {
					if (this.controlVertically(number, (startY + 1))) {
						results.push({x:(startX + 2), y: (startY + 1) });
					}
				}
			}

			if (this.numbers[(startX + 2)][(startY + 2)] === 0) {
				if (this.controlHorizontally(number, (startX + 2))) {
					if (this.controlVertically(number, (startY + 2))) {
						results.push({x:(startX + 2), y: (startY + 2) });
					}
				}
			}


			return results;
		},



		getPossibleNumbers: function () {

			var startX = this.currentGridx3X * 3,
				startY = this.currentGridx3Y * 3,
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
		},









		writeNumber: function(number, x, y) {

			console.log('wrote number ' + number + ' in (' + x +',' + y + ')' );
			var id = ''+ x +'' + '-' + y;
			document.getElementById(id).innerHTML = number;
			document.getElementById(id).className += ' added';

			return true;
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

		}




	};

	Sudoku.Solver = Solver;

}(window, window.Sudoku = window.Sudoku || {}));