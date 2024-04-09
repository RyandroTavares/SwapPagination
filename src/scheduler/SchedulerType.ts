export enum SchedulerType {
  DRAWING,
  LINE,
  ROUND_ROBIN,
  INCREASING_DESCRESING,
  PRIORITY,
}

//DRAWING: Sorteio
//LINE: Primeiro a entrar primeiro a sair
//ROUND_ROBIN: Tarefas são executadas em ordem circular, repartindo cada um em uma quantia especifica
//INCREASING_DESCRESING: Menor para o maior, maior para o menor
//PRIORITY: Prioridade do processo