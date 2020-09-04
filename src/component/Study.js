import React from 'react'
import style from '../css/Study.module.scss'
import store from './store/store'

function Suggestion(props) {
    return (
        <div className={style.suggestion}>
            <div className={style.icon}>
                <img src={'icon/' + props.value.icon + '.svg'} />
            </div>
            <div className={style.desc}>
                <p className={style.title}>{props.value.title.toUpperCase()}</p>
                <p>
                    {props.value.desc}
                </p>
            </div>
        </div>
    )
}

class Study extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const suggestions = store.getState()['suggestions']
        return (
            <div className={style.container}>
                <div className={style.intro}>
                    <span>To gain an understanding of what makes a data-GIF understandable to its audience, we conduct a qualitative study through semi-structured interviews, complemented by an extensive online study with with a total of 118 participants. We use a representative subset of 20 of our collected real-world GIFs in order to reduce the study’s complexity. The studies indicate that many design factors have an impact on the understandability of data-GIFs.</span>
                    
                    <p>This page presents a set of design suggestions for creating more effective data-GIFs which we derived from the results. Details about our experiments can be found in the <a href='http://arxiv.org/abs/2008.07227'>paper</a>. The study materials can be downloaded <a href=''>here</a>, including the stimuli GIFs and questionnaires for participants, as well as their responses.</p>
                </div>

                <div className={style.content}>
                    {suggestions.map((sugg, index) => (
                        <Suggestion key={index} value={sugg} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Study