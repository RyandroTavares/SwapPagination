import { Process } from './process/Process'
import { CallType } from './so/CallType'
import { Operation } from './so/Operation'

//ProcessSize: number, TimeExecution: number, Priotiry: number

const p1 = Operation.call({typeCall: CallType.CREATE_PROCESS, processSize: 75, timeExecution: 10, priority: 1})
Operation.call({typeCall: CallType.WRITE_PROCESS, process: p1 as Process,})

const p2 = Operation.call({typeCall: CallType.CREATE_PROCESS, processSize: 90, timeExecution: 5, priority: 2})
Operation.call({typeCall: CallType.WRITE_PROCESS, process: p2 as Process,})

const p3 = Operation.call({typeCall: CallType.CREATE_PROCESS, processSize: 34, timeExecution: 15, priority: 3})
Operation.call({typeCall: CallType.WRITE_PROCESS, process: p3 as Process,})

const p4 = Operation.call({typeCall: CallType.CREATE_PROCESS, processSize: 58, timeExecution: 15, priority: 3})
Operation.call({typeCall: CallType.WRITE_PROCESS, process: p4 as Process,})

const p5 = Operation.call({typeCall: CallType.CREATE_PROCESS, processSize: 66, timeExecution: 15, priority: 3})
Operation.call({typeCall: CallType.WRITE_PROCESS, process: p5 as Process,})

Operation.call({typeCall: CallType.WAKE_PROCESS, process: p1 as Process,})

console.log(Operation.hdManager.getHd)
