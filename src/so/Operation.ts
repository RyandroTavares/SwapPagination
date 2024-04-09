import { Process } from '../process/Process'
import { CallType } from './CallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { Line } from '../scheduler/Line'
import { Drawing } from '../scheduler/Drawing'
import { IncreasingDescresing } from '../scheduler/IncreasingDescresing'
import { Priority } from '../scheduler/Priority'
import { RoundRobin } from '../scheduler/RoundRobin'
import { HDManager } from '../memory/HDManager'

interface SystemCallProps {
  typeCall: CallType
  processSize?: number
  process?: Process
  priority?: number
}

//Drawing: Sorteio
//Line: Primeiro a entrar primeiro a sair
//RoundRobin: Tarefas são executadas em ordem circular, repartindo cada um em uma quantia especifica
//IncreasingDescresing: Menor para o maior, maior para o menor
//Priority: Prioridade do processo
export class Operation {
  public static memoryManager = new MemoryManager()
  public static hdManager = new HDManager()
  public static scheduler: Scheduler = new Priority()

  public static systemCall(
    typeCall : CallType,
    processSize?: number,
    process?: Process,
    priority?: number
  ): Process | void | SubProcess[] {
    if (typeCall === CallType.CREATE_PROCESS && processSize && !process) {
      return new Process(processSize, priority)
    }

    if (typeCall === CallType.WRITE_MEMORY && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
      } else {
        const processes = this.memoryManager.swap(process)

        for (let i = 0; i < processes.length; i++) {
          const element = processes[i]
          this.hdManager.write(element)
          this.scheduler.close(element)
        }

        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
      }
    }

    if (typeCall === CallType.REVIEW && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === CallType.DELETE_PROCESS && process) {
      this.scheduler.close(process)
      return this.memoryManager.delete(process)
    }

    if (typeCall === CallType.INTERRUPTION && process) {
      this.scheduler.close(process)
    }

    if (typeCall === CallType.ARISE && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addSubProcess(process)
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
