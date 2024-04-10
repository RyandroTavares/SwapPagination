import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

export class Lottery extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    this.randomFirstProcess()

    const element = this.queueSubProcesses.shift()

    if (element) {
      return {
        element,
        priority: element.getProcess.getPriority,
        timeExecution: element.getProcess.getTimeExecution,
        type: SchedulerType.FIRST_COME_FIRST_SERVED,
      }
    } else {
      return undefined
    }
  }

  private randomFirstProcess() {
    const randomIndex = Math.floor(Math.random() * this.queueProcess.length)
    const process = this.queueProcess[randomIndex]

    if (process) {
      const subProcess: SubProcess[] = SystemOperation.systemCall({
        typeCall: SystemCallType.READ,
        process,
      }) as SubProcess[]

      subProcess.forEach((value) => {
        this.queueSubProcesses.push(value)
      })

      this.queueProcess = this.queueProcess.filter(
        (p) => p.getId !== process.getId,
      )
    }
  }
}
