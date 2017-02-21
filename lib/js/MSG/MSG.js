/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/**	~ MeSsaGer ~ 								 */
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

// MSG class namespace

var MSGclass									 = MSGclass || {} ;

// self accessor

var self										 = MSGclass;

//constructor

MSGclass.MSG									 = function () {

	this.fingerprint							 = 0;

	this.defaultContent							 = 'nothing to write';
	this.output									 = '';
	

}

// publics methods

MSGclass.MSG.prototype							 = {

	write:function ( content ) {
		
		this.output = ( content && typeof content === 'string' ) ? content : this.defaultContent;
		this.output = this.capitalize ( this.output );
		console.log ( this.output );

		return false;

	},

	//multiline:function ( content, delay = 0 ) {

	//	let i = 0;
	//	let max = content.length;

	//	function send (t) {
	//		setTimeout ( function () {
	//			t.write( content[ i ] );
	//			i++;
	//			if ( i < max ) {
	//				send ( t );
	//			}
	//		}, i * delay)
	//	}

	//	send ( this );

	//},

	multiline:function ( content, delay ) {

		for ( let i = 0, il = content.length ; i < il ; i++ ) {

			setTimeout ( this.write.bind ( this, content[ i ] ), i * delay );

		}

		return false;

	},

	capitalize:function ( content ) {

		var pattern = /(^[a-zA-Z])|[.!?]{1} {1}([a-zA-Z]{1})/g;

		var capitalized = content.replace( new RegExp(pattern), function (match) { return match.toUpperCase() } );

		return capitalized;
		
	},

};
