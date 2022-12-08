class ValidaForms{
  constructor(){
    this.fomrmulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos(){
    this.fomrmulario.addEventListener('submit', e=>{
      this.handleSubmit(e);
    });
  }
      handleSubmit(e){
        e.preventDefault();
       const campsValidos =  this.checaCampos();
       const senhasValidas = this.senhasSaoValidas();

       if(campsValidos && senhasValidas){
        alert('Formulario enviado com sucesso.');
        this.fomrmulario.submit();
       }
      }

      senhasSaoValidas(){
        let valid = true;

        const senha = this.fomrmulario.querySelector('.senha');
        const repetirSenha = this.fomrmulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
          valid = false;
          this.criaErro(senha,'As senhas não são iguais.');
          this.criaErro(repetirSenha,'As senhas não são iguais.');
        }

        if(senha.value.length < 6 || senha.value.length >12){
          valid = false;
          this.criaErro(senha, 'A senha precisa estar entre 6 e 12 caracteres.');
          this.criaErro(repetirSenha,'A senha precisa estar entre 6 e 12 caracteres.')
        }

        return valid;
      }

     checaCampos(){
        let valid = true;
        
        for(let errorText of this.fomrmulario.querySelectorAll('.error-text')){
          errorText.remove();
        }


        //  previousElementSibling => irmão anterior

        for(let campo of this.fomrmulario.querySelectorAll('.validar')){

            let label = campo.previousElementSibling.innerHTML;

          if(!campo.value){
              this.criaErro(campo,`campo ${label} nâo esta preenchido`);
              valid = false;
          }

          if(campo.classList.contains('cpf')){
            if(!this.ValidarCpf(campo))valid = false;
          }

          if(campo.classList.contains('usuario')){
            if(!this.validaUser(campo))valid = false;
          }
        }
        return valid;
    }

    ValidarCpf(campo){
          const cpf  = new ValidarCpf(campo.value);

          if(!cpf.valida()){
                this.criaErro(campo, 'cpf invalido');
                return false;
          }
          return true;
      }

      validaUser(campo){
          const usuario = campo.value;
          let valid = true;
          
          if(usuario.length<3 || usuario.length > 12){
            this.criaErro(campo,'Usuario não corresponde ao requisitos.');
            valid =  false;
          }

          if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo,'Usuario precisa conter apenas letras e/ou numero')
          }
        return valid;
      }


    criaErro(campo , msg){
      const div = document.createElement('div');
      div.innerHTML = msg;
      div.classList.add('error-text');
      campo.insertAdjacentElement('afterend', div);
    }
}

const valida =  new ValidaForms();