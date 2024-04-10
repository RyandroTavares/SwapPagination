import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

export class RoundRobin extends SchedulerQueue {
  private countExecutedSubProcess: number = 0
  private processInExecution: Process | null = null

  constructor(private quantum: number) {
    super()
    this.quantum = quantum
  }

  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)

    const subProcesses = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcesses.forEach((sp) => {
      this.queueSubProcesses.push(sp)
    })

    this.processInExecution = this.queueProcess[0]
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    const element = this.queueSubProcesses.shift()

    if (element) {
      if (
        this.processInExecution?.getId &&
        element.getProcess.getId === this.processInExecution.getId
      ) {
        this.countExecutedSubProcess++
      }

      if (
        this.processInExecution &&
        this.processInExecution.getSize < this.quantum
      ) {
        if (this.processInExecution.getSize === 1) {
          this.countExecutedSubProcess = 0
          this.queueProcess.shift()
          this.processInExecution = this.queueProcess[0]

          return {
            element,
            priority: element.getProcess.getPriority,
            timeExecution: element.getProcess.getTimeExecution,
            type: SchedulerType.ROUND_ROBIN,
          }
        } else {
          this.countExecutedSubProcess = 0
          this.processInExecution = this.queueProcess[0]

          return {
            element,
            priority: element.getProcess.getPriority,
            timeExecution: element.getProcess.getTimeExecution,
            type: SchedulerType.ROUND_ROBIN,
          }
        }
      }

      if (this.countExecutedSubProcess === this.quantum) {
        this.rotate()
      }

      return {
        element,
        priority: element.getProcess.getPriority,
        timeExecution: element.getProcess.getTimeExecution,
        type: SchedulerType.ROUND_ROBIN,
      }
    } else {
      return undefined
    }
  }

  public rotate() {
    if (
      this.processInExecution &&
      this.processInExecution.getInstructions >
        this.processInExecution.getInstructionsExecuted
    ) {
      const subProcessesByProcess = this.getSubProcessByProcess()

      this.removeProcessAndSubProcess()

      this.addProcessAndSubProcessInEnd(subProcessesByProcess)

      this.processInExecution = this.queueProcess[0]
      this.countExecutedSubProcess = 0
    }
  }

  private getSubProcessByProcess() {
    return this.queueSubProcesses.filter(
      (sp) => sp.getProcess.getId === this.processInExecution?.getId,
    )
  }

  private removeProcessAndSubProcess() {
    this.queueProcess.shift()

    this.queueSubProcesses = this.queueSubProcesses.filter(
      (sp) => sp.getProcess.getId !== this.processInExecution?.getId,
    )
  }

  private addProcessAndSubProcessInEnd(subProcesses: SubProcess[]) {
    if (this.processInExecution) {
      this.queueProcess.push(this.processInExecution)

      subProcesses.forEach((sp) => {
        this.queueSubProcesses.push(sp)
      })
    }
  }
}
