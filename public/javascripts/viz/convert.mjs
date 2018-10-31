import Hash from '../hash.mjs'

export function schemaToElements (schema, boxMetas) {
  const { process } = schema

  const elements = []
  const providers = new Hash((hash, key) => {
    const arr = []
    hash[key] = arr
    return arr
  })
  serial({ node: process, parent: null, i: 0, elements, providers, boxMetas })
  return elements
}

export function edgeId (source, target) {
  return `${source}:${target}`
}

function serial ({ node, parent, i, elements, providers, boxMetas }) {
  let id
  if (parent) {
    id = `${parent}.serial-${i}`
  } else {
    id = `serial-${i}`
  }
  elements.push({
    data: { id, parent, label: 'serial' },
    classes: 'group serial',
  })
  let j = 0
  for (const parallelGroup of node) {
    parallel({
      node: parallelGroup,
      parent: id,
      i: j,
      elements,
      providers,
      boxMetas,
    })
    j++
  }
}

function parallel ({ node, parent, i, elements, providers, boxMetas }) {
  const id = `${parent}.par-${i}`
  elements.push({
    data: { id, parent, label: 'parallel' },
    classes: 'group parallel',
  })
  let j = 0
  for (const comp of node) {
    component({
      node: comp,
      parent: id,
      i: j,
      elements,
      providers,
      boxMetas,
    })
    j++
  }
}

function component ({ node, parent, i, elements, providers, boxMetas }) {
  let componentName
  let nestedComponents
  if (typeof node === 'string') {
    componentName = node
  } else {
    const [name, nested] = Object.entries(node)[0]
    componentName = name
    nestedComponents = nested
  }
  const meta = boxMetas[componentName]
  elements.push({
    data: {
      id: componentName,
      parent,
      label: componentName,
    },
    classes: 'component',
  })
  if (meta.provides.length) {
    providers[componentName].push(...meta.provides)
  }
  for (const provides of meta.provides) {
    providers[provides].push(componentName)
  }
  for (const requires of meta.requires) {
    providers[requires].forEach(providerComponent => {
      elements.push({
        data: {
          id: edgeId(providerComponent, componentName),
          source: providerComponent,
          target: componentName,
          label: requires,
        },
      })
    })
  }
  if (nestedComponents) {
    serial({
      node: nestedComponents,
      parent: componentName,
      i: 0,
      elements,
      providers,
      boxMetas,
    })
  }
}

