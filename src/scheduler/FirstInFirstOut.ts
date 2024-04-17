import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { CallType } from '../so/CallType'
import { Operation } from '../so/Operation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

export class FirstInFirstOut extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)

    const subProcesses = Operation.call({
      typeCall: CallType.READ_PROCESS,
      process,
    }) as SubProcess[]

    subProcesses.forEach((sp) => {
      this.queueSubProcesses.push(sp)
    })
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    const element = this.queueSubProcesses.shift()

    if (element) {
      return {
        element,
        priority: element.getProcess.getPriority,
        timeExecution: element.getProcess.getTimeExecution,
        type: SchedulerType.FIRST_IN_FIRST_OUT,
      }
    } else {
      return undefined
    }
  }
}
