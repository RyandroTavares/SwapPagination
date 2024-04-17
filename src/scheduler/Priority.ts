import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { CallType } from '../so/CallType'
import { Operation } from '../so/Operation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

export class Priority extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    this.orderListByPriority()
    const element = this.queueSubProcesses.shift()

    if (element) {
      return {
        element,
        priority: element.getProcess.getPriority,
        timeExecution: element.getProcess.getTimeExecution,
        type: SchedulerType.PRIORITY,
      }
    } else {
      return undefined
    }
  }

  private orderListByPriority() {
    this.queueProcess.sort((a, b) => b.getPriority - a.getPriority)

    const process = this.queueProcess.shift()

    if (process) {
      const subProcess: SubProcess[] = Operation.call({
        typeCall: CallType.READ_PROCESS,
        process,
      }) as SubProcess[]

      subProcess.forEach((value) => {
        this.queueSubProcesses.push(value)
      })
    }
  }
}
