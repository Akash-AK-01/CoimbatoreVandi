#!/usr/bin/env node
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { transformAsync } from '@babel/core';
import { glob } from 'glob';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const SRC = path.resolve(process.cwd(), 'src');

async function convertFile(file) {
  const src = await readFile(file, 'utf8');
  const hasJSX = /<\w+/.test(src) || /import React/.test(src);
  const ext = path.extname(file).toLowerCase();
  const outExt = (ext === '.ts' || ext === '.tsx') && hasJSX ? '.jsx' : '.js';

  const { code } = await transformAsync(src, {
    filename: file,
    presets: [
      ['@babel/preset-typescript', { allowDeclareFields: true }],
      ['@babel/preset-react', { runtime: 'automatic', development: false }]
    ],
    plugins: [],
    babelrc: false,
    configFile: false,
    sourceMaps: false,
  });

  const outFile = file.slice(0, -ext.length) + outExt;
  await writeFile(outFile, code, 'utf8');
  // remove original file
  await unlink(file);
  console.log(`Converted: ${file} -> ${outFile}`);
}

async function run() {
  const patterns = ['**/*.ts', '**/*.tsx'];
  const files = new Set();
  for (const p of patterns) {
    const matches = await glob(p, { cwd: SRC, absolute: true, nodir: true });
    matches.forEach((m) => files.add(m));
  }

  if (files.size === 0) {
    console.log('No TypeScript files found in src/');
    return;
  }

  for (const f of Array.from(files)) {
    try {
      await convertFile(f);
    } catch (err) {
      console.error('Failed to convert', f, err.message || err);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
