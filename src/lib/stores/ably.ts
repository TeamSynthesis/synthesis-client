import { readable, writable } from "svelte/store";
import Ably from "ably"

const ably = writable<Ably.Realtime>();
const channel = writable<Ably.RealtimeChannel>();
export default ably;
export {channel}