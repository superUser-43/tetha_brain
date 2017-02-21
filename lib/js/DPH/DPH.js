/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                                   */
/** ~ DisPatcHer ~                                   */
/*                                                   */
/** version                                          */
/**  αlpha 0.3.3                                     */
/*                                                   */
/** last changes                                     */
/**  14 01 01                                        */
/*                                                   */
/** author                                           */
/**  Leal Sylvain                                    */
/**  aka KRSHK                                       */
/*                                                   */
/** license                                          */
/**  all right reserved                              */
/**  soon with GPL license                           */
/*                                                   */
/** description                                      */
/**  event dispatcher                                */
/*                                                   */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// DPH class namespace

var DPHclass                                         = DPHclass || {};

// self accessor

var self                                             = DPHclass;

// constructor

DPHclass.DPH                                         = function () {

    // singleton pattern

    if ( DPHclass.DPH.oDPHinstance ) {

        return DPHclass.DPH.oDPHinstance;

    }

    DPHclass.DPH.oDPHinstance                        = this;

    this.oCSL                                        = new CSLclass.CSL ( 'DPH' );
    this.oCSL.aCSLevent ( 'new DPH obj created' );

}

// public variables

DPHclass.DPH.aDPHlisteners                           = {};

// public methods

DPHclass.DPH.prototype                               = {

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                                   */
/** ~ aDPHlistener ~                                 */
/*                                                   */
/** pDPHtype                                         */
/**  string                                          */
/*                                                   */
/** pDPHcallback                                     */
/**  function                                        */
/*                                                   */
/** pDPHscope                                        */
/**  scope                                           */
/*                                                   */
/** add an event listener                            */
/*                                                   */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    aDPHlistener:function ( pDPHtype, pDPHcallback, pDPHscope ) {

        var aDPHargs                                 = [];

        for ( var i = 0 ; i < arguments.length ; i++ ) {

            aDPHargs.push ( arguments[ i ] );
 
        }       

        aDPHargs = aDPHargs.length > 3 ? aDPHargs.splice ( 3, aDPHargs.length - 1 ) : [];

        if ( typeof DPHclass.DPH.aDPHlisteners[ pDPHtype ] != 'undefined' ) {

            DPHclass.DPH.aDPHlisteners[ pDPHtype ].push ( { scope : pDPHscope, callback : pDPHcallback, args : aDPHargs } );

        } else {

            DPHclass.DPH.aDPHlisteners[ pDPHtype ]   = [ { scope : pDPHscope, callback : pDPHcallback, args : aDPHargs } ];

        }

        this.oCSL.aCSLevent ( 'new listener added', { 'event' : pDPHtype, 'callback' :  pDPHcallback.name, 'scope' : pDPHscope.toString() } );

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                                   */
/** ~ mDPHremove ~                                   */
/*                                                   */
/** pDPHtype                                         */
/**  string                                          */
/*                                                   */
/** pDPHcallback                                     */
/**  function                                        */
/*                                                   */
/** pDPHscope                                        */
/**  scope                                           */
/*                                                   */
/** remove an event listener                         */
/*                                                   */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    mDPHremove:function ( pDPHtype, pDPHcallback, pDPHscope ) {

        if ( typeof DPHclass.DPH.aDPHlisteners[ pDPHtype ] != 'undefined' ) {

            var nDPHcallbacks                        = DPHclass.DPH.aDPHlisteners[ pDPHtype ].length;

            var aDPHlisteners = [];

            for ( var i = 0; i < nDPHcallbacks ; i++ ) {

                var aDPHlistener                     = DPHclass.DPH.aDPHlisteners[ pDPHtype ][ i ];

                if ( aDPHlistener.scope == pDPHscope && aDPHlistener.callback == pDPHcallback) {
                    
                } else {

                    aDPHlisteners.push ( aDPHlistener );

                }

            }

            DPHclass.DPH.aDPHlisteners[ pDPHtype ]   = aDPHlisteners;

        }

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                                   */
/** ~ cDPHexist ~                                    */
/*                                                   */
/** pDPHtype                                         */
/**  string                                          */
/*                                                   */
/** pDPHcallback                                     */
/**  function                                        */
/*                                                   */
/** pDPHscope                                        */
/**  scope                                           */
/*                                                   */
/** return boolean value for existing event          */
/*                                                   */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    cDPHexist:function ( pDPHtype, pDPHcallback, pDPHscope ) {

        if ( typeof DPHclass.DPH.aDPHlisteners[ pDPHtype ] != 'undefined' ) {

            var nDPHcallbacks                        = DPHclass.DPH.aDPHlisteners[ pDPHtype ].length;

            if ( pDPHcallback === undefined && pDPHscope === undefined ) {

                return nDPHcallbacks > 0;

            }

            for ( var i = 0 ; i < nDPHcallbacks ; i++ ) {

                var aDPHlistener                     = DPHclass.DPH.aDPHlisteners[ pDPHtype ][ i ];

                if ( ( pDPHscope ? aDPHlistener.scope == pDPHscope : true ) && aDPHlistener.callback == pDPHcallback ) {

                    return true;

                }

            }

        }

        return false;

    },

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*                                                   */
/** ~ mDPHdispatch ~                                 */
/*                                                   */
/** pDPHtype                                         */
/**  string                                          */
/*                                                   */
/** pDPHitarget                                      */
/**  scope                                           */
/*                                                   */
/** dispatch an event                                */
/*                                                   */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

    mDPHdispatch:function ( pDPHtype, pDPHtarget ) {

        var nDPHlisteners                            = 0;

        var aDPHevent                                = { type:pDPHtype, target:pDPHtarget };
        
        var aDPHargs = [];
        
        for ( var i = 0 ; i < arguments.length ; i++ ) {

            aDPHargs.push ( arguments[ i ] );

        };              

        aDPHargs                                     = aDPHargs.length > 2 ? aDPHargs.splice ( 2, aDPHargs.length - 1 ) : [];

        aDPHargs                                     = [ aDPHevent ].concat ( aDPHargs );

        if ( typeof DPHclass.DPH.aDPHlisteners[ pDPHtype ] != 'undefined' ) {

            var nDPHcallbacks                        = DPHclass.DPH.aDPHlisteners[ pDPHtype ].length;

            for ( var i = 0 ; i < nDPHcallbacks ; i++ ) {

                var aDPHlistener                     = DPHclass.DPH.aDPHlisteners[ pDPHtype ][ i ];

                if ( aDPHlistener && aDPHlistener.callback ) {                  

                    this.oCSL.aCSLevent ( 'event detected', pDPHtype + ', ' + aDPHlistener.callback.name + ', ' + pDPHtarget );

                    var aDPHconcats                  = aDPHargs.concat ( aDPHlistener.args );

                    aDPHlistener.callback.apply ( aDPHlistener.scope, aDPHconcats);

                    nDPHlisteners                   += 1;

                }

            }

        }

    },

};
