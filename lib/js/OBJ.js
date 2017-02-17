// OBJ class namespace

var OBJclass									 = OBJclass || {} ;

// self accessor

var self										 = OBJclass;

//constructor

OBJclass.OBJ									 = function () {

	this.variableStatic  						 = 'hello';

}

OBJclass.OBJ.variableGlobale 					 = 'salut';

// publics methods

OBJclass.OBJ.prototype							 = {

	maFonction:function () {
		
		console.log ( 'ceci est ma première function objet' );

	},

	maSuperFunction:function ( param1, param2 ) {

		console.log ( param1 + ' ' + param2 ) {

	}

}


