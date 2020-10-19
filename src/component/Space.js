import React from 'react'
import style from '../css/Space.module.scss'
import store from './store/store'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen'

// click the example image to show the animated GIF
function DisplayGIF(props) {
    // const classes = this.props.classes
    return (
        <React.Fragment>
            <img src={props.value} className={style.exampleImg} />
            {/* <FullscreenIcon className={classes.fullscreen} style={{ display: this.state.anchorEl === card.url ? 'inline' : 'none' }} onClick={this.openDialog.bind(this, index)} /> */}
            {/* <Dialog open={this.state.openDialog} onClose={this.closeDialog} BackdropProps={{ className: classes.backdrop }} classes={{ paper: classes.dialogPaper }}>
                <DialogTitle disableTypography className={classes.dialogTitle}>{this.state.gif['title']}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <CardMedia
                        component="img"
                        image={'corpus/' + this.state.gif['url'] + '.gif'}
                    />
                </DialogContent>
            </Dialog> */}
        </React.Fragment>
    )   
}

// show each design choice
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
                {/* {props.value.example !== "" ? <img src={'example/' + props.value.example + '.png'} className={style.exampleImg} />: null} */}
                {props.value.example !== "" ? <DisplayGIF value={'example/' + props.value.example + '.png'} /> : null}
            </div>
        </div>
    )
}

class Space extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            anchorEl: '',
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