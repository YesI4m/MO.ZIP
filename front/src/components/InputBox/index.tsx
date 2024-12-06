import{ ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react'
import './style.css';

//          interface : properties                    //
interface Props {
    lable : string;
    type: 'text' | 'password';
    placeholder: string;
    value : string;
    setValue: Dispatch<SetStateAction<string>>;
    error: boolean;

    icon?: string;
    onButtonClick?: () => void;

    message?: string;

    onKeyDown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
//          component : FavoriteListItem                    //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

//          state : properties                    //
    const{ lable, type, placeholder, value, error, icon, message } = props;
    const{ setValue, onButtonClick, onKeyDown } = props;

//          event handler: input 값 변경                    //
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
    }
//          event handler: input 키 이벤트 처리                    //
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }


//          render : FavoriteListItem                    // 
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{ lable }</div>
            <div className={ error ? 'inputbox-container-error' : 'inputbox-container' }>
                <input ref={ ref } type={ type } className='input' placeholder={ placeholder } value={ value } onChange={ onChangeHandler } onKeyDown={ onKeyDownHandler }/>
                {onButtonClick !== undefined && (
                <div className='icon-button'>
                    {icon !== undefined && (
                    <div className={`icon ${ icon }`}></div>
                    )}
                </div>
                )}
            </div>
            {message !== undefined &&(
            <div className='inputbox-message'>{ message }</div>
            )}
        </div>
    )
});

export default InputBox;