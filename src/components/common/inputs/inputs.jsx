import React from 'react'
import {Field} from "redux-form";
import style from './inputs.module.css'
import TextareaAutosize from "react-textarea-autosize";
import cn from 'classnames'

let FormArea = ({input, meta, child, ...props}) => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={cn({[style.error]: hasError})}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormArea {...props}><TextareaAutosize minRows={3}
                                                  className={style.textarea} {...input} {...restProps}/></FormArea>

};
export const MessageArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormArea {...props}><TextareaAutosize minRows={1} maxRows={3}
                                                  className={style.messageArea} {...input} {...restProps}/></FormArea>
};

export const Checkbox = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormArea {...props}>
        <label className="checkboxStyle checkboxStyle-checkbox">
            <b>{restProps.checkboxname}</b>
            <input type="checkbox" {...meta.active} {...input} {...restProps} checked={input.value}/>
            <div className="checkboxStyle_indicator"></div>
        </label>
    </FormArea>
};


export const InputArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormArea {...props}><input className={style.inputText} {...input} {...restProps}/></FormArea>
};


export const createNewField = (placeholder, name, validators, component, props) => {
    return <Field placeholder={placeholder}
                  name={name}
                  validate={validators}
                  component={component}
                  {...props}/>
};