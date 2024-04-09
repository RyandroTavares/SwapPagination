import { Process } from './process/Process'
import { Priority } from './scheduler/Priority'
import { CallType } from './so/CallType'
import { Operation } from './so/Operation'

//Cria os processos 1, 2 e 3. (Memória: 256)
const p1 = Operation.systemCall(CallType.CREATE_PROCESS, 100)
const p2 = Operation.systemCall(CallType.CREATE_PROCESS, 100)
const p3 = Operation.systemCall(CallType.CREATE_PROCESS, 56)

//Escreve na memória o processo 1, 2 e 3. (Prioridade 2)
Operation.systemCall(CallType.WRITE_MEMORY, undefined, p1 as Process,)
Operation.systemCall(CallType.WRITE_MEMORY, undefined, p2 as Process)
Operation.systemCall(CallType.WRITE_MEMORY, undefined, p3 as Process)

//Rever "CallType".
// console.log(Operation.systemCall(CallType.REVIEW, undefined, p1 as Process))
// SystemOperation.systemCall(SystemCallType.WAKE, undefined, p1 as Process)
// SystemOperation.systemCall(SystemCallType.STOP, undefined, p3 as Process)