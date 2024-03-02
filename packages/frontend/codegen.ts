import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://api.studio.thegraph.com/query/67001/venndao-sepolia/version/latest',
  documents: ['pages/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/': {
      preset: 'client'
    }
  }
}
 
export default config
