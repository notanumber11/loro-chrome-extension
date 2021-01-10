// @ts-nocheck
// Based on: https://stackoverflow.com/questions/54376270/using-material-ui-components-inside-an-iframehttps://stackoverflow.com/questions/54376270/using-material-ui-components-inside-an-iframe
import React from "react";
import PropTypes from "prop-types";
import { create } from "jss";
import { withStyles, jssPreset } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import NoSsr from "@material-ui/core/NoSsr";
// import rtl from "jss-rtl";
import Frame from "react-frame-component";

const styles = theme => ({
    root: {
        border: "none",
        boxShadow: theme.shadows[1],
        zIndex: 1,
        // Based on: https://blog.theodo.com/2018/01/responsive-iframes-css-trick/
        position: "absolute",
        overflow: "hidden",
        top: "100%",
        left: "0%"
    }
});

class DemoFrame extends React.Component {
    state = {
        ready: false
    };

    constructor(props) {
        super(props);
        this.span = React.createRef();
    }

    handleRef = ref => {
        this.contentDocument = ref ? ref.node.contentDocument : null;
        this.contentWindow = ref ? ref.node.contentWindow : null;
    };

    onContentDidMount = () => {
        this.setState({
            ready: true,
            jss: create({
                plugins: [...jssPreset().plugins, /*rtl()*/],
                insertionPoint: this.contentWindow["demo-frame-jss"]
            }),
            sheetsManager: new Map(),
            container: this.contentDocument.body
        });
    };

    applyCssOverrides() {
        let fr = this.span.current.getElementsByTagName("iframe")[0];
        fr.contentDocument.getElementsByTagName("body")[0].setAttribute("style", "margin:0px");
        let width  = fr.contentWindow.document.body.scrollWidth;
        let height = fr.contentWindow.document.body.scrollHeight;
        fr.width = width;
        fr.height = height;
        fr.style.width = `${width}px`;
        fr.style.height= `${height}px`;
    }

    onContentDidUpdate = () => {
        this.contentDocument.body.dir = this.props.theme.direction;
        this.applyCssOverrides();
    };

    render() {
        const { children, classes } = this.props;

        // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
        return (
            <span ref={this.span}>
                <NoSsr>
                    <Frame
                        ref={this.handleRef}
                        className={classes.root}
                        scrolling="no"
                        // The default size should be 0 so it can be overriden according to the inside content
                        style={{width: "0px", height: "0px", maxWidth: "fit-content", maxHeight: "fit-content"}}
                        onLoad={()=> this.applyCssOverrides()}
                        contentDidMount={this.onContentDidMount}
                        contentDidUpdate={this.onContentDidUpdate}
                    >
                        <div id="demo-frame-jss" />
                        {this.state.ready ? (
                            <StylesProvider
                                jss={this.state.jss}
                                sheetsManager={this.state.sheetsManager}
                            >
                                {React.cloneElement(children, {
                                    container: this.state.container
                                })}
                            </StylesProvider>
                        ) : null}
                    </Frame>
                </NoSsr>
            </span>
        );
    }
}

DemoFrame.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DemoFrame);
