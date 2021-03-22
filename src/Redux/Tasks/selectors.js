export function getTasks(state) {
    const allTasks = state.tasks
    if (allTasks.length === 0) { return [] }
    return Object.values(allTasks).sort((a, b) => a.complete === b.complete ? 1 : b.complete ? -1 : 0)
}

export function selectTaskById(state, id) {
    return state.tasks[id] ?? {}
}