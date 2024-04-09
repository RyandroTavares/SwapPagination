import { Process } from '../process/Process'

export class HDManager {
  private hd: Process[]
  constructor() {
    this.hd = []
  }

  public write(process: Process) {
    this.hd.push(process)
  }

  public remove(process: Process) {
    this.hd = this.hd.filter((p) => p.getId !== process.getId)
  }

  public get getHd() {
    return this.hd
  }
}
