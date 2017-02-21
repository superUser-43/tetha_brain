/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/**	~ ParSeR ~ a								 */
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

// PSR class namespace

var PSRclass									 = PSRclass || {} ;

// self accessor

var self										 = PSRclass;

//constructor

PSRclass.PSR									 = function () {

	this.oDPH									 = new DPHclass.DPH();
	this.oXHR									 = new XHRclass.XHR();

	this.patterns								 = null;
	this.matches								 = {}

}

// publics methods

PSRclass.PSR.prototype							 = {

	setup:function () {

		this.oDPH.aDPHlistener ( 'XHRCOMPLETE', this.loaded, this );
		
		this.oXHR.mXHRsetup ('json');
		this.oXHR.aXHRmedia ( 'lib/js/MSG/patterns.json' );
		this.oXHR.mXHRload ();

	},

	loaded:function () {

		this.oDPH.mDPHremove ( 'XHRCOMPLETE', this.loaded, this );

		this.patterns							 = this.oXHR.gXHRresponse ();

		this.oDPH.mDPHdispatch ( 'PSRCOMPLETE', this, true );

	},

	matchall:function ( content ) {

		for ( let key in this.patterns ) {

			for ( let i = 0, il = this.patterns[key].length ; i < il ; i++ ) {

				let stat = {};

				for ( let j = 0, jl = this.patterns[ key ][ i ].pattern.length ; j < jl ; j++ ) {

					let result					 = this.match ( content, this.patterns[ key ][ i ].pattern[ j ] );

					if ( result ) {
						stat[j]					 = result;	
					}

				}

				if ( Object.keys(stat).length ) {

					this.matches[ key ]			 = this.matches[ key ] || {};
					
					this.matches[ key ][ i ] = { "ratio" : stat };		

				}
			
			}

		}

		console.log ( JSON.stringify ( this.matches ) );
		//console.log ( 'pronouns : ' + Object.keys(this.matches.pronouns) );

	},

	match:function ( content, pattern ) {

		let matches = content.match ( new RegExp ( pattern, 'ig' ) );		

		if ( matches ) return matches.length ;

		return 0;

	},

	getstats:function () {

		if ( this.matches ) {

		}	

	}

};
