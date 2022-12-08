
class ValidarCpf{
	constructor(cpfEnviado) {
		Object.defineProperty(this, 'cpfLimpo',{
			writable: false,
			enumerable: true,
			configurable: false,
			value: cpfEnviado.replace(/\D+/g,'')
		});

		
		}

		sequencia(){
			return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
		}

		valida(){
			if(! this.cpfLimpo)return false;
			if(typeof this.cpfLimpo !== 'string')return false;
			if(this.cpfLimpo.length !== 11)return false;
			if(this.sequencia()) return false;
			this.geraCpf();
			console.log(this.novoCpf);

			return this.novoCpf === this.cpfLimpo;
	}

	geraCpf(){
			const cpfSemDigito = this.cpfLimpo.slice(0, -2);
			const digito1 = ValidarCpf.geraDigito(cpfSemDigito);
			const digito2 = ValidarCpf.geraDigito(cpfSemDigito+digito1);
			this.novoCpf = cpfSemDigito +digito1 + digito2;
	}

	// quando um metodo no utiliza this pode se tranforma em estatico
	 static geraDigito(cpfSemDigito){
		let total = 0;
		let reverso = cpfSemDigito.length +1;

			// i => stirng numerica
		for(let i of cpfSemDigito){
			total += reverso * Number(i);
			reverso --;
		}

		const digito = 11 - (total % 11);
		return digito <=9?String(digito):'0';
	}
}

// let cpf = new ValidarCpf('070.987.720-03');
// if(cpf.valida()){
// 	console.log('CPF validado');
// }else{
// 	console.log('CPF invalido');
// }