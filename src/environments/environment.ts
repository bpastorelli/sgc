// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  protocol: 'http://',
  access: '/access',
  amqp: '/amqp',
  moradorUrl: '/morador',
  residenciaUrl: '/residencia',
  filtro: '/filtro',
  token: '/token',
  alterar: '/amqp/alterar',
  novo: '/amqp/novo',
  nova: '/amqp/nova',
  processo: '/amqp/processo',
  perfil: '/perfil',
  modulo: '/modulo',
  acessoModulo: '/acessoModulo',
  acessoFuncionalidade: '/acessoFuncionalidade',
  funcionalidade: '/funcionalidade',
  visitante: '/visitante',
  visita: '/visita', 
  veiculo: '/veiculo', 
  apiUrl: 'localhost:4200/api/sgc',
  apiUrlCep: `https://viacep.com.br/ws`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
