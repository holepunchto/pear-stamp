# pear-stamp

> Pear template transforms

## API

Placeholder syntax: `__name__`, allowed: `[a-zA-Z/\\.:]*`.

## `stamp.sync(template, locals[, shave])`

Interleaves `template` parts with `locals[name]`. Expectes sanitized/escaped inputs. 

Returns `string`.

* `template`: `string` containing placeholders
* `locals`: `{ [name: string]: any }` interpolation values
* `shave` : `{ [name: string]: [before: number, after: number] }`

## `stamp.stream(template, locals[, shave])`

Interleaves `template` parts with value-expanded `locals[name]`. 

Returns `streamx.Readable` (`objectMode: true`).

* `template`: `string` containing placeholders
* `locals`: `{ [name: string]: any }` interpolation values
* `shave` : `{ [name: string]: [before: number, after: number] }` slices per before & after for a given local value

## License

Apache-2.0