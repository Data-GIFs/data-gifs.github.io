import React from 'react'
import style from '../css/Home.module.scss'
import store from './store/store'
import { Card, CardContent, CardMedia, Tooltip } from '@material-ui/core'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';


const styles = theme => ({
    root: {
        width: 300,
        marginBottom: 10,
        marginTop: 10,
    },
    cardContent: {
        padding: 8,
        "&:last-child": {
            paddingBottom: 0,
        }
    },
    fullscreen: {
        color: 'white',
        fontSize: '2em',
        backgroundColor: 'rgb(51, 51, 51, 0.75)',
        position: 'absolute',
        right: '0.5em',
        bottom: '0.5em'
    },
    backdrop: {
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    dialogPaper: {
        boxShadow:'none',
    },
    dialogTitle: {
        padding: '10px 16px',
        fontSize: '1.2em',
        fontWeight: 600,
        backgroundColor: 'rgb(76, 178, 193)',
        color: 'white',
    },
    dialogContent: {
        padding: 8,
    }
})

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 13,
    },
}))
function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props}/>;
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: '',
            gif: {},
            openDialog: false,
        }
    }
    

    renderGIFs = () => {
        const classes = this.props.classes
        const cards = store.getState()['gallery']
        return (
            <React.Fragment>
                {cards.map((card, index) => (
                    <Card className={classes.root} key={card.url}>
                        <div id={card.url} style={{ position: 'relative' }} onMouseEnter={this.showFullScreenIcon} onMouseLeave={this.hideFullScreenIcon}>
                            <CardMedia
                                component="img"
                                image={'corpus/' + card.url+'.gif'}
                            />
                            <FullscreenIcon className={classes.fullscreen} style={{ display: this.state.anchorEl === card.url ? 'inline' : 'none' }} onClick={this.openDialog.bind(this, index)} />
                            <Dialog open={this.state.openDialog} onClose={this.closeDialog} BackdropProps={{className: classes.backdrop}} classes={{paper: classes.dialogPaper}}>
                                <DialogTitle disableTypography className={classes.dialogTitle}>{this.state.gif['title']}</DialogTitle>
                                <DialogContent className={classes.dialogContent}>
                                    <CardMedia
                                        component="img"
                                        image={'corpus/' + this.state.gif['url'] + '.gif'}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <CardContent className={classes.cardContent}>
                                <p className={style.title}>
                                <BootstrapTooltip title="Click to see the source" placement="top">
                                    <a href={card.source}>{card.title}</a>
                                </BootstrapTooltip>
                                </p>
                            <p className={style.author}>
                                &copy; {card.author}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </React.Fragment>
        )  
    }

    showFullScreenIcon = (event) => {
        this.setState({ anchorEl: event.currentTarget.id})
    }

    hideFullScreenIcon = () => {
        this.setState({ anchorEl: '' })
    }

    openDialog = (idx) => {
        this.setState({ openDialog: true, gif: store.getState()['gallery'][idx] })
    }

    closeDialog = () => {
        this.setState({ openDialog: false, gif: {} })
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.intro}>
                    <div className={style.def}>
                        <span className={style.name}>Data-GIFs</span>
                        <span>
                            &nbsp; are enjoying increasing popularity on social media as a format for data-driven storytelling with visualization; simple visual messages are embedded in short animations that usually last less than 15 seconds and are played in automatic repetition. This site lists representative data-GIF examples we collected online and presents a design space of data-GIFs.
                        </span>
                        <p>
                            If you are interested in data-GIFs, get in touch with us. If you want to know more about research, see our <a className={style.link} href='http://arxiv.org/abs/2008.07227'>paper</a>.
                        </p>
                    </div>
                </div>

                <div className={style.publication}>
                    <div className={style.left}>
                        <iframe width="100%" height="270px" src="https://www.youtube.com/embed/PFLrrK_4jj0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className={style.right}>
                        <p className={style.paper}>
                            <a href='http://arxiv.org/abs/2008.07227'>What Makes a Data-GIF Understandable?</a>
                        </p>
                        <p className={style.journal}>
                            IEEE Transactions on Visualization and Computer Graphics (InfoVis 2020)
                        </p>
                        <p className={style.author}>
                            <a href='http://www.cse.ust.hk/~xshuaa/'>Xinhuan Shu</a>, <a href='http://awuac.student.ust.hk/'>Aoyu Wu</a>, <a href='https://ahugh19.github.io/'>Junxiu Tang</a>, <a href='https://visualinteractivedata.github.io/bach.html'>Benjamin Bach</a>, <a href='http://www.ycwu.org/'>Yingcai Wu</a>, <a href='http://huamin.org/'>Huamin Qu</a>
                        </p>
                    </div>
                </div>
                
                <div className={style.gallery}>
                    <div className={style.title}>
                        <span>Data-GIF Gallery</span>
                    </div>
                    <div className={style.subtitle}>
                        <a href="./gallery/index.html">view the whole gallery &gt;&gt;</a>
                    </div>
                    <div className={style.cards}>
                        {this.renderGIFs()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home)