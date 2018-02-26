/** # modified from https://github.com/metatribal/xmlToJSON */
const merge = require('./merge')
const val = require('./val')
const is = require('./is')
const prefixMatch = new RegExp(/(?!xmlns)^.*:/)
const trimMatch = new RegExp(/^\s+|\s+$/g)
const options = { // set up the default options
    mergeCDATA: true, // extract cdata and merge with text
    grokAttr: true, // convert truthy attributes to boolean, etc
    grokText: true, // convert truthy text/attr to boolean, etc
    normalize: true, // collapse multiple spaces to single space
    xmlns: true, // include namespaces as attribute in output
    namespaceKey: '_ns', // tag name for namespace objects
    textKey: '_text', // tag name for text nodes
    valueKey: '_value', // tag name for attribute values
    attrKey: '_attr', // tag for attr groups
    cdataKey: '_cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
    attrsAsObject: true, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
    stripAttrPrefix: true, // remove namespace prefixes from attributes
    stripElemPrefix: true, // same name diff namespaces, you can enable namespaces and access the nskey property
}


/**
 * @param {*} xml Source
 * @param {*} opt Options
 * @returns {*} Object
 */
const xmlToObject = (xml, opt = {}) => {
    merge(options, opt)
    let vResult = {},
        nLength = 0,
        tmp = '',
        sCollectedTxt = ''

    vResult[options.namespaceKey] = options.xmlns && xml.namespaceURI
        ? xml.namespaceURI
        : vResult[options.namespaceKey]

    if (xml.attributes && xml.attributes.length > 0) {
        const vAttribs = {}

        for (nLength; nLength < xml.attributes.length; nLength++) {
            const vContent = {}
            const oAttrib = xml.attributes.item(nLength)
            const attribName = options.stripAttrPrefix
                ? oAttrib.name.replace(prefixMatch, '')
                : oAttrib.name

            tmp = oAttrib.value.replace(trimMatch, '')
            vContent[options.valueKey] = options.grokAttr
                ? val(tmp)
                : tmp

            vContent[options.namespaceKey] = options.xmlns && oAttrib.namespaceURI
                ? oAttrib.namespaceURI
                : vContent[options.namespaceKey]

            if (options.attrsAsObject) { // attributes with same local name must enable prefixes
                vAttribs[attribName] = vContent
            } else {
                vResult[options.attrKey + attribName] = vContent
            }
        }

        vResult[options.attrKey] = options.attrsAsObject
            ? vAttribs
            : vResult[options.attrKey]
    }

    // iterate over the children
    if (xml.hasChildNodes()) {
        for (let oNode, sProp, vContent, nItem = 0; nItem < xml.childNodes.length; nItem++) {
            oNode = xml.childNodes.item(nItem)

            if (oNode.nodeType === 4) { /* nodeType is "CDATASection" (4) */
                tmp = options.cdataKey
                if (options.mergeCDATA) {
                    sCollectedTxt += oNode.nodeValue
                } else
                if (Object.keys(vResult).indexOf(options.cdataKey) >= 0) {
                    vResult[tmp] = is(vResult[tmp], Array)
                        ? vResult[tmp]
                        : [vResult[tmp]]
                    vResult[tmp].push(oNode.nodeValue)
                } else {
                    vResult[tmp] = oNode.nodeValue
                }
            } else
            if (oNode.nodeType === 3) { /* nodeType is "Text" (3) */
                sCollectedTxt += oNode.nodeValue
            } else
            if (oNode.nodeType === 1) { /* nodeType is "Element" (1) */
                vResult = nLength ? vResult : {}
                tmp = oNode.nodeName
                sProp = options.stripElemPrefix
                    ? tmp.replace(prefixMatch, '')
                    : tmp
                vContent = xmlToObject(oNode, opt)
                if (Object.keys(vResult).indexOf(sProp) >= 0) {
                    vResult[sProp] = is(vResult[sProp], Array)
                        ? vResult[sProp]
                        : [vResult[sProp]]
                    vResult[sProp].push(vContent)
                } else {
                    vResult[sProp] = vContent
                    nLength++
                }
            }
        }
    } else if (!sCollectedTxt) { // no children and no text, return null
        vResult[options.textKey] = null
    }

    if (sCollectedTxt) {
        tmp = sCollectedTxt.replace(trimMatch, '')
        if (options.grokText) {
            vResult[options.textKey] = val(tmp)
        } else if (options.normalize) {
            vResult[options.textKey] = tmp.replace(/\s+/g, ' ')
        } else {
            vResult[options.textKey] = tmp
        }
    }

    return vResult
}

module.exports = xmlToObject