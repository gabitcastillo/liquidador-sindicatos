import { createPool } from 'mysql2/promise';
import { Nomina } from './nominaModel';

class LiquidacionModel {
	private db: any; //Manejador de la bd
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'axton_bd',
			connectionLimit: 10
		});
	}
	/* Nota: Aqui cada uno tiene que setear los parametros de su propio servidor MySQL / MariaDB.*/
    async listarNominaGeneral(objeto : Nomina) {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const liquidacion = await this.db.query('SELECT * FROM liquidaciones_20231103');
		console.log(liquidacion[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return liquidacion[0];
	}
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async buscarIdLiquidacion(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM liquidaciones_20231103 WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

}

const liquidacionModel: LiquidacionModel = new LiquidacionModel();
export default liquidacionModel;