import React, { Component } from 'react'
import { Button, Segment, Input, Icon, List } from 'semantic-ui-react'

export default class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1,
            name: '',
            todoList: [
                { id: 1, task: 'coding', done: false, fontcolor: 'red', decoration: '' },
            ],
            completedList: [{ id: 2, task: 'running', done: false, fontcolor: 'red', decoration: '' },
            ],
            pendingList: [{ id: 3, task: 'study', done: false, fontcolor: 'red', decoration: '' },
            ]
        }
    }

    onChange = (e) => this.setState({ name: e.target.value });
    handleChange = (e) => {
        const { todoList, counter } = this.state;
        if (this.state.name !== '') {
            todoList.push({ id: counter + 1, task: this.state.name, done: false, fontcolor: 'red', decoration: '' })
            this.setState((previousState, currentProps) => {
                return { todoList, counter: counter + 1, name: '' };
            });
        }
    }

    removeTask(id) {
        const { todoList } = this.state;
        const target = todoList.findIndex(e => e.id === id);
        todoList.splice(target, 1);
        this.setState((previousState, currentProps) => {
            return { todoList };
        });
    }

    markTodoDone(id, e) {
        const { todoList, completedList, pendingList } = this.state;
        let todo = todoList[id];
        todoList.splice(id, 1);
        todo.done = !todo.done;
        todo.done ? todoList.push(todo) : todoList.unshift(todo);
        todo.fontcolor = todo.done ? "green" : "red";
        todo.decoration = todo.done ? 'line-through' : '';
        this.setState({
            todoList,
        })
        // if (todo.done) {
        //     const pendingTarget = pendingList.findIndex(ele => ele.id === todo.id);
        //     const completeTarget = completedList.findIndex(ele => ele.id === todo.id);

        //     if (completeTarget === -1) {
        //         completedList.push(todo);
        //     }
        //     if (pendingTarget === -1) {
        //         pendingList.splice(pendingTarget, 1)
        //     }
        // } else {
        //     const pendingTarget = pendingList.findIndex(ele => ele.id === todo.id);
        //     const completeTarget = completedList.findIndex(ele => ele.id === todo.id);
        //     console.log('completeTarget: ', completeTarget)
        //     if (completeTarget === -1) {
        //         completedList.splice(completeTarget, 1)
        //     }
        //     if (pendingTarget === -1) {
        //         pendingList.push(todo)
        //         console.log('pendingList: ', pendingList)
        //     }
        // }
    }


    render() {
        return (
            <div style={{ marginTop: 20, marginLeft: '15%', marginRight: '15%' }}>
                <Segment color='teal' raised>
                    <h1 style={{ textAlign: 'center', color: 'purple' }}>Todo List</h1>

                    <Input placeholder='Add a new todo...'
                        style={{ marginLeft: '40%' }}
                        onChange={(e) => this.onChange(e)}
                        value={this.state.name} />

                    <Button color='teal' animated='vertical' onClick={(e) => this.handleChange(e)}
                        style={{ marginLeft: '20px' }}
                        size='large'
                        circular>
                        <Button.Content hidden>Add task</Button.Content>
                        <Button.Content visible>
                            <Icon name='add' />
                        </Button.Content>
                    </Button>

                    <List size='huge' verticalAlign='middle' divided>
                        {
                            this.state.todoList.map((option, index) =>
                                <List.Item key={index} className='list-add'>
                                    <List.Content floated='right'>
                                        <Icon name='remove'
                                            onClick={() => this.removeTask(option.id)}
                                            size='small'
                                            color='red'
                                            circular inverted />
                                    </List.Content>

                                    <List.Icon name='checkmark'
                                        onClick={(e) => this.markTodoDone(index, e)}
                                        size='small'
                                        circular inverted
                                        color='blue' />

                                    <List.Content
                                        style={{ color: option.fontcolor, textDecoration: option.decoration }}>
                                        {option.task}
                                    </List.Content>
                                </List.Item>
                            )
                        }
                    </List>

                    {/* completedList
                    <List size='huge' verticalAlign='middle' divided>
                        {
                            this.state.completedList.map((option, index) =>
                                <List.Item key={index} className='list-add'>
                                    <List.Content floated='right'>
                                        <Icon name='remove'
                                            // onClick={() => this.removeTask(option.id)}
                                            size='small'
                                            color='red'
                                            circular inverted />
                                    </List.Content>

                                    <List.Icon name='checkmark'
                                        // onClick={(e) => this.markTodoDone(index, e)}
                                        size='small'
                                        circular inverted
                                        color='blue' />

                                    <List.Content
                                        style={{ color: option.fontcolor, textDecoration: option.decoration }}>
                                        {option.task}
                                    </List.Content>
                                </List.Item>
                            )
                        }
                    </List>

                    pendingList
                    <List size='huge' verticalAlign='middle' divided>
                        {
                            this.state.pendingList.map((option, index) =>
                                <List.Item key={index} className='list-add'>
                                    <List.Content floated='right'>
                                        <Icon name='remove'
                                            // onClick={() => this.removeTask(option.id)}
                                            size='small'
                                            color='red'
                                            circular inverted />
                                    </List.Content>

                                    <List.Icon name='checkmark'
                                        // onClick={(e) => this.markTodoDone(index, e)}
                                        size='small'
                                        circular inverted
                                        color='blue' />

                                    <List.Content
                                        style={{ color: option.fontcolor, textDecoration: option.decoration }}>
                                        {option.task}
                                    </List.Content>
                                </List.Item>
                            )
                        }
                    </List> */}
                </Segment>
            </div>
        )
    }
}