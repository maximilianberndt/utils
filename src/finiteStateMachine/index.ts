export interface State {
  name: string
  enter: (prevState?: State) => void
  exit: () => void
  update: (timeElapsed: number) => void
}

export const state = ({
  name = '',
  enter = () => null,
  exit = () => null,
  update = () => null,
}: Partial<State>): State => ({ name, enter, exit, update })

interface StateMachine {
  hasState: (name: State['name']) => boolean
  addState: (state: State) => void
  setState: (name: State['name']) => void
  update: State['update']
  currentState: () => State | null
}

export const finiteStateMachine = (
  initialStates: State[] = []
): StateMachine => {
  let currentState: State | null = null
  const states: { [name: string]: State } = {}

  const addState = (state: State) => {
    if (!state.name) return
    states[state.name] = state
  }

  initialStates.forEach(addState)

  return {
    addState,
    hasState: (name) => Boolean(states[name]),
    setState: (name: string) => {
      const prevState = currentState || undefined
      const nextState = states[name]

      if (!nextState) return

      if (prevState && prevState.name !== name) {
        prevState.exit()
      }

      nextState.enter(prevState)
      currentState = nextState
    },
    update: (timeElapsed: number) => {
      if (currentState) currentState.update(timeElapsed)
    },
    currentState: () => currentState,
  }
}
