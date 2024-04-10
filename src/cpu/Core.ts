import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { SubProcess } from '../process/SubProcess'
import { SchedulerType } from '../scheduler/SchedulerType'

export class Core {
  private id: number
  private numberOfInstructionsByClock: number
  private _subProcess: SubProcess | undefined

  constructor(id: number, numberOfInstructionsByClock: number) {
    this.id = id
    this.numberOfInstructionsByClock = numberOfInstructionsByClock

    this._subProcess = undefined
  }

  public run({
    priority,
    timeExecution,
    type,
  }: Omit<ExecuteSchedulerResponse, 'element'>) {
    if (
      type === SchedulerType.FIRST_COME_FIRST_SERVED ||
      type === SchedulerType.ROUND_ROBIN ||
      type === SchedulerType.LOTTERY
    ) {
      console.log({ id: this._subProcess?.getId })
    }

    if (type === SchedulerType.PRIORITY) {
      console.log({
        id: this._subProcess?.getId,
        priority: priority === 2,
      })
    }

    if (type === SchedulerType.SHORTEST_JOB_FIRST) {
      console.log({ id: this._subProcess?.getId, timeExecution })
    }

    this.finish()
  }

  private finish() {
    if (
      this._subProcess &&
      this._subProcess.getProcess.getInstructions >
        this._subProcess.getProcess.getInstructionsExecuted
    ) {
      this._subProcess.finish()
      this._subProcess.getProcess.setInstructionsExecuted(
        this._subProcess.getInstructions,
      )
      this._subProcess.getProcess.checkSubProcessConclusions()
      this._subProcess = undefined
    }
  }

  public get getId() {
    return this.id
  }

  public get subProcess(): SubProcess | undefined {
    return this._subProcess
  }

  public set subProcess(subProcess: SubProcess | undefined) {
    this._subProcess = subProcess
  }
}
