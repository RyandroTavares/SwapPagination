import { Process } from './Process'

export class SubProcess {
  private id: string
  private instructions: number
  private process: Process
  private isConclude: boolean

  constructor(id: string, process: Process) {
    this.id = id
    this.instructions = 7
    this.process = process
    this.isConclude = false
  }

  public finish() {
    this.isConclude = true
  }

  public get getId(): string {
    return this.id
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getIsConclude() {
    return this.isConclude
  }

  public get getProcess() {
    return this.process
  }
}
