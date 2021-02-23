// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  desktop: false,
  currency: {
    id: 'banano',
    name: 'Banano',
    ticker: 'BAN',
    precision: 29,
    maxSupply: 3402823669.2,
    prefix: 'ban',
    supportsMyNanoNinja: false
  },
  backends: [
    {
      name: 'Kalium',
      value: 'kalium',
      api: 'https://kaliumapi.appditto.com/api',
      ws: 'wss://kaliumapi.appditto.com',
      auth: null,
      shouldRandom: true,
    },
  ],
  representativeAccounts: [
    'ban_1cake36ua5aqcq1c5i3dg7k8xtosw7r9r7qbbf5j15sk75csp9okesz87nfn', // Official Rep - Cake
    'ban_1fomoz167m7o38gw4rzt7hz67oq6itejpt4yocrfywujbpatd711cjew8gjj', // Official Rep - FOMO
  ],
  defaultRepresentatives: [],
  donationAddress: 'ban_3niceeeyiaa86k58zhaeygxfkuzgffjtwju9ep33z9c8qekmr3iuc95jbqc8',
};
