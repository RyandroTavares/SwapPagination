import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { CallType } from '../so/CallType'
import { Operation } from '../so/Operation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

//Primeiro que entra primeiro a sair, ou seja, uma Linha reta em resumo.
export class Line extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)

    const subProcesses = Operation.systemCall(CallType.REVIEW, undefined, process) as SubProcess[]

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
        type: SchedulerType.LINE,
      }
    } else {
      return undefined
    }
  }
}
