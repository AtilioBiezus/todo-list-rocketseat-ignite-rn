import { useState } from 'react'
import { Alert, FlatList, SafeAreaView } from 'react-native'
import { FormInput } from '../FormInput'
import { TaskCard } from '../TaskCard'
import { TaskCardEmpty } from '../TaskCardEmpty'
import { TaskCounter } from '../TaskCounter'

import { styles } from './styles'

export interface TaskProps {
  id: string
  content: string
  isCompleted: boolean
}

export function Content() {
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function handleAddNewTask(task: TaskProps) {
    setTasks((prevState) => [...prevState, task])
  }

  function handleToggleTask(id: string) {
    const updatedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task,
    )

    setTasks(updatedTask)
  }

  function removeTask(id: string) {
    const tasksFiltered = tasks.filter((task) => task.id !== id)

    Alert.alert('Remover tarefa', 'Deseja remover essa tarefa?', [
      {
        text: 'Sim',
        onPress: () => setTasks(tasksFiltered),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  const tasksCreatedCounter = tasks.length

  const completedTasks = tasks.reduce((acc, task) => {
    return task.isCompleted ? acc + 1 : acc
  }, 0)

  return (
    <SafeAreaView style={styles.container}>
      <FormInput onAddNewTask={handleAddNewTask} />

      <TaskCounter
        tasksCreatedCounter={tasksCreatedCounter}
        completedTasks={completedTasks}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TaskCard
              task={item}
              onToggleCheckedTask={handleToggleTask}
              onRemoveTask={removeTask}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return <TaskCardEmpty />
        }}
      />
    </SafeAreaView>
  )
}
