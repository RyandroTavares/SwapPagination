import { CpuManager } from '../cpu/CpuManager'
import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'

export abstract class Scheduler {
  private cpuManager: CpuManager

  constructor() {
    this.cpuManager = new CpuManager(this)
  }

  public abstract addSubProcess(process: Process): void
  public abstract execute(): ExecuteSchedulerResponse | undefined
  public abstract close(process: Process): void

  public get getCpuManage() {
    return this.cpuManager
  }
}
