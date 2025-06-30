# App

Gympass style app

## RFs (Requisitos Funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel realizar login;
- [ ] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de Negócio)

- [] O usuario não deve poder se cadastrar com um email ja existente;
- [] O usuario não pode fazer 2 check-ins no mesmo dia;
- [] O usuario não pode fazer check-ins se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por admintradores;
- [] A academia só pode ser cadastrada por administradores



## RNFs (Requisitos não funcionais)

- [] A senha do usuario precisa estar criptografada;
- [] Os dados da aplicacao precisam estar em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [] A aplicacao precisa ter um sistema de login com JWT;