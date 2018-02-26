# upils

Collection of native progressive (es6) utility library

## all-platform

- `is` - type checking (Boolean)
- `merge` - object deep merge
- `objectToQueryString` - QueryString builder
- `queryStringToObject` - QueryString parser
- `val` - get native value from string

## browser only

- DOM specific
  - `allDOM` - selector of many DOM (Array)
  - `oneDOM` - selector of only one DOM
  - `removeDOM` - remove only one DOM, can be joined with `eachDOM`
  - `eachDOM` - iterate many DOM with callback
  - `wrapDOM` - wrap only one DOM with a new DOM
  - `xmlToObject` - parse xml to Object, useful for reading xml like format, e.g. rss feed
    (modified from <https://github.com/metatribal/xmlToJSON>)
  - `stringToDOM` - make a DOM from string
- DOM class specific
  - `hasClass` - check if a DOM has a className, can be joined with `eachDOM`
  - `addClass` - add className to all of DOM within the query
  - `removeClass` - remove className to all of DOM within the query
  - `toggleClass` - toggle className to all of DOM within the query
- event specific
  - `on` - addEventListener with passive event as default, non passive add `false` after callback
  - `off` - removeEventListener
- injection
  - `insertScript` - script injection (JSONP like)
  - `insertStyle` - style injection