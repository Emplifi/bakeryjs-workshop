/* global cytoscape */

const layout = {
  name: 'dagre',
  nodeDimensionsIncludeLabels: true,
  animate: true,
}
const cy = cytoscape({
  container: document.getElementById('viz-graph'),
  boxSelectionEnabled: false,
  autounselectify: true,

  layout: {
    name: 'grid',
    rows: 5,
  },

  style: [
    {
      selector: 'node',
      css: {
        content: 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
      },
    },
    {
      selector: '$node > node',
      css: {
        'padding-top': '10px',
        'padding-left': '10px',
        'padding-bottom': '10px',
        'padding-right': '10px',
        'text-valign': 'top',
        'text-halign': 'center',
        'background-color': '#bbb',
      },
    },
    {
      selector: 'edge',
      css: {
        content: 'data(label)',
        'curve-style': 'bezier',
        width: 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
      },
    },
    {
      selector: ':selected',
      css: {
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
      },
    },
    {
      selector: '.group',
      style: {
        'text-valign': 'top',
        'text-halign': 'left',
        'background-color': '#fff',
      },
    },
    {
      selector: '.component',
      style: {
        shape: 'rectangle',
      },
    },
  ],
})

export function setElements(elements) {
  cy.json({ elements })
  const lay = cy.layout(layout)
  lay.run()
}
