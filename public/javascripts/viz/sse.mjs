const source = new EventSource('/viz/stream')

function msgHandler (cb) {
  return e => {
    console.log('msgHandler', event)
    cb(JSON.parse(event.data))
  }
}

source.addEventListener('open', e => {
  console.log('Connected')
})

source.addEventListener('error', e => {
  console.log('error', e)
})

export function onFlowSchema (cb) {
  source.addEventListener('flowSchema', msgHandler(cb))
}

export function onMessageSent (cb) {
  source.addEventListener('sent', msgHandler(cb))
}
