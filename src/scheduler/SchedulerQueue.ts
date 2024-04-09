import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from './Scheduler'

export abstract class SchedulerQueue extends Scheduler {
  protected queueProcess: Process[]
  protected queueSubProcesses: SubProcess[]

  constructor() {
    super()
    this.queueProcess = []
    this.queueSubProcesses = []
  }

  public close(process: Process): void {
    this.queueProcess = this.queueProcess.filter(
      (p) => p.getId !== process.getId,
    )

    this.queueSubProcesses = this.queueSubProcesses.filter(
      (sp) => sp.getProcess.getId !== process.getId,
    )
  }
}
