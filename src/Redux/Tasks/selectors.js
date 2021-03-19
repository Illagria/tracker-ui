export function getOpenTasks(state) {
    const allTasks = state.tasks
    if (allTasks.length === 0) { return [] }
    return Object.values(allTasks).filter(task => !task.complete)
}