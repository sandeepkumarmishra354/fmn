import React, { PureComponent } from 'react'
import { StyleSheet, Text, Animated, StyleProp, ViewStyle, TextStyle } from 'react-native';

const COLOR_ERROR = "#B4161B";
const COLOR_NORMAL = "#242B2E";
const COLOR_SUCCESS = "#1FAA59";
const COLOR_INFO = "#1B98F5";
const COLOR_WARN = "#E07C24";
const VALUE_Y = 200;
const ANIMATION_DURATION = 400;
const SNACKBAR_DURATION = 3000; // 3 seconds

interface State {
    visible: boolean,
    message: string,
    color: string,
    fadeValue: Animated.Value
}

export interface ISnackbarComponentProps {
    style?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
    colorError?: string,
    colorNormal?: string,
    colorSuccess?: string,
    colorInfo?: string,
    colorWarn?: string,
    duration?: number,
    numberOfLines?: number
}

export type SnackbarType = "normal" | "error" | "success" | "info" | "warn";
//export type ToastPosition = "bottom" | "top" | "center";
export type SnackbarOption = {
    message: string,
    type?: SnackbarType,
    onClose?: () => void
}

export class SnackbarComponent extends PureComponent<ISnackbarComponentProps, State> {

    private _colorNormal: string;
    private _colorError: string;
    private _colorSuccess: string;
    private _colorInfo: string;
    private _colorWarn: string;
    private _timeout?: any;

    constructor(props: ISnackbarComponentProps) {
        super(props);
        this.state = {
            visible: false,
            message: "",
            color: COLOR_NORMAL,
            fadeValue: new Animated.Value(VALUE_Y)
        };
        this._colorNormal = props.colorNormal ?? COLOR_NORMAL;
        this._colorError = props.colorError ?? COLOR_ERROR;
        this._colorSuccess = props.colorSuccess ?? COLOR_SUCCESS;
        this._colorInfo = props.colorInfo ?? COLOR_INFO;
        this._colorWarn = props.colorWarn ?? COLOR_WARN;
    }

    private getColor = (type: SnackbarType) => {
        switch (type) {
            case "error":
                return this._colorError;
            case "info":
                return this._colorInfo;
            case "success":
                return this._colorSuccess;
            case "warn":
                return this._colorWarn;
            default:
                return this._colorNormal;
        }
    }

    private fadeIn = (cb?: Animated.EndCallback) => {
        Animated.timing(this.state.fadeValue, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start(cb);
    }

    private fadeOut = (cb?: Animated.EndCallback) => {
        Animated.timing(this.state.fadeValue, {
            toValue: VALUE_Y,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start(cb);
    }

    public show = (option: SnackbarOption) => {
        if (!this.state.visible) {
            let color = this.getColor(option.type ?? "normal");
            this.setState({
                visible: true,
                color,
                message: option.message
            });
            // Do fade-in transition
            this.fadeIn(() => {
                // register a timeout to close the snackbar after the given duration.
                this._timeout = setTimeout(() => {
                    this._timeout = undefined;
                    this.close(option.onClose);
                }, this.props.duration ?? SNACKBAR_DURATION);
            });
        }
    }

    public close = (cb?: () => void) => {
        if (this.state.visible) {
            // make sure to clear timeout if close is not invoked automatically.
            if (this._timeout)
                clearTimeout(this._timeout);
            // Do fade-out transition
            this.fadeOut(() => {
                this.setState({ visible: false, message: "", color: COLOR_NORMAL });
                cb?.();
            });
        }
    }

    render() {
        if (this.state.visible)
            return (
                <Animated.View
                    style={[
                        styles.container,
                        this.props.style,
                        { backgroundColor: this.state.color },
                        { transform: [{ translateY: this.state.fadeValue }] }
                    ]}>
                    <Text
                        style={[styles.message, this.props.labelStyle]}
                        numberOfLines={this.props.numberOfLines ?? 2}
                        ellipsizeMode="tail">
                        {this.state.message}
                    </Text>
                </Animated.View>
            );
        else
            return null;
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 20,
        position: "absolute",
        bottom: 0
    },
    message: {
        color: "#fff",
        fontSize: 14,
    }
});