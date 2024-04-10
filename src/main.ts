import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const p1 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 99,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p1 as Process,})
const p2 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 41,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p2 as Process,})
const p3 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 57,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p3 as Process,})
const p4 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 19,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p4 as Process,})
const p5 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 40,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p5 as Process,})
const p6 = SystemOperation.systemCall({typeCall: SystemCallType.CREATE, processSize: 100,})
SystemOperation.systemCall({typeCall: SystemCallType.WRITE, process: p6 as Process,})


console.log(SystemOperation.hdManager.getHd)

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WAKE,
//   process: p1 as Process,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WAKE,
//   process: p2 as Process,
// })
