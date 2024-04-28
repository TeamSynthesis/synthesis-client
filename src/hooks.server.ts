import { setGlobalDispatcher, Agent } from 'undici'

setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }))
