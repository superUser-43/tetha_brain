/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/**	~ MarKoV ~									 */
/*												 */
/** version 									 */
/**  αlpha 0.1.0 								 */
/*												 */
/** last changes								 */
/**  17 02 17									 */
/*												 */
/** author										 */
/**  Leal Sylvain								 */
/**  aka KRSHK									 */
/*												 */
/** license										 */
/**  all right reserved							 */
/**  soon with GPL license						 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// MKV class namespace

var MKVclass									 = MKVclass || {} ;

//constructor

MKVclass.MKV									 = function () {

	this.chains									 = {};
	this.starters								 = [];
	this.terminals								 = {};	

	this.maxLength								 = 6;
	this.chainLength							 = 2;

}

// publics methods

MKVclass.MKV.prototype							 = {

	add:function ( text ) {

		const content							 = text.split ( '. ' );

		this.parse ( content );

	},

	parse:function ( content ) {

		for ( let i = 0, il = content.length ; i < il ; i++ ) {

			const words = content[ i ].split ( ' ' );
			
			this.terminals[ words[ words.length - 1 ] ] = true;
			this.starters.push ( words[ 0 ] );

			for ( let j = 0, jl = words.length - 1 ; j < jl ; j++ ) {

				if ( this.chains.hasOwnProperty ( words[ j ] ) ) {

					this.chains[ words[ j ] ].push ( this.getNext( words, j + 1, j + this.chainLength ) );

				} else {

					this.chains[ words[ j ] ] = [ this.getNext( words, j + 1, j + this.chainLength ) ];

				}

			}

		}	

	},

	getNext:function ( words, i, max, values ) {

		let parts								 = values || [];

		if ( ( i > max ) || ( i > words.length - 1 ) ) return parts;

		parts.push ( words[ i ] );
		i++
		return this.getNext ( words, i, max, parts );
		
	},

	getSentences:function ( number = 1, startWord = false, min = number, shuffled = false ) {

		min										 = ( min <= number ) ? min : number;
		const sentences							 = [];

		for ( let i = 0, il = number ; i < il ; i++ ) {

			startWord							 = ( i < min ) ? startWord : false;

			sentences.push ( this.getSentence ( startWord ) );

		}

		if ( shuffled ) {

			for ( let i = sentences.length ; i ; i-- ) {

				let j = Math.floor( Math.random () * i );
				[ sentences[ i - 1 ], sentences[ j ] ] = [ sentences[ j ], sentences[ i - 1 ] ];

			}

		}

		return sentences;

	},

	getSentence:function ( startWord = false ) {

		let word								 = ( this.starters.indexOf ( startWord ) != -1 ) ? startWord : this.starters[ Math.floor ( this.starters.length * Math.random () ) ];	

		let sentence							 = [ word ];

		while ( this.chains.hasOwnProperty ( word ) ) {

			let next							 = this.chains[ word ];

			let index							 = Math.floor ( next.length * Math.random () ); 
		
			word = next[ index ][ next[ index ].length - 1 ];

			sentence.push ( next[ index ].join( ' ' ) );

			if ( sentence.length > this.maxLength && this.terminals.hasOwnProperty ( word ) ) {
				break
			};

		}

		return sentence.join ( ' ' );

	},

	setMaxLength:function ( length ) {

		this.maxLength							 = length;

	},

	setChainLength:function ( length ) {

		this.chainLenght						 = length;

	}

};
