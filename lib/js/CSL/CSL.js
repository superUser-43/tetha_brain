/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/**	~ ConSoLe ~ 								 */
/*												 */
/** version 									 */
/**  αlpha 0.2.8 								 */
/*												 */
/** last changes								 */
/**  14 01 01									 */
/*												 */
/** author										 */
/**  Leal Sylvain								 */
/**  aka KRSHK									 */
/*												 */
/** license										 */
/**  all right reserved							 */
/**  soon with GPL license						 */
/*												 */
/** description									 */
/**  simplified console output message manager 	 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// CSL class namespace

var CSLclass									 = CSLclass || {} ;

// self accessor

var self										 = CSLclass;

//constructor

CSLclass.CSL									 = function ( pCSLprefix, pCSLbranch ) {

	this.sCSLprefix								 = ( pCSLprefix ) ? pCSLprefix : 'GEN';
	this.sCSLbranch								 = ( pCSLbranch ) ? pCSLbranch : false;

	this.sCSLheader								 = null;
	this.sCSLindent								 = null;
	
	this.oCSLconsts 							 = {
														'on' : '[-|on]',
														'off' : '[off|-]',
														'heart' : '♥',
																												
													};

	this.mCSLsetup ();

}

CSLclass.CSL.bCSLdebug							 = CSLclass.CSL.bCSLdebug || true;

// publics methods

CSLclass.CSL.prototype							 = {

	mCSLsetup:function () {

		this.mCSLprefix ();
		this.mCSLindent ();

	},

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/** ~ mCSLprefix ~ 								 */
/*												 */
/** pCSLprefix									 */
/**  string										 */
/*												 */
/** set the prefix class						 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	mCSLprefix:function () {

		this.sCSLprefix							 = this.sCSLprefix.slice ( 0, 3 ).toUpperCase ();
		this.sCSLbranch							 = ( this.sCSLbranch ) ? ' (' + this.sCSLbranch.slice ( 0, 1 ) + ')' : '    ';

		this.sCSLheader							 = this.sCSLprefix + this.sCSLbranch + ' \t ~ \t ';

	},

	mCSLindent:function () {

		this.sCSLindent							 = this.sCSLheader.replace ( /^\w+ \(*\w*\)* /gm, replacer ).replace ( /~/, '-' );

		function replacer ( match ) {

			var string							 = '';

			for ( var i = 0; i < match.length; i++ ) {

				string							+= ' ';

			}

			return string;

		}

	},

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/** ~ mCSLformat ~ 								 */
/*												 */
/** pCSLdata									 */
/**  string										 */
/*												 */
/** format the prefix string 					 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	mCSLformat:function ( pCSLdata ) {

		if ( pCSLdata ) {
		
			var sCSLdata 						 = this.mCSLascii ( this.mCSLjson ( pCSLdata ) );
			
			return ( sCSLdata ) ? this.sCSLindent + sCSLdata : '';
			
		}

		return '';

	},
	
	mCSLjson:function ( pCSLdata ) {
	
		if ( pCSLdata ) {

			var seen = [];

			var sCSLdata						 = ( typeof ( pCSLdata ) == 'object' ) ? JSON.stringify ( pCSLdata ) : pCSLdata;

			return  sCSLdata;

		}
		
		return '';
		
	},
	
	mCSLascii:function ( pCSLdata ) {
	
		if ( pCSLdata ) {
	
			var sCSLregex 					 = /^\*([a-zA-z0-9]+)/i;
			var oCSLresult 					 = sCSLregex.exec ( pCSLdata );
			
			var sCSLdata 					 = ( oCSLresult ) ? this.oCSLconsts[oCSLresult[1]] : pCSLdata;
			
			return sCSLdata;
			
		}
		
		return '';
		
	},
			
	
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/** ~ mCSLcensor ~ 								 */
/*												 */
/** pCSLkey 									 */
/**  string										 */
/*												 */
/** pCSLvalue									 */
/**  miscellaneous								 */
/*												 */
/** prevent object loop		 					 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	mCSLcensor:function ( pCSLkey, pCSLvalue ) {

		var aCSLparsed							 = [];

		if ( typeof ( pCSLvalue ) == 'object' ) {

			
			return '__CYCLE__';

		}

		return pCSLvalue;

	},

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/** ~ aCSLevent ~ 								 */
/*												 */
/** pCSLevent  									 */
/**  string										 */
/*												 */
/** pCSLparams 									 */
/**  miscellaneous								 */
/*												 */
/** add output message in console 				 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	aCSLevent:function ( pCSLevent, pCSLparams ) {

		if ( console && CSLclass.CSL.bCSLdebug ) {
		
			var nCSLdisplays 					 = arguments.length;
			var aCSLdisplays 					 = [];
			
			for ( var i = 1; i < nCSLdisplays; i++ ) {
			
				aCSLdisplays.push ( this.mCSLformat( arguments[i] ) );
				
			}
			
			var display 						 = aCSLdisplays.join ( '\n' );

			console.log ( this.sCSLheader + pCSLevent + '\n' + display );

		}

	},

	mCSLtoggle:function () {

		this.aCSLevent ( 'debug deactive' );
		CSLclass.CSL.bCSLdebug					 = !CSLclass.CSL.bCSLdebug;

	},

};
