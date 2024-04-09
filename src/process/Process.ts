export class Process {
  private id: string
  private size: number
  private instructions: number
  private instructionsExecuted: number
  private subProcess: string[]
  private timeExecution: number
  private priority: number
  private inputMemory: number

  public static COUNT_PROCESS = 0

  constructor(size: number, priority?: number) {
    Process.COUNT_PROCESS++
    this.inputMemory = Date.now()

    this.id = `P${Process.COUNT_PROCESS}`
    this.size = size

    this.subProcess = []
    this.insertSubProcess()

    this.instructions = this.subProcess.length * 7
    this.instructionsExecuted = 0

    this.timeExecution = Math.round(Math.random() * 50)

    const randomPriority = Math.floor(Math.random() * 2)
    this.priority = priority || randomPriority
  }

  private insertSubProcess() {
    for (let i = 0; i < this.getSize; i++) {
      this.subProcess.push(`${this.id}-${i}`)
    }
  }

  public checkSubProcessConclusions() {
    if (this.instructionsExecuted === this.instructions) {
      console.log(
        `--------------------------------------------------------------`,
      )
      console.log(`Process ${this.id} finalized`)
      console.log(
        `--------------------------------------------------------------`,
      )
    }
  }

  public setInputMemory(inputMemory: number) {
    this.inputMemory = inputMemory
  }

  public setInstructionsExecuted(quantity: number) {
    this.instructionsExecuted += quantity
  }

  public get getInputMemory() {
    return this.inputMemory
  }

  public get getInstructionsExecuted() {
    return this.instructionsExecuted
  }

  public get getId() {
    return this.id
  }

  public get getSize() {
    return this.size
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getSubProcess() {
    return this.subProcess
  }

  public get getTimeExecution() {
    return this.timeExecution
  }

  public get getPriority() {
    return this.priority
  }
}
