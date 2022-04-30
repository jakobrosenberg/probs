declare namespace _default {
    export { fork };
    export { worker };
    export { main };
}
export default _default;
import { fork } from "./fork/index.js";
import { worker } from "./worker/index.js";
import { main } from "./main/index.js";
