import test from 'ava'
import { File } from '../src'
import { loadMirada } from './testUtil'
import fileType = require('file-type')

test('fromFile', async t => {
  await loadMirada()
  const file = await File.fromFile('test/assets/lenna.jpg')
  t.deepEqual(file.size(), { width: 400, height: 400 })
  t.deepEqual(fileType(await file.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  file.delete()
})

test('fromUrl', async t => {
    await loadMirada()
  const file = await File.fromUrl('https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg')
  t.deepEqual(file.size(), { width: 500, height: 333 })
  t.deepEqual(fileType(await file.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  file.delete()
})

test('write/read', async t => {
    await loadMirada()
  const file = await File.fromUrl('https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg')
  t.deepEqual(file.size(), { width: 500, height: 333 })
  t.deepEqual(fileType(await file.asArrayBuffer()), { ext: 'jpg', mime: 'image/jpeg' })
  file.delete()
})
