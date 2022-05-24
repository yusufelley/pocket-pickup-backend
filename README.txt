Running The Server:

to generate node_modules type: "npm i"
to run server: "npm start"



File Structure:

Entry Point   | "server.ts"
configs       | Contains application configurations
dist          | This folder is used to output .js code from .ts code by the TypeScript compiler.
middlewares   | Contains middleware functions
models        | Contains mongoDB models
node_modules  | Contains code for dependencies. This should be gitignored
routes        | Contains logic for routes
utils         | Contains helper utility functions that may be used in many middlewares
.env          | Stores environment variables. This should be gitignored
package.json  | This json file is used by npm to manage projects dependencies.
              | This allows the node_modules to be gitignored and generated on the developers machince (reduces size of repo).
tsconfig.json | TypeScript compiler configurations
tslint.json   | Additional TypeScript compiler configurations 