/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ XmlHttpRequest ~                           */
/*                                               */
/** version                                      */
/**  αlpha 0.2                                   */
/*                                               */
/** last changes                                 */
/**  14 01 01                                    */
/*                                               */
/** author                                       */
/**  Leal Sylvain                                */
/**  aka KRSHK                                   */
/*                                               */
/** license                                      */
/**  all right reserved                          */
/**  soon with GPL license                       */
/*                                               */
/** description                                  */
/**  simplified XMLHttpRequest manager           */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

// XHR class namespace

var XHRclass                                     = XHRclass || {};

// self accessor

var self                                         = XHRclass;

// constructor

XHRclass.XHR                                     = function () {

    this.oXHRobject                              = null;
    this.sXHRmedia                               = null;
    this.sXHRtype                                = null;
	this.oXHRdatas								 = null;
    this.bXHRjson                                = false;
    this.oXHRresponse                            = null;

    this.oXHRbar                                 = null;

    this.oDPH                                    = new DPHclass.DPH ();

    this.oCSL                                    = new CSLclass.CSL ( 'XHR' );
    this.oCSL.aCSLevent ( 'new XHR obj created' );

}

// publics methods

XHRclass.XHR.prototype                           = {

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ mXHRsetup ~                                */
/*                                               */
/** pXHRtype                                     */
/**  string                                      */
/*                                               */
/** setup XHR class                              */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    mXHRsetup:function ( pXHRtype ) {

		this.oXHRobject							 = new XMLHttpRequest ();

        this.mXHRtype ( pXHRtype );
    
        this.oXHRobject.addEventListener ( 'progress', this.eXHRprogress.bind ( this ), false );
        this.oXHRobject.addEventListener ( 'load', this.eXHRload.bind ( this ), false );

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ aXHRmedia ~                                */
/*                                               */
/** pXHRsource                                   */
/**  string                                      */
/*                                               */
/** add media source                             */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    aXHRmedia:function ( pXHRsource ) {

        this.sXHRmedia                           = pXHRsource ;
    
        this.oCSL.aCSLevent ( 'new source added ', pXHRsource );

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ mXHRtype ~                                 */
/*                                               */
/** pXHRtype                                     */
/**  string                                      */
/*                                               */
/** format media type                            */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    mXHRtype:function ( pXHRtype ) {

		if ( typeof ( pXHRtype ) == 'undefined' ) {

			pXHRtype							 = 'blob';

		}

        if ( pXHRtype == 'json' ) {

            this.sXHRtype                        = 'text';
            this.bXHRjson                        = true;

        } else {

            this.sXHRtype                        = pXHRtype;

        }

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*												 */
/** ~ aXHRdatas ~								 */
/*												 */
/** pXHRdatas									 */
/**  misc										 */
/*												 */
/** add specific datas to the send request		 */
/*												 */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	aXHRdatas:function ( pXHRdatas ) {

		this.oXHRdatas							 = ( pXHRdatas ) ? pXHRdatas : '';

	},

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ aXHRbar ~                                  */
/*                                               */
/** pXHRtarget                                   */
/**  string                                      */
/*                                               */
/** add a progress bar element                   */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    aXHRbar:function ( pXHRtarget ) {

        this.oXHRbar                             = document.createElement ( 'progress' );

        this.oCSL.aCSLevent ( 'progress bar added ', this.oXHRbar );

        this.oXHRbar.setAttribute ( 'value' , '0' );
        this.oXHRbar.setAttribute ( 'max' , ' 100' );

        document.getElementById( pXHRtarget ).appendChild ( this.oXHRbar );

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ mXHRload ~                                 */
/*                                               */
/** load media source                            */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    mXHRload:function () {

        this.oXHRobject.open ( 'POST', this.sXHRmedia, true );
        this.oXHRobject.responseType             = this.sXHRtype;
        this.oXHRobject.send ( this.oXHRdatas );

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ eXHRprogress ~                             */
/*                                               */
/** progress event function                      */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    eXHRprogress:function ( event ) {

        var sXHRprogress                         = ( event.loaded / event.total ) * 100;

        this.oCSL.aCSLevent ( 'progress ', sXHRprogress );
        
        if ( this.oXHRbar ) {

            this.oXHRbar.value                   = sXHRprogress;
    
        }

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ eXHRload ~                                 */
/*                                               */
/** load event function                          */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    eXHRload:function ( event ) {

        if ( event.target.readyState == 4 && event.target.status == 200 ) {

            switch ( this.sXHRtype ) {

                case 'blob' :

                    this.oXHRresponse            = event.target.response;
                    break;

                case 'xml' :

                    this.oXHRresponse            = event.target.responseXML;
                    break;

                case 'text' :

                    if ( this.bXHRjson ) {

                        this.oXHRresponse        = JSON.parse ( event.target.responseText );

                    } else { 

                        this.oXHRresponse        = event.target.responseText;

                    }

                    break;

            }

            this.oDPH.mDPHdispatch ( 'XHRCOMPLETE', this );

        }

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                               */
/** ~ gXHRresponse ~                             */
/*                                               */
/** get the response request                     */
/*                                               */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    gXHRresponse:function () {

        return this.oXHRresponse;

    },

};
