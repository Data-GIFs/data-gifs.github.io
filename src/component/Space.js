import React from 'react'
import style from '../css/Space.module.scss'
import store from './store/store'

function DisplayChoice(props) {
    return (
        <div className={style.choice}>
            <div className={style.icon}>
                <img src={'icon/' + props.value.icon + '.svg'}/>
            </div>
            <div className={style.desc}>
                <p className={style.title}>{props.value.type.toUpperCase()}</p>
                <p>
                    <span className={style.tag}>Definition: </span>
                    {props.value.definition}
                </p>
                {props.value.example !== "" ? <img src={'example/' + props.value.example + '.png'} className={style.exampleImg} />: null}
            </div>
        </div>
    )
}

class Space extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
        }
    }

    handleClick = (idx) => {
        this.setState({current: idx})
    }

    render() {
        const space = store.getState()['space']
        const content = space[this.state.current]
        return (
            <div className={style.container}>
                {/* breadcrumbs navigation */}
                <div className={style.options}>
                    <ul style={{paddingLeft: '0px'}}>
                        {space.map((factor, index) => ([
                            <li key={index} 
                            className={this.state.current === index ? style.optSelected : style.opt}
                            onClick={this.handleClick.bind(this, index)}>
                                {factor.factor}
                            </li>,
                            index !== space.length - 1 ? "/" : ""]
                        ))}
                    </ul>
                </div>
                
                {/* design space content */}
                <div className={style.content}>
                    <div className={style.intro}>
                        <span className={style.quote}>" </span>
                        <span className={style.name}>{content.factor} </span>
                        <span>{content.desc}</span>
                        <span className={style.quote}>"</span>
                    </div>
                    <div className={style.factor}>
                        {content['choices'].map((choice, index) => (
                            <DisplayChoice key={index} value={choice} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Space