import React from 'react'
import style from '../css/Navigation.module.scss'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paperAnchorRight: {
        backgroundColor: '#4F474E',
        width: '60vw'
    }
})

class Navigation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected: 0,
            atTop: true,
            screenWidth: document.documentElement.clientWidth,
            openMenu: false,
        }
    }

    componentDidMount() {
        let _this = this;
        //scrollbar listener
        window.addEventListener('scroll', function () {
            // is at top
            if (window.scrollY === 0) {
                _this.setState({ atTop: true });
            } 
            else { // not at top
                // first scroll down
                if (_this.state.atTop === true) {
                    _this.setState({ atTop: false });
                }
            }
        });
        window.addEventListener('resize', function(){
            _this.setState({ screenWidth: document.documentElement.clientWidth})
        })
    }

    switchPage = (i) => {
        this.setState({selected: i})
        this.props.onSwitchPage(i)
    }

    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({openMenu: open})
    }

    showMenu = () => {
        return (
            <div className={style.menuMobile} role="presentation" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
                <div className={style.menuCancel}>
                    <IconButton onClick={this.toggleDrawer(false)}>
                        <CloseIcon style={{ color: "white" }} />
                    </IconButton>
                </div>

                <div className={style.option} onClick={this.switchPage.bind(this, 0)}>
                    <span className={this.state.selected === 0 ? style.optionSelected : 'none'}>Gallery</span>
                </div>
                <div className={style.option} onClick={this.switchPage.bind(this, 1)}>
                    <span className={this.state.selected === 1 ? style.optionSelected : 'none'}>Design Space</span>
                </div>
                <div className={style.option} onClick={this.switchPage.bind(this, 2)}>
                    <span className={this.state.selected === 2 ? style.optionSelected : 'none'}>Design Suggestion</span>
                </div>
        </div>
        
    )}

    render() {
        const classes = this.props.classes

        // responsive: in large-screen
        if(this.state.screenWidth > 600) {
            return (
                <div className={style.container}>
                    {/* navigation */}
                    <div className={this.state.atTop ? style.head : style.headBg}>
                        <div className={style.logo} onClick={this.switchPage.bind(this, 0)}>Data-GIF</div>
                        <div className={style.menu}>
                            <div className={this.state.selected === 0 ? style.optionSelected : style.option} onClick={this.switchPage.bind(this, 0)}>Gallery</div>
                            <div className={this.state.selected === 1 ? style.optionSelected : style.option} onClick={this.switchPage.bind(this, 1)}>Design Space</div>
                            <div className={this.state.selected === 2 ? style.optionSelected : style.option} onClick={this.switchPage.bind(this, 2)}>Design Suggestion</div>
                        </div>
                    </div>

                    {/* banner */}
                    <div className={style.banner}>
                        <div className={style.bg}>
                            <div className={style.title}>
                                Data-GIF
                        </div>
                        </div>
                    </div>
                </div>
            ) 
        }
        // responsive: in small-screen
        else {
            const anchor = 'right'
            return (
                <div className={style.container}>
                    {/* navigation */}
                    <div className={this.state.atTop ? style.head : style.headBg}>
                        <div className={style.logo} onClick={this.switchPage.bind(this, 0)}>Data-GIF</div>
                        <IconButton onClick={this.toggleDrawer(true)}>
                            <MenuIcon style={{ color: "white" }} />
                        </IconButton>
                        <Drawer anchor={anchor} open={this.state.openMenu} onClose={this.toggleDrawer(false)} classes={{ paperAnchorRight: classes.paperAnchorRight }} >
                            {this.showMenu()}
                        </Drawer>
                    </div>

                    {/* banner */}
                    <div className={style.banner}>
                        <div className={style.bg}>
                            <div className={style.title}>
                                Data-GIF
                        </div>
                        </div>
                    </div>
                </div>
            ) 
        }
    }
}

export default withStyles(styles)(Navigation)