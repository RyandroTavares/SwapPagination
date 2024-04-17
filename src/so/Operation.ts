import { Process } from '../process/Process'
import { CallType } from './CallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { HDManager } from '../memory/HDManager'
import { IncreasingDescresing as IncreasingDescreasing } from '../scheduler/IncreasingDescresing'
import { Priority } from '../scheduler/Priority'
import { RoundRobin } from '../scheduler/RoundRobin'
import { Lottery } from '../scheduler/Lottery'
import { FirstInFirstOut } from '../scheduler/FirstInFirstOut'
import { time } from 'console'

interface CallProps {
  typeCall: CallType
  processSize?: number
  process?: Process
  timeExecution?: number
  priority?: number
}

export class Operation {
  public static memoryManager = new MemoryManager()
  public static hdManager = new HDManager()
  public static scheduler: Scheduler = new RoundRobin(3)

  public static call({
    typeCall,
    processSize,
    process,
    timeExecution,
    priority,
  }: CallProps): Process | void | SubProcess[] {
    if (typeCall === CallType.CREATE_PROCESS && processSize && !process) {
      const timeExecutionValue = typeof timeExecution !== 'undefined' ? timeExecution : 0;
      return new Process(processSize, timeExecutionValue, priority)
    }

    if (typeCall === CallType.WRITE_PROCESS && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
      } else {
        // const processes = this.memoryManager.swap(process)

        // for (let i = 0; i < processes.length; i++) {
        //   const element = processes[i]
        //   this.hdManager.write(element)
        //   this.scheduler.close(element)
        // }

        // this.memoryManager.write(process)
        // this.scheduler.addSubProcess(process)
        console.log("Page Fault")
      }
    }

    if (typeCall === CallType.READ_PROCESS && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === CallType.DELETE_PROCESS && process) {
      this.scheduler.close(process)
      return this.memoryManager.delete(process)
    }

    if (typeCall === CallType.STOP_PROCESS && process) {
      this.scheduler.close(process)
    }

    if (typeCall === CallType.WAKE_PROCESS && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
        this.hdManager.remove(process)
      } else {
        const processes = this.memoryManager.swap(process)

        for (let i = 0; i < processes.length; i++) {
          const element = processes[i]
          this.hdManager.write(element)
          this.scheduler.close(element)
        }

        process.setInputMemory(Date.now())

        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
        this.hdManager.remove(process)
      }
    }
  }
}
