'use strict'

const { test } = require('brittle')
const { Readable } = require('streamx')
const fs = require('bare-fs')
const path = require('bare-path')

const stamp = require('..')

const dirname = __dirname

test('stamp sync', async function (t) {
  t.plan(1)

  const templateFile = path.join(dirname, 'fixtures', 'stamp', 'template.html')
  const finalFile = path.join(dirname, 'fixtures', 'stamp', 'final.html')

  const template = await fs.promises.readFile(templateFile, 'utf8')
  const final = await fs.promises.readFile(finalFile, 'utf8')

  const locals = { name: 'world', version: 'v.1.2.3', url: 'https://docs.pears.com/' }
  const res = stamp.sync(template, locals)
  t.is(res, final)
})

test('stamp stream', async function (t) {
  t.plan(1)

  const templateFile = path.join(dirname, 'fixtures', 'stamp', 'template.html')
  const finalFile = path.join(dirname, 'fixtures', 'stamp', 'final.html')

  const template = await fs.promises.readFile(templateFile, 'utf8')
  const final = await fs.promises.readFile(finalFile, 'utf8')

  const locals = { name: 'world', version: 'v.1.2.3', url: 'https://docs.pears.com/' }
  const stream = stamp.stream(template, locals)
  t.teardown(() => stream.destroy())

  let res = ''
  stream.on('data', (chunk) => {
    res += chunk
  })
  await new Promise((resolve) => stream.on('end', resolve))
  t.is(res, final)
})

test('stamp stream w/ promise local', async function (t) {
  t.plan(1)

  const templateFile = path.join(dirname, 'fixtures', 'stamp', 'template.html')
  const finalFile = path.join(dirname, 'fixtures', 'stamp', 'final.html')

  const template = await fs.promises.readFile(templateFile, 'utf8')
  const final = await fs.promises.readFile(finalFile, 'utf8')

  const locals = { name: 'world', version: Promise.resolve('v.1.2.3'), url: 'https://docs.pears.com/' }
  const stream = stamp.stream(template, locals)
  t.teardown(() => stream.destroy())

  let res = ''
  stream.on('data', (chunk) => {
    res += chunk
  })
  await new Promise((resolve) => stream.on('end', resolve))
  t.is(res, final)
})

test('stamp stream w/ stream local', async function (t) {
  t.plan(1)

  const templateFile = path.join(dirname, 'fixtures', 'stamp', 'template.html')
  const finalFile = path.join(dirname, 'fixtures', 'stamp', 'final.html')

  const template = await fs.promises.readFile(templateFile, 'utf8')
  const final = await fs.promises.readFile(finalFile, 'utf8')

  const locals = { name: 'world', version: Readable.from(['v.1.2.3']), url: 'https://docs.pears.com/' }
  const stream = stamp.stream(template, locals)
  t.teardown(() => stream.destroy())

  let res = ''
  stream.on('data', (chunk) => {
    res += chunk
  })
  await new Promise((resolve) => stream.on('end', resolve))
  t.is(res, final)
})

