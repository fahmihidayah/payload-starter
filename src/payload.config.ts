// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/config'
import { Posts } from './collections/Posts/config'
import { Categories } from './collections/Categories/config'
import { Media } from './collections/Media'
import getCloudStoragePlugin from './plugins/cloud-storage-plugin'
import { endpointsV1 } from './features/api/v1'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  endpoints: [...endpointsV1],
  collections: [Users, Posts, Categories, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI || '',
  //   },
  // }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // getCloudStoragePlugin(),
    // storage-adapter-placeholder
  ],
})
